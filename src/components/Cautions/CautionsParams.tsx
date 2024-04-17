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
import {Button,Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";
import contrat from "../Contrat/Contrat";


const CautionsParams: React.FC<any> = () => {
    const [display, setDisplay] = useState(true);
     const [selectedOption, setSelectedOption] = useState<string[]>([]);
    const [options,setOptions]=useState<string[]>([]);
    const navigate=useNavigate();
    const hide = () => setDisplay(false);
  const show = () => setDisplay(true);
  const valider = () => {
    hide();
    const val:string=selectedOption[0]
     navigate(`liste_caution/${encodeURIComponent(val)}`, )

  }

  const getContrats = async() => {
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/contractkeys/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                 setOptions(response.data)



            })
            .catch((error:any) => {

            });


  }

    const handleChange = (selected:any) => {
    setSelectedOption(selected);


  };

 useEffect(() => {
        getContrats();
    },[]);


  return (
      <>
      <Modal
        show={display}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Saisir le numero du contrat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
                                          <label className="form-label" htmlFor="username">
                                              <strong>
                                                  Numero du Contrat
                                              </strong>
                                          </label>
                                                                <>
                                                                    <Typeahead
                                                                        id={'contrat_id'}
                                                                         onChange={handleChange}
                                                                          options={options}
                                                                          selected={selectedOption}
                                                                          placeholder="Choisir un contrat"

                                                                    />
                                                                </>
        </div>
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


export default CautionsParams;
