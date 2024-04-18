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
import AddDQE from "../AddDQE/AddDQE";
import {showAddDQE} from "../Slices/AddModalSlices";
import SearchDQE from "../SearchDQE/SearchDQE";
import {showSearchDQE} from "../Slices/SearchModalSlices";
import {Humanize} from "../Utils/Utils";
import Attacher from "../ActionRenderer/Attacher/Attacher";
import DQEOption from "../ActionRenderer/DQEOption/DQEOption";
import UpdateDQE from "../UpdateDQE/UpdateDQE";
import AlertMessage from "../AlertMessage/AlertMessage";
import {Dropdown} from "react-bootstrap";
import * as XLSX from "xlsx";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'prix_u' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'prix_q' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    default:
      return <span>{value}</span>
  }

};

const DQE: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
   const[resume,setResume]=useState<any>({});

  const gridRef = useRef(null);
  const { cid } = useParams();

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
        const contrat_id:string=encodeURIComponent(String(cid));
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getdqe/?marche=${contrat_id}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setData(response.data.dqe);
          if(response.data.extra)
          {
              setResume(response.data.extra)
          }
        })
        .catch((error:any) => {

        });


  }

  const msg = (s:string) => {
    alert(s)
  }

  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/dqefields/?flag=l`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                    const updatedCols:any[] = [
                     {
                    headerName:' ',
                    cellRenderer:DQEOption,
                         minWidth: 50,
                         cellRendererParams:{
                                refresh:getData,

                              }
                    },...response.data.fields,



                    ];

                 setFields(updatedCols)



            })
            .catch((error:any) => {

            });

    }



       const handleRowClick = (event: any) => {
        setSelectedRows(event.data);

  };
    const navigate=useNavigate();
    const graph = () => {
        navigate('state/')
    }


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
         dispatch(showAddDQE())

    }
      const searchD = () => {
        dispatch(showSearchDQE())

    }
    const download = () => {
          if (data.length > 0 ) {
              const currentDate = new Date();
              const yearString = currentDate.getFullYear().toString();
              const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
              const dayString = currentDate.getDate().toString().padStart(2, '0');

              const ws = XLSX.utils.json_to_sheet(data);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
              XLSX.writeFile(wb, `DQE_${yearString}-${monthString}-${dayString}.xlsx`);
          }
    }
    const upload = () => {
      
    }


  return (
      <>
          <AlertMessage/>
          <AddDQE refresh={()=>{getData('')}}/>
          <SearchDQE/>
          <UpdateDQE refresh={()=>{getData('')}}/>
          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">DQE du Contrat N° {cid} </p>
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
                                                              <span>Montant </span>
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
                                      <div className="col-md-6 col-xxl-2">
                                          <div className="card shadow border-start-success py-2">
                                              <div className="card-body">
                                                  <div className="row align-items-center no-gutters">
                                                      <div className="col me-2">
                                                          <div
                                                              className="text-uppercase text-success fw-bold text-xs mb-1">
                                                              <span>Quantité </span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>{Humanize(resume.qt) +"T"}</span>
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
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addD}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>

                                                  Ajouter un dqe
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={graph}>
                                                  <i className="fas fa-bar-chart" style={{marginRight: 5}}/>

                                                   Avancement
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={searchD}>
                                                  <i className="fas fa-search" style={{marginRight: 5}}/>
                                                  Rechercher
                                              </button>
                                                 <Dropdown>
                                <Dropdown.Toggle  className="btn btn-primary btn-sm"  style={{ height: 40 , background: "#df162c", borderWidth: 0
                                  ,borderTopLeftRadius:0,borderBottomLeftRadius:0}} id="dropdown-basic"
                                >
                                  <i className="fas fa-share" />
                                  &nbsp;Transfert
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    <i className="fas fa-upload" onClick={upload}></i>
                                    &nbsp;Charger</Dropdown.Item>

                                     <Dropdown.Item onClick={download} >
                                    <i className="fas fa-download"></i>
                                    &nbsp;Télécharger</Dropdown.Item>

                                </Dropdown.Menu>
                              </Dropdown>

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


export default DQE;
