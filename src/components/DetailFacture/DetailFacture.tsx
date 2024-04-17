import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {formatDate, Transform} from "../Utils/Utils";
import {hideDetailInvoice} from "../Slices/DetailModalSlices";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import numeral from "numeral";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {


      case 'prix_u' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

      case 'montant' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

      case 'date' :
      return <span>{formatDate(value)}</span>

      default:
      return <span>{value}</span>
  }

};


const DetailFacture: React.FC<any> = () => {
     const { showDetailInvoiceForm } = useSelector((state: RootState) => state.detailDataModalReducer);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const gridRef = useRef(null);

   const handleClose = () => {
            dispatch(hideDetailInvoice());
    }

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


  return (
      <>
         <Modal show={showDetailInvoiceForm.shown} onHide={handleClose} size={"xl"}>
        <Modal.Header closeButton>
          <Modal.Title>Detail de la Facture N° </Modal.Title>
        </Modal.Header>
             <Modal.Body>
                 <div
                     className="ag-theme-alpine mt-4"
                     style={{height: 500, width: "100%"}}

                 >
                     <AgGridReact ref={gridRef}
                                  rowData={showDetailInvoiceForm.data} columnDefs={showDetailInvoiceForm.fields}
                                  gridOptions={gridOptions}


                     />

                 </div>

             </Modal.Body>
             <Modal.Footer>

             </Modal.Footer>
         </Modal>
      </>
  );
};

export default DetailFacture;


