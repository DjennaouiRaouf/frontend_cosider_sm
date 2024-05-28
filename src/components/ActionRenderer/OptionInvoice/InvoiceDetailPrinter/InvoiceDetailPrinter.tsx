import {forwardRef, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../Store/Store";
import "./InvoiceDetailPrinter.css"
import {Humanize} from "../../../Utils/Utils";
import axios from "axios";
import Cookies from "js-cookie";

import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import "./InvoiceDetailPrinter.css";
interface InvoicePrinterProps {
  data:any;
  rowData:any

}
const InvoiceDetailPrinter = forwardRef<HTMLDivElement, InvoicePrinterProps>((props, ref) => {
       const[extra,setExtra]=useState<any>({});
     const { nt,pole } = useParams();

        const [searchParams] = useSearchParams();
    const getExtra = async(url:string) => {
        const ntid:string=encodeURIComponent(String(nt));
        const pid:string=encodeURIComponent(String(pole));
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getfacture/?marche__nt=${ntid}&marche__code_site=${pid}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setExtra(response.data.extra)
            console.log(response.data.extra)
        })
        .catch((error:any) => {

        });


  }

     useEffect(() => {
    const paramsArray:any[] = Array.from(searchParams.entries());
    // Build the query string
    const queryString = paramsArray.reduce((acc, [key, value], index) => {
      if (index === 0) {
        return `?${key}=${encodeURIComponent(value)}`;
      } else {
        return `${acc}&${key}=${encodeURIComponent(value)}`;
      }
    }, '');

    getExtra(queryString);

  },[]);

  return (
      <div ref={ref} className="print-only " style={{width: "29.7cm", height: '21cm', margin: 0}}>
          <style>
              {`
            @media print {
              @page {
                size: landscape;
              }
            }
          `}
          </style>
          <div className="container-fluid">
              <h6>Le : {props.rowData.date}</h6>
              <h4 className="text-center">
                  Détail de La Facture N° {props.rowData.numero_facture}&nbsp; Dont la Situtation N°{props.rowData.num_situation}&nbsp;&nbsp;
              </h4>
              <hr/>
              <div className="input-group w-100">
                  <label
                      className="form-label  w-80"
                      style={{fontWeight: "bold",marginRight:5}}
                  >
                      Marché :
                  </label>
                  <label className="form-label  w-10">{extra.contrat}</label>
                  <label
                      className="form-label  w-10"
                      style={{fontWeight: "bold",marginLeft:5,marginRight:5}}
                  >
                      du
                  </label>
                  <label className="form-label  w-10">{extra.signature}</label>
              </div>
              <div className="input-group w-100">
                  <label
                      className="form-label  w-80"
                      style={{fontWeight: "bold",marginRight:5}}
                  >
                      Objet :
                  </label>
                  <label
                      className="form-label text-start  w-40"
                      style={{whiteSpace: "pre-wrap",marginLeft:5,marginRight:5}}
                  >
                      {extra.projet}
                  </label>
                  <label
                      className="form-label  w-10"
                      style={{marginRight:5}}
                  >
                      d'un montant de
                  </label>
                  <label className="form-label  w-10"style={{fontWeight: "bold"}}>{Humanize(extra.montant_marche)} DA</label>
                  <label
                      className="form-label  w-10"
                      style={{marginRight:5,marginLeft:5}}
                  >
                      en HT
                  </label>
              </div>
              <label
                  className="form-label"
                  style={{fontWeight: "bold", textDecoration: "underline"}}
              >
                  Réf :
              </label>
              <div className="input-group w-100">
                  <label
                      className="form-label  w-80"
                      style={{fontWeight: "bold",marginRight:5}}
                  >
                      Client:
                  </label>
                  <label className="form-label  w-10" style={{marginRight:5}}>{extra.client}</label>
                  <label
                      className="form-label  w-80"
                      style={{fontWeight: "bold",marginRight:5}}
                  >
                      NT:
                  </label>
                  <label className="form-label  w-10"style={{marginRight:5}}>{extra.nt}</label>
                  <label
                      className="form-label  w-10"
                      style={{fontWeight: "bold",marginRight:5,marginLeft:5}}
                  >
                      Pole :
                  </label>
                  <label className="form-label  w-10">{extra.pole}</label>
              </div>
              <hr/>
          </div>
          <div className="table-responsive mt-0">
              <table className="table">
                  <thead>
                  <tr>
                      <th>Réf Tache</th>
                      <th>Libelle</th>
                      <th>Prix_U</th>
                      <th>Quantite</th>
                      <th>Montant</th>
                  </tr>
                  </thead>
                  <tbody>
                   {props.data.map((item: any, index: any) => (
                       <tr key={index}>
                           <td>{item.code_tache}</td>
                           <td><p className="text-break" style={{width:"300px"}}>{item.libelle}</p></td>
                           <td>{Humanize(item.prix_u)} DA</td>
                           <td>{item.qte}</td>

                           <td>{Humanize(item.montant)} DA</td>
                       </tr>
                   ))}
                  </tbody>
              </table>
          </div>
      </div>

  )
});

export default InvoiceDetailPrinter;

