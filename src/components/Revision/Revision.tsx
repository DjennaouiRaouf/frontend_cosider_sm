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
import {showSearchRev} from "../Slices/SearchModalSlices";
import SearchFlash from "../SearchFlash/SearchFlash";
import {displayAlertMessage, Variant} from "../Slices/AlertMessageSlices";
import SearchRev from "../SearchRev/SearchRev";
import {Dropdown} from "react-bootstrap";
import * as XLSX from "xlsx";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {


    case 'coef' :
        return <span>{numeral(value).format('0.0000')}</span>

    case 'date' :
      return <span>{formatDate(value)}</span>

      default:
        return <span>{value}</span>
  }

};

const Revision: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef(null);
  const { nt,pole } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
                    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getrev/?code_site=${pid}&nt=${ntid}`,{
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
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/revfields/?flag=l`,{
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
      dispatch(showSearchRev())
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
  
  const handleUploadRev = () => {

          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
  }

  const download = () => {
    if (data.length > 0 ) {
                const dataset: any[] = data.map(obj => ({...obj}))
              const currentDate = new Date();
              const yearString = currentDate.getFullYear().toString();
              const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
              const dayString = currentDate.getDate().toString().padStart(2, '0');

              const ws = XLSX.utils.json_to_sheet(dataset);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
              XLSX.writeFile(wb, `Revision_${yearString}-${monthString}-${dayString}.xlsx`);
          }
  }



    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
      const formData = new FormData();
      if (file) {
        formData.append('file', file);

        if(nt && pole){
            formData.append("nt", nt);
            formData.append("cs", pole);

        }
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/revprix/`, formData, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            'Content-Type': 'multipart/form-data',
          },

        })
            .then((response: any) => {
            dispatch(displayAlertMessage({variant: Variant.SUCCESS, message: response.data}))
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
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
            .catch((error: any) => {
                console.log(error)
                dispatch(displayAlertMessage({variant:Variant.DANGER,message:JSON.stringify(error.response.data,null,2)}))

              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }

            });
      }

  };

  return (
      <>
          <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              hidden={true}
              style={{display: 'none'}}
              ref={(input) => (fileInputRef.current = input)}
          />

          <AlertMessage/>
          <AddAttachement refresh={() => {
              getData('')
          }}/>
          <SearchRev/>

          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Révision Des Prix du Marché dont le NT {nt} et
                                      le Pole {pole}   </p>
                              </div>
                              <div className="card-body">

                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}}
                                                      onClick={searchFlash}>
                                                  <i className="fas fa-search" style={{marginRight: 5}}/>
                                                  Rechercher
                                              </button>
                                              <Dropdown>
                                                  <Dropdown.Toggle className="btn btn-primary btn-sm" style={{
                                                      height: 40, background: "#df162c", borderWidth: 0
                                                      , borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                                                  }} id="dropdown-basic"
                                                  >
                                                      <i className="fas fa-share"/>
                                                      &nbsp;Transfert
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                      <Dropdown.Item onClick={handleUploadRev}>
                                                          <i className="fas fa-upload"></i>
                                                          &nbsp;Charger</Dropdown.Item>

                                                      <Dropdown.Item onClick={download}>
                                                          <i className="fas fa-download"></i>
                                                          &nbsp;Télécharger</Dropdown.Item>

                                                  </Dropdown.Menu>
                                              </Dropdown>

                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="ag-theme-alpine mt-4"
                                      style={{overflowY: "hidden", width: "100%"}}


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


export default Revision;


