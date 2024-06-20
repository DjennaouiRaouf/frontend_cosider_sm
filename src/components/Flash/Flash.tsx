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
import {showSearchFlash} from "../Slices/SearchModalSlices";
import SearchFlash from "../SearchFlash/SearchFlash";
import {displayAlertMessage, Variant} from "../Slices/AlertMessageSlices";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {


    case 'valeur_1' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'valeur_2' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'valeur_3' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'coefficient_revison' :
        return <span>{numeral(value).format('0.0000')}</span>


    case 'date' :
      return <span>{formatDate(value)}</span>

      default:
        return <span>{value}</span>
  }

};

const Flash: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef(null);
  const { nt,pole ,month} = useParams();

    const[resume,setResume]=useState<any>({});
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
            rowSelection:'multiple',
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
        const smonth:string=encodeURIComponent(String(month));

                    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sch/getprod/?code_site=${pid}&nt=${ntid}&prevu_realiser=R&code_type_production=01&mm=${smonth?.split('-')[1]}&aa=${smonth?.split('-')[0]}${url.replace('?',"&")}`,{
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
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/flashfields/?flag=l`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                    const updatedCols:any[] = [

                        ...response.data.fields,


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

    const searchFlash = () => {
      dispatch(showSearchFlash())
    }



    const [gridApi, setGridApi] = useState<GridApi | null>(null);

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

  const attacher = () => {

      const input = selectedRows.map(({ code_tache, nt ,code_site,quantite_1,valeur_1,quantite_2,valeur_2,quantite_3,valeur_3,coefficient_revison,mmaa}) => ({ code_tache, nt ,code_site,quantite_1,valeur_1,quantite_2,valeur_2,quantite_3, coefficient_revison,valeur_3,mmaa}));

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addatt/`,input )
      .then(response => {
         dispatch(displayAlertMessage({variant: Variant.SUCCESS, message: "Attachement ajoutés"}))
      })
      .catch(error => {
        dispatch(displayAlertMessage({variant:Variant.DANGER,message:JSON.stringify(error.response.data,null,2)}))

      });

  }

  return (
      <>
          <AlertMessage/>

          <SearchFlash/>

          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Travaux réalisés en {month} dont  le NT  {nt} et le Pole {pole}   </p>
                              </div>
                              <div className="card-body">

                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              { /* <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addBL}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>
                                                  Recup
                                              </button>*/}
                                             <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}}
                                                      onClick={attacher}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>
                                                  Attacher
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}}
                                                      onClick={searchFlash}>
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
                                                    onGridReady={onGridReady}

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


export default Flash;


