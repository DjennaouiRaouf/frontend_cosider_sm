import * as React from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import {useSearchParams} from "react-router-dom";
import {displayAlertMessage, Variant} from "../../Slices/AlertMessageSlices";
import {showAddEncaissement} from "../../Slices/AddModalSlices";
import ReactToPrint, {useReactToPrint} from 'react-to-print';
import {useRef} from "react";
import './OptionInvoice.css'
import InvoicePrinter from "./InvoicePrinter/InvoicePrinter";
type DelInvoiceProps = {
 data:any;
 refresh:(params:any)=>void,
};



// JSX component




const OptionInvoice: React.FC<DelInvoiceProps> = (props) => {
     const dispatch=useDispatch();
     const [searchParams] = useSearchParams();
     const componentRef = useRef<any>();
     const handlePrint = useReactToPrint({
        content: () => componentRef.current,

      });

     const Delete = async() => {
       const rowData:any =  props.data;
       if(rowData){
           await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/sm/annulefacture/`, {
               headers: {
                  Authorization: `Token ${Cookies.get("token")}`,
                  'Content-Type': 'application/json',
                },
               data:{numero_facture:[rowData['numero_facture']]},

            })
            .then(response => {
                const paramsArray = Array.from(searchParams.entries());
                const queryString = paramsArray.reduce((acc, [key, value], index) => {
                  if (index === 0) {
                    return `?${key}=${encodeURIComponent(value)}`;
                  } else {
                    return `${acc}&${key}=${encodeURIComponent(value)}`;
                  }
                }, '');

                props.refresh(queryString);
                dispatch(displayAlertMessage({variant: Variant.SUCCESS, message: "Facture Annulée"}))

            })
            .catch(error => {
            });
       }

    }
    const encaisser = () => {
        const rowData:any =  props.data;
        if(rowData){
            dispatch(showAddEncaissement(rowData['numero_facture']))
        }
    }



    return (<>
        <button
            className="btn btn-primary btn-sm"
            type="button"
            style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
            onClick={Delete}

        >
            <i className="far fa-trash-alt" style={{fontSize: 16, marginRight: 9}}/>
            Annuler
        </button>
        <div>
            <InvoicePrinter ref={componentRef} data={props.data}/>
            <button   className="btn btn-primary btn-sm"
                    type="button"
                    style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
                      onClick={handlePrint}> <i className="fas fa-print" style={{fontSize: 16, marginRight: 9}}/>
                    Imprimer</button>
        </div>




        <button
            className="btn btn-primary btn-sm"
            type="button"
            style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
            onClick={encaisser}

        >
            <i className="fas fa-money" style={{fontSize: 16, marginRight: 9}}/>
            Encaisser
        </button>


    </>);
};

export default OptionInvoice;
