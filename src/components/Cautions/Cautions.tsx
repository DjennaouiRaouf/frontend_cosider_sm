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
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {Humanize} from "../Utils/Utils";
import AddAvance from "../AddAvance/AddAvance";
import {showAddCaution} from "../Slices/AddModalSlices";
import AddCaution from "../AddCaution/AddCaution";
import OptionInvoice from "../ActionRenderer/OptionInvoice/OptionInvoice";
import Recup from "../ActionRenderer/Recup/Recup";

;

const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'montant' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    default:
      return <span>{value}</span>
  }

};

const Cautions: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
   const[resume,setResume]=useState<any>({});

  const gridRef = useRef(null);
  const { nt,pole } = useParams();

  const defaultColDefs: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 200,
    autoHeight: true, wrapText: true,
    cellStyle: {textAlign: 'start', border: "none"},

  };

        const gridOptions:any = {
    pagination: true,
    defaultColDef:defaultColDefs,
    multiSortKey:'ctrl',
    animateRows:true,
  components: {
      InfoRenderer: InfoRenderer,
    },


    localeText: {
      // Default pagination text
      page: 'Page',
      to: 'à',
      of: 'sur',
      nextPage: 'Suivant',
      lastPage: 'Dernier',
      firstPage: 'Premier',
      previousPage: 'Precedent',


      loadingOoo: 'Chargement...',
      noRowsToShow: 'Pas de Données',

      // Add more custom texts as needed
    },
  };


    const getData = async(url:string) => {
        const ntid:string=encodeURIComponent(String(nt));

        const pid:string=encodeURIComponent(String(pole));

       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getcautions/?marche__nt=${ntid}&marche__code_site=${pid}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
            console.log(response)
          setData(response.data.caut);
          setResume(response.data.extra)
        })
        .catch((error:any) => {

        });


  }



  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/cautionfields/?flag=l`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                    const updatedCols:any[] = [

                           {
                            headerName:'',
                            cellRenderer:Recup,
                            maxwidth: 100,
                              cellRendererParams:{
                                refresh:getData,
                              }
                              }

                        ,...response.data.fields,
                                ]

                 setFields(updatedCols)



            })
            .catch((error:any) => {

            });

    }



       const handleRowClick = (event: any) => {
        setSelectedRows(event.data);

  };


     useEffect(() => {
    const paramsArray = Array.from(searchParams.entries());
    // Build the query string
    const queryString = paramsArray.reduce((acc, [key, value], index) => {
      if (index === 0) {
        return `?${key}=${encodeURIComponent(value)}`;
      } else {
        return `${acc}&${key}=${encodeURIComponent(value)}`;
      }
    }, '');

    getData(queryString);
  },[searchParams]);

      useEffect(() => {
        getFields();
    },[]);

    const dispatch=useDispatch();
    const addD = () => {
        dispatch(showAddCaution());
    }
      const searchD = () => {

    }


  return (
      <>
          <AddCaution refresh={()=>{getData('')}}/>
          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Cautions du Contrat dont le NT N° {nt} et le Pole {pole} </p>
                              </div>
                              <div className="card-body">
                                  <div className="row d-xxl-flex justify-content-xxl-center mb-4">
                                      <div className="col-md-6 col-xxl-3">
                                          <div className="card shadow border-start-success py-2">
                                              <div className="card-body">
                                                  <div className="row align-items-center no-gutters">
                                                      <div className="col me-2">
                                                          <div
                                                              className="text-uppercase text-success fw-bold text-xs mb-1">
                                                              <span>Montant global recupéré</span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>{Humanize(resume.qr) +"DA"}</span>
                                                          </div>
                                                      </div>
                                                      <div className="col-auto">
                                                          <i
                                                              className="fas fa-money-bill-wave fa-2x text-gray-300"
                                                              style={{color: "rgb(221, 223, 235)"}}
                                                          />

                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 col-xxl-3">
                                          <div className="card shadow border-start-success py-2">
                                              <div className="card-body">
                                                  <div className="row align-items-center no-gutters">
                                                      <div className="col me-2">
                                                          <div
                                                              className="text-uppercase text-success fw-bold text-xs mb-1">
                                                              <span>Montant global déposé </span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>{Humanize(resume.qd) +"DA"}</span>
                                                          </div>
                                                      </div>
                                                      <div className="col-auto">
                                                          <i
                                                              className="fas fa-money-bill-wave fa-2x text-gray-300"
                                                              style={{color: "rgb(221, 223, 235)"}}
                                                          />

                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addD}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>

                                                  Ajouter une Caution
                                              </button>


                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="ag-theme-alpine mt-4"
                                      style={{ height: 500,width:"100%" }}

                                  >
                                    <AgGridReact ref={gridRef}
                                           rowData={data} columnDefs={fields}
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}


                                    />

                                  </div>
                                  <div className="row">
                                      <div className="col-md-6 align-self-center"/>
                                      <div className="col-md-6"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <footer className="bg-white sticky-footer">
                      <div className="container my-auto">
                          <div className="text-center my-auto copyright"/>
                      </div>
                  </footer>
              </div>
          </div>

      </>
  );
};


export default Cautions;
