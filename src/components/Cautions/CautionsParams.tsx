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
     const [selectedNT, setSelectedNT] = useState<string[]>([]);
    const [selectedPole, setSelectedPole] = useState<string[]>([]);

     const [nt,setNT]=useState<string[]>([]);
    const [pole,setPole]=useState<string[]>([]);

    const navigate=useNavigate();
    const hide = () => setDisplay(false);
  const show = () => setDisplay(true);
  const valider = () => {
    hide();
    const val:string=selectedNT[0]
    const val2:string=selectedPole[0]
    navigate(`liste_caution/${encodeURIComponent(val)}/${encodeURIComponent(val2)}`, )

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

    const handleChange = (selected:any) => {
    setSelectedNT(selected);


  };
    const handleChange2 = (selected:any) => {
    setSelectedPole(selected);


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
          <Modal.Title>Saisir le NT et le Pole</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
