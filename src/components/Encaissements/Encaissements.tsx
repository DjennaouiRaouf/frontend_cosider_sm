import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import {
  ColDef,

} from "ag-grid-community";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import numeral from "numeral";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import AlertMessage from "../AlertMessage/AlertMessage";
import {formatDate, Humanize, Transform} from "../Utils/Utils";
import {displayAlertMessage, Variant} from "../Slices/AlertMessageSlices";



const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {


    case 'montant_encaisse' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>


    case 'restant' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>


    case 'date' :
      return <span>{formatDate(value)}</span>

      default:
        return <span>{value}</span>
  }

};

const Encaissements: React.FC<any> = () => {
    const [fields, setFields] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [contrat, setContrat] = useState<string>('');
    const [searchParams] = useSearchParams();
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const gridRef = useRef(null);
    const {nt, pole} = useParams();


    const defaultColDefs: ColDef = {
         flex: 1,
        sortable: true,
        resizable: true,
        minWidth: 200,
        autoHeight: true, wrapText: true,
        cellStyle: {textAlign: 'start', border: "none"},

    };

    const gridOptions: any = {
        pagination: true,
        defaultColDef: defaultColDefs,
        multiSortKey: 'ctrl',
        animateRows: true,
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


    const getData = async (url: string) => {
        const ntid: string = encodeURIComponent(String(nt));
        const pid: string = encodeURIComponent(String(pole));
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/encaissements/?facture__marche__nt=${ntid}&facture__marche__code_site=${pid}${url.replace('?', "&")}`, {
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response: any) => {
                setData(response.data);
            })
            .catch((error: any) => {
                setData([])
            });


    }


    const navigate = useNavigate();
    const getFields = async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/encaissmentfields/?flag=l`, {
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response: any) => {

                const updatedCols: any[] = [...response.data.fields,


                ];

                setFields(updatedCols)


            })
            .catch((error: any) => {

            });

    }


    const handleRowClick = (event: any) => {
        console.log(event)
    };


    const dispatch = useDispatch();

    const DelEnc = async() => {
        console.log(selectedRows)
        const pks: any[] = []
        const myDictionary: { [key: string]: any } = {};
        selectedRows.forEach(obj => {
            pks.push(obj['id'])
        });
        const pkList: any = {}
        pkList['id'] = pks;
                await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/sm/delencaissements/`, {
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
            data: pkList,

        })
            .then((response: any) => {

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

                dispatch(displayAlertMessage({variant: Variant.DANGER, message: "Encaissement(s) Annulé(s)"}))


            })
            .catch((error: any) => {
                dispatch(displayAlertMessage({variant: Variant.DANGER, message: "Encaissement(s) déja Facturé(s)"}))

            });

    }

    const[numf,setNumF]=useState<string>('')

    const NumFChange = (e:any) => {
      setNumF(e.target.value);
    }

    const onSearchClickBtn=()=>{
        const url_tmp:string[]=[];
    if(numf){
        const formDataObject={'facture':numf}
        Object.entries(formDataObject).forEach(([key, value], index) => {
          const val:string=String(value);

          if(index === 0){

            url_tmp.push(`${key}=${encodeURIComponent(val)}`);
          }
          if(index >= 1){
            url_tmp.push(`&${key}=${encodeURIComponent(val)}`);
          }

        });

        const queryParamsString = new URLSearchParams(searchParams).toString(); // Convert query parameters to string
        const newLocation = {
          pathname: '', // New route path
          search: queryParamsString, // Append existing query parameters
        };

            navigate(newLocation);
            navigate(`?${url_tmp.join('')}`);

        }
    else {
        const queryParamsString = new URLSearchParams(searchParams).toString(); // Convert query parameters to string
        const newLocation = {
          pathname: '', // New route path
          search: queryParamsString, // Append existing query parameters
        };
            navigate(newLocation);
            navigate(``);
    }

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
        console.log(queryString)
    }, [searchParams]);

    useEffect(() => {
        getFields();
    }, []);


  return (
      <>
          <AlertMessage/>


          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Encaissements Par Facture Dont Le NT N° {nt} Le Pole N° {pole} </p>
                              </div>
                              <div className="card-body">
                                  <div className="row d-xxl-flex justify-content-xxl-center mb-4">
                                      <div className="col-md-6 col-xxl-3">

                                      </div>
                                      <div className="col-md-6 col-xxl-3">

                                      </div>
                                  </div>
                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={DelEnc}>
                                                  <i className="fas fa-trash" style={{marginRight: 5}}/>
                                                  Annuler Encaissement(s)
                                              </button>

                                          </div>
                                      </div>
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="input-group"><input value={numf} placeholder={'Numero de Faccture'} className="form-control " type="text" onChange={(e)=>NumFChange(e)}/>
                                              <button className="btn btn-primary" type="button" onClick={onSearchClickBtn} style={{background: "#df162c", borderWidth: 0}}><i
                                                  className="fas fa-search"></i></button>
                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="ag-theme-alpine mt-4"
                                      style={{overflowY: "hidden", width: "100%"}}

                                  >
                                      <AgGridReact ref={gridRef}
                                                   domLayout='autoHeight'
                                                   rowData={data} columnDefs={fields}
                                                   gridOptions={gridOptions}
                                                   rowSelection={'multiple'}
                                                 suppressAggFuncInHeader={true}
                                                 suppressContextMenu={true}
                                                   animateRows={true}

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

export default Encaissements;





