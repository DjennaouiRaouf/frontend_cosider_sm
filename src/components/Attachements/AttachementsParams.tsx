import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from "ag-grid-community";
import numeral from "numeral";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";
import contrat from "../Contrat/Contrat";


const AttachementsParams: React.FC<any> = () => {
       const[selectedMonth,setSelectedMonth]=useState<string>("")
     const [display, setDisplay] = useState(true);
     const [selectedNT, setSelectedNT] = useState<string[]>([]);
    const [selectedPole, setSelectedPole] = useState<string[]>([]);
    const[minDate,setMinDate]=useState<string>('');
    const[maxDate,setMaxDate]=useState<string>('');
const[flag,setFlag]=useState<boolean>(false)

     const [nt,setNT]=useState<string[]>([]);
    const [pole,setPole]=useState<string[]>([]);

    const navigate=useNavigate();
    const hide = () => setDisplay(false);
  const show = () => setDisplay(true);
  const valider = () => {
    hide();
    const val:string=selectedNT[0]
    const val2:string=selectedPole[0]
      if(val && val2 && selectedMonth){
        navigate(`liste_att/${encodeURIComponent(val)}/${encodeURIComponent(val2)}/${encodeURIComponent(selectedMonth)}`, )
      }else{
          window.location.reload();
      }
  }
      const handleChangeMonth = (e:any) => {
        setSelectedMonth(e.target.value)
    }

  const getContrats = async() => {
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/contractkeys/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                 setNT(response.data.nt)
                 setPole(response.data.pole)




            })
            .catch((error:any) => {

            });


  }
  const getDateMaxMin = async() => {

       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/attm/?code_site=${selectedPole[0]}&nt=${selectedNT[0]}`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                console.log(response.data)
                if(response.data.min_date!==null && response.data.max_date!==null) {
                      var dateObject1 = new Date(response.data.min_date);
                      var dateObject2 = new Date(response.data.max_date);
                      const month1 = (dateObject1.getMonth() + 1).toString().padStart(2, '0');
                      const month2 = (dateObject2.getMonth() + 1).toString().padStart(2, '0');
                      setMinDate(`${dateObject1.getFullYear()}-${month1}`)
                      setMaxDate(`${dateObject2.getFullYear()}-${month2}`)
                }
                else {
                    setMinDate('')
                      setMaxDate('')
                       setFlag(true)
                    setTimeout(() => {

                        setFlag(false)
                    }, 5000);
                }



            })
            .catch((error:any) => {

            });


  }

const getPoles = async() => {
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/poles/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {


                 setPole(response.data.pole)




            })
            .catch((error:any) => {
                setPole([])
            });


  }

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
            setNT([])
         });


}
    const handleChange = (selected:any) => {
    setSelectedNT(selected);


  };
    const handleChange2 = (selected:any) => {
    setSelectedPole(selected);
    getNT(selected)

  };

 useEffect(() => {
        getPoles();
    },[]);

  useEffect(() => {
     getDateMaxMin();

    },[selectedPole,selectedNT]);



  return (
      <>

      <Modal
        show={display}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Saisir le Pole et le NT</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                      <strong>
                          Pole
                      </strong>
                  </label>
                  <>
                      <Typeahead
                          id={'contrat_id'}
                          onChange={handleChange2}
                          options={pole}
                          selected={selectedPole}
                          placeholder="Choisir un Pole"

                      />
                  </>
              </div>

              <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                      <strong>
                          NT
                      </strong>
                  </label>
                  <>
                      <Typeahead
                          id={'contrat_id'}
                          onChange={handleChange}
                          options={nt}
                          selected={selectedNT}
                          placeholder="Choisir un NT"

                      />
                  </>
              </div>

              {
                  (maxDate !== '' && minDate != '') ?

                      <div className="mb-3">
                          <label className="form-label" htmlFor="username">
                              <strong>
                                  Mois
                              </strong>
                          </label>
                          <>
                              <Form.Control
                                  required
                                  className="w-100 mb-3 mt-3"
                                  type="month"
                                  onChange={(e) => handleChangeMonth(e)}
                                  min={minDate}
                                  max={maxDate}

                              />
                          </>
                      </div>
                      :
                      <Alert variant={"danger"} show={flag}>
                          Aucune date d'attachement pour ce marché !
                      </Alert>
              }


          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" style={{background: "#df162c", borderWidth: 0}} onClick={valider}>
                  Envoyer
              </Button>
          </Modal.Footer>
      </Modal>


      </>
  );

};


export default AttachementsParams;
