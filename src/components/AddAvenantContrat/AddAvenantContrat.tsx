import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {hideEdit} from "../Slices/EditModalSlices";
import Cookies from "js-cookie";
import axios from "axios";
import {Transform} from "../Utils/Utils";
import {AgGridReact} from "ag-grid-react";
import numeral from "numeral";
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from "ag-grid-community";
import {useParams} from "react-router-dom";
import {displayAlertMessage, Variant} from "../Slices/AlertMessageSlices";

interface AddAvenantContratProps {
    refresh:()=>void,

}
const AddAvenantContrat: React.FC<AddAvenantContratProps> = (props) => {
     const [validated, setValidated] = useState(false);
    const { showEditForm } = useSelector((state: RootState) => state.editDataModalReducer);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState<any>(showEditForm.state);
      useEffect(() => {
        setFormData(showEditForm.state);
      }, [showEditForm]);

    const opt:any[] = [
            {
                value: false,
                label: 'Non',
            },
            {
                value: true,
                label: 'Oui',
            },

    ];

    const handleSelectChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleInputChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };







 const handleSubmit = async(e: any) => {
 e.preventDefault();
        const form = e.currentTarget;
        console.log(formData)


        if (form.checkValidity()) {
            setValidated(false)

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addmav/`, Transform(formData), {
                headers: {
                    Authorization: `Token ${Cookies.get("token")}`,
                    'Content-Type': 'application/json',

                },

            })
                .then((response: any) => {

                    setFormData( showEditForm.state);
                    handleClose();
                    props.refresh();

                    dispatch(displayAlertMessage({variant: Variant.SUCCESS, message: "Avenant ajouté"}))


                })
                .catch((error: any) => {

                    dispatch(displayAlertMessage({
                        variant: Variant.DANGER,
                        message: JSON.stringify(error.response.data, null, 2)
                    }))

                });
        }

    }
    const handleClose = () => {
        dispatch(hideEdit())
    }
    const handleChange = (ref:any, op:any) => {
        if(op.length > 0 ){
            setFormData({
                ...formData,
                [ref]: op,
            });

        }else {
            setFormData({
                ...formData,
                [ref]: [],
            })
        }


    };

  return (
      <>
         <Modal show={showEditForm.shown} onHide={handleClose} size={"xl"}>
              <Form
                      noValidate validated={validated} onSubmit={handleSubmit} >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Avenant au Contrat N° {showEditForm.id.id}</Modal.Title>
        </Modal.Header>
                  <Modal.Body>
                      <div className="container-fluid">
                          <div className="card shadow mb-3 bg-body-tertiary ">
                              <div className="card-body bg-body-tertiary ">


                                  <div className="row" style={{marginBottom: 25, textAlign: "left"}}>
                                      {showEditForm.fields.map((field: any, index: any) => (
                                          <div className="col-md-6 text-start" key={index}>
                                              <div className="mb-3">
                                                  <label className="form-label" htmlFor="username">
                                                      <strong>
                                                          {field.label + " "}
                                                      </strong>
                                                  </label>
                                                  {
                                                      field.type === "PrimaryKeyRelatedField" ?
                                                          <>
                                                          <Typeahead
                                                              disabled={field.readOnly}
                                                              multiple={false}
                                                                  labelKey={"label"}
                                                                  onChange={(o) => handleChange(field.name, o)}
                                                                  id={field.name}
                                                                  inputProps={{required: field.required}}
                                                                  selected={formData[field.name] || [] }
                                                                  options={field.queryset}

                                                              />
                                                          </>


                                                          :
                                                          field.type === 'BooleanField' ?

                                                              <Form.Control
                                                                  as="select"
                                                                  name={field.name}
                                                                  disabled={field.readOnly}
                                                                  className="w-100"
                                                                  value={formData[field.name]}
                                                                  onChange={(e) => handleSelectChange(e)}>

                                                                  {opt.map((item, index) => (
                                                                      <option key={index}
                                                                              value={String(item.value)}>{item.label}</option>
                                                                  ))}

                                                              </Form.Control>


                                                              : field.type === 'DateField' ?
                                                                  <Form.Control
                                                                      name={field.name}
                                                                      required={field.required}
                                                                      className="w-100"
                                                                      type="date"
                                                                      disabled={field.readOnly}
                                                                      value={formData[field.name] || ''}
                                                                      onChange={(e) => handleInputChange(e)}
                                                                  />
                                                                  : field.type === 'IntegerField' || field.type === 'DecimalField'|| field.type === 'FloatField' ?
                                                                      <Form.Control
                                                                          name={field.name}
                                                                          required={field.required}
                                                                          className="w-100"
                                                                          type="number"
                                                                          disabled={field.readOnly}
                                                                          value={formData[field.name] || 0}
                                                                          step={0.01}
                                                                          onChange={(e) => handleInputChange(e)}
                                                                      />

                                                                      :
                                                                      <Form.Control
                                                                          name={field.name}
                                                                          required={field.required}
                                                                          className="w-100"
                                                                          type="text"
                                                                          disabled={field.readOnly}
                                                                          value={formData[field.name] || ''}
                                                                          onChange={(e) => handleInputChange(e)}
                                                                      />


                                                  }

                                              </div>
                                          </div>
                                      ))}

                                  </div>


                              </div>
                          </div>


                      </div>


                  </Modal.Body>

                  <Modal.Footer>

                      <Button variant="primary" style={{background: "#df162c", borderWidth: 0}} type={"submit"}>
                          Ajouter
                      </Button>
                  </Modal.Footer>
              </Form>
         </Modal>
      </>
  );
};

export default AddAvenantContrat;
