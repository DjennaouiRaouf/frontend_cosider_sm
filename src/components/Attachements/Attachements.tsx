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
import AddAttachement from "../AddAttachement/AddAttachement";
import AlertMessage from "../AlertMessage/AlertMessage";
import {formatDate, Humanize} from "../Utils/Utils";
import Attacher from "../ActionRenderer/Attacher/Attacher";
import SearchAttachements from "../SearchAttachements/SearchAttachements";
import {showSearchAtt} from "../Slices/SearchModalSlices";

import {ButtonGroup, Dropdown} from "react-bootstrap";
import CreancePrinter from "../EtatCreance/CreancePrinter/CreancePrinter";
import {useReactToPrint} from "react-to-print";
import AttPrinter from "./AttPrinter/AttPrinter";
import DecomptePPrinter from "./DecomptePPrinter/DecomptePPrinter";

const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {


    case 'montant' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_cumule' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

         case 'montant_precedent' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

    case 'date' :
      return <span>{formatDate(value)}</span>

      default:
        return <span>{value}</span>
  }

};

const Attachements: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef(null);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const { nt,pole ,month} = useParams();
  const[resume,setResume]=useState<any>({});
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
        const smonth:string=encodeURIComponent(String(month));
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getatt/?nt=${ntid}&code_site=${pid}&mm=${smonth?.split('-')[1]}&aa=${smonth?.split('-')[0]}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setData(response.data.att);
          setResume(response.data.extra)
        })
        .catch((error:any) => {

        });


  }


    const navigate=useNavigate();
  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/attfields/?flag=l`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                    const updatedCols:any[] = [...response.data.fields,



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
      const searchAtt = () => {
        dispatch(showSearchAtt());
    }

    const print_dec = () => {
        navigate('print_dec', { state: { cid:String('cid'),month: month?.split('-')[1],year:month?.split('-')[0],is_att:false} }) // decompte prov
    }
      const componentRef = useRef<any>();
     const handlePrint = useReactToPrint({
        content: () => componentRef.current,

      });

      const componentRef2 = useRef<any>();
     const handlePrint2 = useReactToPrint({
        content: () => componentRef2.current,

      });
     
     const cancel = async() => {
             const pks:any[]=[]
    const myDictionary: { [key: string]: any } = {};
    selectedRows.forEach(obj => {

        pks.push(obj['id'])


    });
    const pkList:any={}
    pkList['id']=pks
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/sm/delatt/`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
      data: pkList,

    })
        .then((response:any) => {

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



        })
        .catch((error:any) => {

        });

    setSelectedRows([])
     }


  return (
      <>
          <AlertMessage/>
          <SearchAttachements/>
          <div id="wrapper">
                <AttPrinter ref={componentRef} data={data} extra={resume}/>
                <DecomptePPrinter ref={componentRef2} data={data} extra={resume}/>
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Attachements des travaux du mois {month} dont le NT {nt} et le pole {pole}  </p>
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
                                                              <span>Montant</span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>{Humanize(resume.mt) +"DA"}</span>
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
                                                              <span>Taux réalisée</span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>{Humanize(resume.qt)}%</span>
                                                          </div>
                                                      </div>
                                                      <div className="col-auto">
                                                          <i
                                                              className="fas fa-balance-scale-right fa-2x text-gray-300"
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

                                              <ButtonGroup style={{height: 40}}>


                                                  <Dropdown style={{
                                                      background: "#df162c",
                                                      borderRadius: 5,
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0
                                                  }}>
                                                      <Dropdown.Toggle style={{
                                                          height: 40,
                                                          background: "#df162c",
                                                          borderBottomLeftRadius: 10,
                                                          borderTopRightRadius: 10,
                                                          borderWidth: 0
                                                      }} id="dropdown-basic"
                                                      >
                                                          <i className="fas fa-print"/>
                                                          &nbsp;Imprimer
                                                      </Dropdown.Toggle>

                                                      <Dropdown.Menu>
                                                          <Dropdown.Item onClick={handlePrint}>
                                                              <i className="bi bi-file-earmark-pdf-fill"></i>
                                                              &nbsp;Imprimer l'attachement</Dropdown.Item>
                                                          <Dropdown.Item onClick={handlePrint2}>
                                                              <i className="bi bi-file-earmark-pdf-fill"></i>
                                                              &nbsp;Imprimer le Décompte provisoire</Dropdown.Item>

                                                      </Dropdown.Menu>
                                                  </Dropdown>
                                                  <button className="btn btn-primary " type="button"
                                                          style={{background: "#df162c", borderWidth: 0}}
                                                          onClick={searchAtt}>
                                                      <i className="fas fa-search" style={{marginRight: 5}}/>
                                                      Rechercher
                                                  </button>
                                                  <button className="btn btn-primary " type="button"
                                                          style={{background: "#df162c", borderWidth: 0}}
                                                          onClick={cancel}>
                                                      <i className="fas fa-trash" style={{marginRight: 5}}/>
                                                      Annuler
                                                  </button>
                                              </ButtonGroup>

                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="ag-theme-alpine mt-4"
                                      style={{height: 500, width: "100%"}}

                                  >
                                      <AgGridReact ref={gridRef}
                                                   rowData={data} columnDefs={fields}
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}
                                                    onGridReady={onGridReady}

                                             onSelectionChanged={onSelectionChanged}



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


export default Attachements;


