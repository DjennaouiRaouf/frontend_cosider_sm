import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {hideAddContrat} from "../Slices/AddModalSlices";
import Cookies from "js-cookie";
import axios from "axios";
import {Transform} from "../Utils/Utils";
import {displayAlertMessage, Variant} from "../Slices/AlertMessageSlices";

type AddContratProps = {
  refresh:()=>void,
};

const AddContrat: React.FC<AddContratProps> = ({refresh}) => {
     const [validated, setValidated] = useState(false);
    const { showAddContratForm } = useSelector((state: RootState) => state.addDataModalReducer);
    const [selectedNT, setSelectedNT] = useState<string[]>([]);
     const [nt,setNT]=useState<string[]>([]);

    const dispatch = useDispatch();
    const [fields,setFields]=useState<any[]>([]);
    const [defaultState,setDefaultState]=useState<any>({});
    const [formData, setFormData] = useState<any>({});
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

   const getNT = async(pole:string) => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/nts/?code_site=${pole}`,{
         headers: {
             'Content-Type': 'application/json',

         },
     })
         .then((response:any) => {
           setNT(response.data.nt)

         })
         .catch((error:any) => {
                     });


}




    const handleSelectChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleInputChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };


    const getState = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/marchefieldsstate/`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setDefaultState(response.data.state)
                setFormData(response.data.state)
            })
            .catch((error:any) => {

            });


    }

    const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/marchefields/?flag=f`,{

            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setFields(response.data.fields);

                getState();
            })
            .catch((error:any) => {

            });

    }

 const handleSubmit = async(e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(formData)


        if (form.checkValidity()) {
            setValidated(false)

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addmarche/`,Transform(formData),{
                headers: {
                    Authorization: `Token ${Cookies.get("token")}`,
                    'Content-Type': 'application/json',

                },

            })
                .then((response:any) => {

                    setFormData(defaultState);
                    handleClose();
                    refresh();

                      dispatch(displayAlertMessage({variant: Variant.SUCCESS, message: "Marché ajouté"}))


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
        dispatch(hideAddContrat())

    }
    const handleChange = (ref:any, op:any) => {
        if(op.length ===1 ){
            setFormData({
                ...formData,
                [ref]: op,
            })
             if(ref==='code_site'){
                getNT(op[0].value)
            }

        }else {
            setFormData({
                ...formData,
                [ref]: [],
            })
             if(ref==='code_site'){
                getNT('')
                 setSelectedNT([])
            }
        }


    };
    const handleSelectChange2 = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
     const handleChange2 = (selected:any) => {
         if(selected.length ===1 )
         {
             setSelectedNT(selected);

             setFormData({
                ...formData,
                nt: selected[0],
            });
         }else {
            setFormData({
                ...formData,
                nt:'',
            })
             setSelectedNT([])
        }

  };

  return (
      <>
         <Modal show={showAddContratForm} onHide={handleClose} size={"xl"}>
              <Form
                      noValidate validated={validated} onSubmit={handleSubmit} >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un contrat </Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <div className="container-fluid">
                  <div className="card shadow mb-3 bg-body-tertiary ">
                      <div className="card-body bg-body-tertiary ">


                              <div className="row" style={{marginBottom: 25, textAlign: "left"}}>
                                  {fields.map((field:any,index:any) => (
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
                                                            field.type === "PrimaryKeyRelatedField"?
                                                                <>
                                                                    <Typeahead

                                                                         labelKey={"label"}
                                                                    onChange={(o) => handleChange(field.name, o)}
                                                                    id={field.name}
                                                                         inputProps={{ required: field.required }}

                                                                    selected={formData[field.name] || []}
                                                                    options={field.queryset}

                                                                    />
                                                                </>
                                                                : field.name === "nt"?
                                                                <>
                                                                  <Typeahead
                                                                      id={'contrat_id'}
                                                                      onChange={handleChange2}
                                                                      options={nt}
                                                                      selected={selectedNT}
                                                                      placeholder="Choisir un NT"

                                                                  />
                                                                </>

                                                                :field.type === 'ChoiceField' ?

                                                              <Form.Control
                                                                  as="select"
                                                                  name={field.name}
                                                                  required={field.required}
                                                                  className="w-100"
                                                                  value={formData[field.name]}
                                                                  onChange={(e) => handleSelectChange2(e)}>

                                                                  {field.choices.map((item:any, index:any) => (
                                                                      <option key={index}
                                                                              value={String(item.key)}>{item.value}</option>
                                                                  ))}
                                                                   </Form.Control>


                                                                :
                                                                field.type === 'BooleanField' ?

                                                                    <Form.Control
                                                                        as="select"
                                                                        name={field.name}
                                                                        required={field.required}
                                                                        className="w-100"
                                                                        value={formData[field.name]}
                                                                        onChange={(e)=>handleSelectChange(e)}>

                                                                        {opt.map((item,index) => (
                                                                            <option key={index} value={String(item.value)}>{item.label}</option>
                                                                        ))}

                                                                    </Form.Control>


                                                                    : field.type === 'DateField' ?
                                                                        <Form.Control
                                                                            name={field.name}
                                                                            required={field.required}
                                                                            className="w-100"
                                                                            type="date"
                                                                            value={formData[field.name]||''}
                                                                            onChange={(e)=>handleInputChange(e)}
                                                                        />
                                                                        : field.type === 'IntegerField' || field.type ==='DecimalField' || field.type==='FloatField'  ?
                                                                            <Form.Control
                                                                                name={field.name}
                                                                                required={field.required}
                                                                                className="w-100"
                                                                                type="number"
                                                                                value={formData[field.name] || 0}
                                                                                step={0.01}

                                                                                onChange={(e)=>handleInputChange(e)}
                                                                            />
                                                                         : field.textarea === true ?
                                                                            <Form.Control
                                                                            name={field.name}
                                                                            as="textarea"
                                                                            required={field.required}
                                                                            className="w-100"
                                                                            style={{resize:"none",height: '150px'}}
                                                                            type="text"
                                                                            value={formData[field.name]|| ''}
                                                                            onChange={(e)=>handleInputChange(e)}
                                                                            />

                                                                            :
                                                                            <Form.Control
                                                                                name={field.name}
                                                                                required={field.required}
                                                                                className="w-100"
                                                                                type="text"
                                                                                value={formData[field.name]||''}
                                                                                onChange={(e)=>handleInputChange(e)}
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

export default AddContrat;
