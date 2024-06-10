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
import {formatDate, Humanize, Transform} from "../Utils/Utils";
import Attacher from "../ActionRenderer/Attacher/Attacher";
import SearchAttachements from "../SearchAttachements/SearchAttachements";
import {showSearchAtt} from "../Slices/SearchModalSlices";

import {ButtonGroup, Dropdown} from "react-bootstrap";
import CreancePrinter from "../EtatCreance/CreancePrinter/CreancePrinter";
import {useReactToPrint} from "react-to-print";
import ProdSPrinter from "./ProdSPrinter/ProdSPrinter";
import Plot from "react-plotly.js";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

     case 'ind':
          return (
        <>
          {value === true && (
            <i className="fas fa-exclamation-triangle pulse animated infinite" style={{ fontSize: 16, color: "#df162c", marginRight: 5 }} />
          )}
          {value === false && (
            <i className="far fa-check-circle pulse animated infinite" style={{ fontSize: 16, color: 'rgb(0,255,41)', marginRight: 5 }} />
          )}
        </>
      );



    case 'ecart' :
        return <span>{numeral(value).format('0.0000')}{" "}{props.data.unite}</span>
    case 'qte_att' :
        return <span>{numeral(value).format('0.0000')}{" "}{props.data.unite}</span>
    case 'qte_prod' :
        return <span>{numeral(value).format('0.0000')}{" "}{props.data.unite}</span>



    case 'date' :
      return <span>{formatDate(value)}</span>

      default:
        return <span>{value}</span>
  }

};

const ProductionStockee: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef(null);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const { nt,pole } = useParams();
  const[resume,setResume]=useState<any>({});
  const[x,setX]=useState<any[]>([]);
  const[y1,setY1]=useState<any[]>([]);
  const[y2,setY2]=useState<any[]>([]);

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
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ps/?nt=${ntid}&code_site=${pid}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setData(response.data.prod);
          setX(response.data.extra.x);
          setY1(response.data.extra.y1);
          setY2(response.data.extra.y2);




        })
        .catch((error:any) => {

        });


  }


    const navigate=useNavigate();
  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/prodfields/?flag=l`,{
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


    getData('');
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

     const componentRef = useRef<any>();
     const handlePrint = useReactToPrint({
        content: () => componentRef.current,

      });



  return (
      <>
          <AlertMessage/>
          <div id="wrapper">
                <ProdSPrinter ref={componentRef} data={data} extra={resume}/>

              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold"><i className="fas fa-exclamation-triangle pulse animated infinite" style={{ fontSize: 16, color: "#df162c", marginRight: 5 }} /> Etat de la production stockée du NT {nt} dont le Pole {pole}   </p>
                              </div>
                              <div className="card-body">
                                  <div className="row d-xxl-flex justify-content-xxl-center mb-4">
                                       <div className="plot-container">
                                        <Plot

                                                              data={[
                                                                {
                                                                    x: x,
                                                                    y: y1,
                                                                    name: 'Quantités Attachés',
                                                                    type: 'scatter'

                                                                },
                                                                  {
                                                                      x: x,
                                                                      y: y2,
                                                                      name: 'Quantités Produites ',
                                                                      type: 'scatter'

                                                                  },





                                                              ]}



                                                              layout={{title: `Production Stockées  `,

                                                                  xaxis: {title: 'Code de la Tache'},
                                                                  yaxis: {title: 'Quantité'},




                                                          }}
                                                             useResizeHandler={true}
                                                             style={{width:'100%'}}
                                                          />

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
                                                              &nbsp;Etat de production</Dropdown.Item>


                                                      </Dropdown.Menu>
                                                  </Dropdown>

                                              </ButtonGroup>

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


export default ProductionStockee;


