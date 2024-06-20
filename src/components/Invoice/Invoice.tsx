import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import {ColDef, GridApi} from "ag-grid-community";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-alpine.css";
import 'ag-grid-enterprise';
import numeral from "numeral";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {Humanize} from "../Utils/Utils";
import {showAddFacture} from "../Slices/AddModalSlices";
import AddFacture from "../AddFacture/AddFacture";
import AlertMessage from "../AlertMessage/AlertMessage";
import OptionInvoice from "../ActionRenderer/OptionInvoice/OptionInvoice";

import AddEncaissement from "../AddEncaissement/AddEncaissement";
import {useReactToPrint} from "react-to-print";
import InvoiceRG from "./InvoiceRG/InvoiceRG";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import SearchInvoice from "../SearchInvoice/SearchInvoice";
import {showSearchInvoice} from "../Slices/SearchModalSlices";
import InvoiceRGTTC from "./InvoiceRGTTC/InvoiceRGTTC";
import "./Invoice.css";

const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'montant' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_precedent' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

    case 'montant_cumule' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_factureHT' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_factureTTC' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_rb' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_rg' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
case 'ava' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
case 'avf' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

case 'ave' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

case 'penalite' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>



    default:
      return <span>{value}</span>
  }

};

const Invoice: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
   const[resume,setResume]=useState<any>({});

   const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const gridRef = useRef(null);
  const { nt,pole } = useParams();

  const defaultColDefs: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 200,
    autoHeight: true, wrapText: true,
    cellStyle: {textAlign: 'start', border: "none"}, suppressMenu: true,

  };

        const gridOptions:any = {
    pagination: true,
    defaultColDef:defaultColDefs,
     multiSortKey:'ctrl',
        animateRows:true,
        rowSelection:'multiple',
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

       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getfacture/?marche__nt=${ntid}&marche__code_site=${pid}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setData(response.data.facture);
          setResume(response.data.extra)
        })
        .catch((error:any) => {

        });


  }




  const getFields = async() => {

        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/facturefields/?flag=l`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                 const updatedCols:any[] = [
                     {
                            headerName:'',
                            cellRenderer:OptionInvoice,
                            maxWidth: 200,
                              cellRendererParams:{
                                refresh:getData,

                              }
                              }


                     ,...response.data.fields,

                    ];

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
    getFields();
  },[searchParams]);







    const dispatch=useDispatch();
    const addD = () => {
        dispatch(showAddFacture())
    }

    const searchD = () => {
        dispatch(showSearchInvoice())
    }
      const onGridReady = (params: { api: GridApi }) => {
        setGridApi(params.api);
    };
     const onSelectionChanged = () => {
        if (gridApi) {
            const selectedNodes: any[] = gridApi.getSelectedNodes();
            const selectedData: any[] = selectedNodes.map((node) => node.data);
            setSelectedRows(selectedData);
        }
    };

     const componentRef = useRef<any>();
     const handlePrint = useReactToPrint({
        content: () => componentRef.current,

      });

          const componentRef2 = useRef<any>();
     const handlePrint2 = useReactToPrint({
        content: () => componentRef2.current,

      });


    
     const containerRef = useRef<HTMLDivElement>(null);

    const left = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: containerRef.current.scrollLeft - 100, // Adjust scroll distance as needed
                behavior: 'smooth' // Optional: Smooth scrolling animation
            });
        }
    };

    const right = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: containerRef.current.scrollLeft + 100, // Adjust scroll distance as needed
                behavior: 'smooth' // Optional: Smooth scrolling animation
            });
        }
    };

  return (
      <>
          <AlertMessage/>
          <SearchInvoice/>
          <AddFacture refresh={()=>{getData('')}}/>
          <AddEncaissement refresh={()=>{getData('')}}/>
          <InvoiceRG ref={componentRef} facture={data} extra={resume}/>
          <InvoiceRGTTC ref={componentRef2} facture={data} extra={resume}/>


          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold w-100">Factures du Contrat dont le NT
                                      N° {nt} et le Pole {pole} </p>
                                  <p className="text-primary m-0 fw-bold w-100">D'un Montant de {Humanize(resume.mht)+' DA'} en HT
                                     </p>

                              </div>
                              <div className="card-body" style={{overflowY:'auto'}}>
                                  <div className="row d-xxl-flex justify-content-xxl-center mb-4 w-100">


                                      <div className="card">
                                          <div className="card-header d-md-flex justify-content-md-center">
                                              <div className="btn-group" role="group">
                                                  <button
                                                      className="btn btn-primary"
                                                      type="button"
                                                      style={{
                                                          color: "var(--bs-btn-disabled-color)",
                                                          background: "transparent",
                                                          borderStyle: "none"
                                                      }}
                                                      onClick={left}
                                                  >
                                                      <i
                                                          className="fas fa-arrow-circle-left"
                                                          style={{
                                                              fontSize: 43,
                                                              background: "transparent",
                                                              color: "rgb(147,147,147)"
                                                          }}
                                                      />
                                                  </button>
                                                  <button
                                                      className="btn btn-primary"
                                                      type="button"
                                                      style={{
                                                          color: "var(--bs-btn-disabled-color)",
                                                          background: "transparent",
                                                          borderStyle: "none"
                                                      }}
                                                      onClick={right}
                                                  >
                                                      <i
                                                          className="fas fa-arrow-circle-right"
                                                          style={{
                                                              fontSize: 43,
                                                              background: "transparent",
                                                              color: "rgb(147,147,147)"
                                                          }}
                                                      />
                                                  </button>
                                              </div>
                                          </div>
                                          <div className="container-fluid card-row-container" ref={containerRef}>
                                              <div className="col-md-6 col-xl-3 mb-4 me-3">
                                                  <div
                                                      className="card shadow border-start-primary py-2"
                                                      style={{height: "100%"}}
                                                  >
                                                      <div className="card-body"
                                                           style={{paddingBottom: 0, paddingTop: 0}}>
                                                          <div className="row align-items-center no-gutters">
                                                              <div className="col me-2">
                                                                  <div
                                                                      className="text-uppercase text-primary fw-bold text-xs mb-1">
                                                                        <span style={{fontSize: 12, color: "var(--bs-primary)"}}>
                                                                          <strong>
                                                                            <span style={{color: "rgb(25, 135, 84)"}}>
                                                                              Retenue de Garantie
                                                                            </span>
                                                                          </strong>
                                                                        </span>
                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                                                                          >
                                                                        <span style={{fontSize: 14}}>
                                                                          <span style={{color: "rgb(25, 135, 84)"}}>
                                                                            En&nbsp; HT&nbsp;
                                                                          </span>
                                                                        </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.rg_total) + "DA"}</span>

                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                                                                    <span style={{fontSize: 14}}>
                                                                      <span style={{color: "rgb(25, 135, 84)"}}>
                                                                        En TTC&nbsp;
                                                                      </span>
                                                                    </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.rg_total_ttc) + "DA"}</span>

                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6 col-xl-3 mb-4 me-3">
                                                  <div
                                                      className="card shadow border-start-primary py-2"
                                                      style={{height: "100%"}}
                                                  >
                                                      <div className="card-body"
                                                           style={{paddingBottom: 0, paddingTop: 0}}>
                                                          <div className="row align-items-center no-gutters">
                                                              <div className="col me-2">
                                                                  <div
                                                                      className="text-uppercase text-primary fw-bold text-xs mb-1">
                <span style={{fontSize: 12, color: "var(--bs-primary)"}}>
                  <strong>
                    <span style={{color: "rgb(25, 135, 84)"}}>
                      RembourSeMENT
                    </span>
                  </strong>
                </span>
                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                <span style={{fontSize: 14}}>
                  <span style={{color: "rgb(25, 135, 84)"}}>
                    Avance Forfaitaire&nbsp;
                  </span>
                </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.avf) + "DA"}</span>

                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                <span style={{fontSize: 14}}>
                  <span style={{color: "rgb(25, 135, 84)"}}>
                    Avance Sur Appros&nbsp;
                  </span>
                </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.ava) + "DA"}</span>

                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                <span style={{fontSize: 14}}>
                  <span style={{color: "rgb(25, 135, 84)"}}>
                    Avance Exceptionnelle&nbsp;
                  </span>
                </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.ave) + "DA"}</span>

                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6 col-xl-3 mb-4 me-3">
                                                  <div
                                                      className="card shadow border-start-primary py-2"
                                                      style={{height: "100%"}}
                                                  >
                                                      <div className="card-body"
                                                           style={{paddingBottom: 0, paddingTop: 0}}>
                                                          <div className="row align-items-center no-gutters">
                                                              <div className="col me-2">
                                                                  <div
                                                                      className="text-uppercase text-primary fw-bold text-xs mb-1">
                <span style={{fontSize: 12, color: "var(--bs-primary)"}}>
                  <strong>
                    <span style={{color: "rgb(25, 135, 84)"}}>
                      Facturation
                    </span>
                  </strong>
                </span>
                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                <span style={{fontSize: 14}}>
                  <i
                      className="fas fa-check"
                      style={{color: "rgb(25,135,84)"}}
                  />
                  <span style={{color: "rgb(25, 135, 84)"}}>
                    &nbsp;Facturé
                  </span>
                </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.mgf) + "DA"}</span>

                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                <span style={{fontSize: 14}}>
                  <i
                      className="fas fa-check-double"
                      style={{color: "rgb(25,135,84)"}}
                  />
                  <span style={{color: "rgb(25, 135, 84)"}}>
                    &nbsp;Encaissé
                  </span>
                </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.mgenc) + "DA"}</span>

                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                <span style={{fontSize: 14}}>
                  <i
                      className="fas fa-exclamation-triangle"
                      style={{color: "rgb(255,0,0)"}}
                  />
                  <span style={{color: "rgb(25, 135, 84)"}}>
                    &nbsp;En Créance
                  </span>
                </span>
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.creance) + "DA"}</span>

                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6 col-xl-3 mb-4 me-3">
                                                  <div
                                                      className="card shadow border-start-primary py-2"
                                                      style={{height: "100%"}}
                                                  >
                                                      <div className="card-body"
                                                           style={{paddingBottom: 0, paddingTop: 0}}>
                                                          <div className="row align-items-center no-gutters">
                                                              <div className="col me-2">
                                                                  <div
                                                                      className="text-uppercase text-primary fw-bold text-xs mb-1">
                <span style={{fontSize: 12, color: "var(--bs-primary)"}}>
                  <i
                      className="fas fa-exclamation-triangle"
                      style={{color: "rgb(255,0,0)"}}
                  />
                  <strong>
                    <span style={{color: "rgb(25, 135, 84)"}}>
                      &nbsp;Pénalité
                    </span>
                  </strong>
                </span>
                                                                  </div>
                                                                  <div
                                                                      className="text-dark fw-bold h5 mb-0"
                                                                      style={{marginTop: "-6px"}}
                                                                  >
                                                                      <span
                                                                          style={{fontSize: 14}}>&nbsp; {Humanize(resume.pen) + "DA"}</span>

                                                                  </div>
                                                              </div>
                                                          </div>
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
                                                  Ajouter une facture
                                              </button>

                                              <Dropdown style={{
                                                  background: "#df162c", borderRadius: 0,
                                              }}>
                                                  <Dropdown.Toggle style={{
                                                      height: 40,
                                                      background: "#df162c",
                                                      borderRadius: 0,
                                                      borderWidth: 0
                                                  }} id="dropdown-basic"
                                                  ><i className="fas fa-print"
                                                      style={{marginRight: 5}}/>
                                                      &nbsp;Facture RG
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                      <Dropdown.Item onClick={handlePrint}>
                                                          <i className="bi bi-file-earmark-pdf-fill"></i>
                                                          &nbsp;En HT</Dropdown.Item>
                                                      <Dropdown.Item onClick={handlePrint2}>
                                                          <i className="bi bi-file-earmark-pdf-fill"></i>
                                                          &nbsp;En TTC</Dropdown.Item>

                                                  </Dropdown.Menu>
                                              </Dropdown>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={searchD}>
                                                  <i className="fas fa-search" style={{marginRight: 5}}/>
                                                  Rechercher
                                              </button>

                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="ag-theme-alpine mt-4"
                                      style={{overflowY: "hidden", width: "100%"}}

                                  >
                                      <AgGridReact ref={gridRef}
                                                   rowData={data} columnDefs={fields}
                                                   onGridReady={onGridReady}
  suppressContextMenu={true}
                                                   gridOptions={gridOptions}
                                                   onRowClicked={handleRowClick}
                                                   onSelectionChanged={onSelectionChanged}
                                                   domLayout='autoHeight'


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


export default Invoice;


