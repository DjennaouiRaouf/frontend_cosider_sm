import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {hideAddAttachement} from "../Slices/AddModalSlices";
import Cookies from "js-cookie";
import axios from "axios";
import {Transform} from "../Utils/Utils";
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useParams} from "react-router-dom";
import {displayAlertMessage, Variant} from "../Slices/AlertMessageSlices";

interface AddAttachementProps {
    refresh:()=>void,

}
const AddAttachement: React.FC<AddAttachementProps> = ({refresh}) => {
     const [validated, setValidated] = useState(false);
    const { showAddAttachementForm } = useSelector((state: RootState) => state.addDataModalReducer);

    const dispatch = useDispatch();
    const [fields,setFields]=useState<any[]>([]);
    const [defaultState,setDefaultState]=useState<any>({});
    const [formData, setFormData] = useState<any>({});
    const { cid } = useParams();
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




    const getFields = async() => {

        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/attfields/?flag=f`,{

            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setFields(response.data.fields);


            })
            .catch((error:any) => {

            });

    }

 const handleSubmit = async(e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        formData['contrat']=cid

        const formDataObject:any=Object.assign({}, formData)

        if (form.checkValidity()) {
            setValidated(false)
            
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api_gc/AddAttachement/`,Transform(formDataObject),{
                headers: {
                    Authorization: `Token ${Cookies.get("token")}`,
                    'Content-Type': 'application/json',

                },

            })
                .then((response:any) => {
                    refresh();
                    setFormData(defaultState);
                    handleClose();
                    dispatch(displayAlertMessage({variant:Variant.SUCCESS,message:'Bon de livraison ajouté'}))

                })
                .catch((error:any) => {
                    dispatch(displayAlertMessage({variant:Variant.DANGER,message:JSON.stringify(error.response.data,null,2)}))

                });



        }
        else {

            setValidated(true)
        }



    }
    useEffect(() => {

        getFields();



    },[]);
    const handleClose = () => {

        dispatch(hideAddAttachement())

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
         <Modal show={showAddAttachementForm} onHide={handleClose} size={"xl"}>
              <Form
                      noValidate validated={validated} onSubmit={handleSubmit} >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Bon de livraison</Modal.Title>
        </Modal.Header>
                  <Modal.Body>
                      <div className="container-fluid">
                          <div className="card shadow mb-3 bg-body-tertiary ">
                              <div className="card-body bg-body-tertiary ">


                                  <div className="row" style={{marginBottom: 25, textAlign: "left"}}>
                                      {fields.map((field: any, index: any) => (
                                          <div className="col-md-6 text-start" key={index}>
                                              <div className="mb-3">
                                                  <label className="form-label" htmlFor="username">
                                                      <strong>
                                                          {field.label + " "}
                                                          {field.required ?
                                                              <span style={{
                                                                  color: "rgb(255,0,0)",
                                                                  fontSize: 18,
                                                                  fontWeight: "bold"
                                                              }}>
                                                                  *
                                                            </span> :
                                                              <span style={{
                                                                  color: "rgb(255,0,0)",
                                                                  fontSize: 18,
                                                                  fontWeight: "bold"
                                                              }}>

                                                                </span>
                                                          }
                                                      </strong>
                                                  </label>
                                                  {
                                                      field.type === "PrimaryKeyRelatedField" ?
                                                          <>
                                                              <Typeahead
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
                                                                  required={field.required}
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
                                                                      value={formData[field.name] || ''}
                                                                      onChange={(e) => handleInputChange(e)}
                                                                  />
                                                                  : field.type === 'IntegerField' || field.type === 'DecimalField' ?
                                                                      <Form.Control
                                                                          name={field.name}
                                                                          required={field.required}
                                                                          className="w-100"
                                                                          type="number"
                                                                          value={formData[field.name] || 0}
                                                                          step={0.01}
                                                                          readOnly={field.readOnly}
                                                                          onChange={(e) => handleInputChange(e)}
                                                                      />

                                                                      :
                                                                      <Form.Control
                                                                          name={field.name}
                                                                          required={field.required}
                                                                          className="w-100"
                                                                          type="text"
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

export default AddAttachement;
