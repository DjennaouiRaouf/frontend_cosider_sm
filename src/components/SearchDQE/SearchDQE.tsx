import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {hideSearchClient, hideSearchDQE} from "../Slices/SearchModalSlices";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Transform} from "../Utils/Utils";


const SearchDQE: React.FC<any> = () => {
     const [validated, setValidated] = useState(false);
    const { showSearchDQEForm } = useSelector((state: RootState) => state.searchDataModalReducer);
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [fields,setFields]=useState<any[]>([]);
    const [formData, setFormData] = useState<any>({});
 const opt:any[] = [
        {
          value:'',
          label:'Tout',
        },
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


    // submit

    const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/dqefilterform/`,{

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


    useEffect(() => {

        getFields();



    },[]);
    const handleClose = () => {
            dispatch(hideSearchDQE());
    }
    const handleChange = (ref:any, op:any) => {
        if(op.length ===1 ){
            setFormData({
                ...formData,
                [ref]: op,
            })
        }else {
            setFormData({
                ...formData,
                [ref]: [],
            })
        }


    };
 const handleSubmit = async(e: any) => {
    e.preventDefault();
    const url_tmp:string[]=[];
    const formDataObject=Transform(formData)
    Object.entries(formDataObject).forEach(([key, value], index) => {
      const val:string=String(value);

      if(index === 0){

        url_tmp.push(`${key}=${encodeURIComponent(val)}`);
      }
      if(index >= 1){
        url_tmp.push(`&${key}=${encodeURIComponent(val)}`);
      }

    });

    const queryParamsString = new URLSearchParams(searchParams).toString(); // Convert query parameters to string
    const newLocation = {
      pathname: '', // New route path
      search: queryParamsString, // Append existing query parameters
    };

        navigate(newLocation);
        navigate(`?${url_tmp.join('')}`);
        dispatch(hideSearchDQE());
        setFormData({})


  }

  return (
      <>
         <Modal show={showSearchDQEForm} onHide={handleClose} size={"xl"}>
               <Form
                      noValidate validated={validated} onSubmit={handleSubmit} >
        <Modal.Header closeButton>
          <Modal.Title>Rechercher un DQE</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <div className="container-fluid">
                  <div className="card shadow mb-3">
                      <div className="card-body">

                              <div className="row" style={{marginBottom: 25, textAlign: "left"}}>
                                  {fields.map((field:any,index:any) => (
                                  <div className="col-md-6 text-start" key={index}>
                                      <div className="mb-3">
                                          <label className="form-label" htmlFor="username">
                                              <strong>
                                                  {field.label + " "}
                                              </strong>
                                          </label>
 {
                                                            field.type === "ModelChoiceFilter"?
                                                                <>
                                                                    <Typeahead

                                                                         labelKey={"label"}
                                                                    onChange={(o) => handleChange(field.name, o)}
                                                                    id={field.name}
                                                                    selected={formData[field.name] || []}
                                                                    options={field.queryset}

                                                                    />
                                                                </>


                                                                :
                                                                field.type === 'BooleanFilter' ?

                                                                    <Form.Control
                                                                        as="select"
                                                                        name={field.name}
                                                                        
                                                                        className="w-100"

                                                                        onChange={(e)=>handleSelectChange(e)}>

                                                                        {opt.map((item,index) => (
                                                                            <option key={index} value={String(item.value)}>{item.label}</option>
                                                                        ))}

                                                                    </Form.Control>


                                                                    : field.type === 'DateFilter' ?
                                                                        <Form.Control
                                                                            name={field.name}
                                                                            
                                                                            className="w-100"
                                                                            type="date"
                                                                            value={formData[field.name]}
                                                                            onChange={(e)=>handleInputChange(e)}
                                                                        />
                                                                        : field.type === 'NumberFilter'  ?
                                                                            <Form.Control
                                                                                name={field.name}
                                                                                
                                                                                className="w-100"
                                                                                type="number"
                                                                                value={formData[field.name] || 0}
                                                                                

                                                                                onChange={(e)=>handleInputChange(e)}
                                                                            />

                                                                            :
                                                                            <Form.Control
                                                                                name={field.name}
                                                                                
                                                                                className="w-100"
                                                                                type="text"
                                                                                value={formData[field.name]}
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
                  Rechercher
              </Button>
          </Modal.Footer>
               </Form>
      </Modal>
  </>
  );
};

export default SearchDQE;


