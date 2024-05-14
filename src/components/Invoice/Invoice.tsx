import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef, GridApi} from "ag-grid-community";
import numeral from "numeral";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import AddDQE from "../AddDQE/AddDQE";
import {Humanize} from "../Utils/Utils";
import {showAddFacture} from "../Slices/AddModalSlices";
import AddFacture from "../AddFacture/AddFacture";
import DQEOption from "../ActionRenderer/DQEOption/DQEOption";
import DetailInvoice from "../ActionRenderer/DetailInvoice/DetailInvoice";
import AlertMessage from "../AlertMessage/AlertMessage";
import OptionInvoice from "../ActionRenderer/OptionInvoice/OptionInvoice";
import DetailFacture from "../DetailFacture/DetailFacture"
import Encaissement from "../ActionRenderer/Encaissement/Encaissement";
import AddEncaissement from "../AddEncaissement/AddEncaissement";
import CreancePrinter from "../EtatCreance/CreancePrinter/CreancePrinter";
import {useReactToPrint} from "react-to-print";
import InvoiceRG from "./InvoiceRG/InvoiceRG";
import {Button, Form, Modal} from "react-bootstrap";
import SearchInvoice from "../SearchInvoice/SearchInvoice";
import {showSearchInvoice} from "../Slices/SearchModalSlices";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'montant' :
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
    cellStyle: {textAlign: 'start', border: "none"},

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
                            maxWidth: 150,
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
  },[searchParams]);

      useEffect(() => {
        getFields();
    },[]);

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


      const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [items, setItems] = useState<any[]>([]);


    const handleCheckboxChange = (item: any) => {
        const isChecked = checkedItems.includes(item['id']);
        if (isChecked) {
            // Remove item if already checked
            setCheckedItems(checkedItems.filter(id => id !== item['id']));
            setItems(items.filter(item => item.id !== item['id']));
        } else {
            // Append item to the list if checked
            setCheckedItems([...checkedItems, item['id']]);
            setItems([...items, item['id']]);
        }
    };



     const[avances,setAvances]=useState([])
     const[show,setShow]=useState(false)
     const handleClose = () => {
        setShow(false)
     }

    const openModal = () => {
        setShow(true)
    }

       const getAvances = async() => {
         /*
        const contrat_id:string=encodeURIComponent(String(cid));
        console.log(`${process.env.REACT_APP_API_BASE_URL}/sm/getavance/?marche=${contrat_id}&remboursee=False`)
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getavance/?marche=${contrat_id}&remboursee=False`,{
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                setAvances(response.data.av);



            })
            .catch((error:any) => {

            });

          */
    }

    useEffect(() => {
        getAvances();
    },[]);
    
     const Remb = () => {


     }


  return (
      <>
          <AlertMessage/>
          <SearchInvoice/>
          <AddFacture refresh={()=>{getData('')}}/>
          <AddEncaissement refresh={()=>{getData('')}}/>
          <InvoiceRG ref={componentRef} facture={data} extra={resume}/>
  {

            avances.length !== 0 &&
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Selectionner l'avance</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {avances.map(item => (
                                <Form.Check
                                    key={item['id']}
                                    type="checkbox"
                                    id={`checkbox-${item['id']}`}
                                    label={`${item['type']} ${item['num_avance']}`}
                                    checked={checkedItems.includes(item['id'])}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }}
                                    onClick={Remb}>
                                <i className="fa fa-send" style={{marginRight:5 }} ></i>
                                Rebmourser
                            </Button>

                        </Modal.Footer>
                    </Modal>
                }

          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Factures du Contrat dont le NT N° {nt} et le Pole {pole} </p>
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
                                                              <span>Montant globale de la retenue de garantie </span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>{Humanize(resume.rg_total) +"DA"}</span>
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
                                                              <span>Montant globale en Créance </span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>{Humanize(resume.creance) +"DA"}</span>
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
                                                  Ajouter une facture
                                              </button>
                                              <button className="btn btn-primary btn-sm"
                                                      type="button"
                                                      style={{background: "#df162c", borderWidth: 0}}
                                                      onClick={handlePrint}><i className="fas fa-print"
                                                                               style={{marginRight: 5}}/>
                                                  Facture RG
                                              </button>
                                               <button className="btn btn-primary" type="button" style={{ height: 40 , background: "#df162c", borderWidth: 0  }}
                                                                onClick={openModal}>
                                                            <i className="fa fa-send" />
                                                            &nbsp;Rembourser
                                                        </button>
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
                                      style={{overflowY:"hidden",width:"100%" }}

                                  >
                                      <AgGridReact ref={gridRef}
                                                   rowData={data} columnDefs={fields}
                                                     onGridReady={onGridReady}

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


