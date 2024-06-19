import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import numeral from "numeral";
import {Button,Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";
import {showAddContrat} from "../Slices/AddModalSlices";
import AddAvenant from "../AddAvenant/AddAvenant";
import {showSearchContrat} from "../Slices/SearchModalSlices";
import SearchContrat from "../SearchContrat/SearchContrat";
import Cookies from "js-cookie";
import ContratOption from "../ActionRenderer/ContratOption/ContratOption";

import UpdateContrat from "../UpdateContrat/UpdateContrat";
import AlertMessage from "../AlertMessage/AlertMessage";
import SearchContratAV from "../SearchContratAV/SearchContratAV";



const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'montant_ht' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_ttc' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'rg':
      return <span>{value+" %"}</span>
    case 'tva':
      return <span>{value+" %"}</span>
    case 'rabais':
      return <span>{value+" %"}</span>
      case 'id' :
        return <span></span> 
    default:
      return <span>{value}</span>
  }

};

const ContratAvenant: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const gridRef = useRef(null);

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
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/mav/${url}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          setData(response.data);



        })
        .catch((error:any) => {

        });


  }



  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/mavfields/?flag=l`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                         const updatedCols:any[] = [
                                {
                    headerName:' ',
                    cellRenderer:ContratOption,
                         maxWidth: 100,
                                    pinned:'left',
                         cellRendererParams:{
                                refresh:getData,

                              }
                    },

                             ...response.data.fields


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
    const addC = () => {
      dispatch(showAddContrat())
    }
      const searchC = () => {
      dispatch(showSearchContrat())
    }

  return (
      <>
          <>
            <AddAvenant refresh={()=>{getData('')}}/>
               <UpdateContrat refresh={()=>{getData('')}}/>
            <SearchContratAV/>
              <AlertMessage/>
          </>
          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Nos Avenants (Contrats)</p>
                              </div>
                              <div className="card-body">

                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addC}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>
                                                  Nouvel Avenant
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={searchC}>
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
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}
                                                 groupDisplayType={"groupRows"}
                                                 suppressContextMenu={true}

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

export default ContratAvenant;
