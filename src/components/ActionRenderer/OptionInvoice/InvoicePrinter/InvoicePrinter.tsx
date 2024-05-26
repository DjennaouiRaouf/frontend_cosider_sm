import {forwardRef, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../Store/Store";
import "./InvoicePrinter.css"
import {Humanize} from "../../../Utils/Utils";
import axios from "axios";
import Cookies from "js-cookie";

import {useNavigate, useParams, useSearchParams} from "react-router-dom";

interface InvoicePrinterProps {
  data:any;
}
const InvoicePrinter = forwardRef<HTMLDivElement, InvoicePrinterProps>((props, ref) => {
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
      <div ref={ref} className={"print-only"} style={{width: "100%", height: '842px',margin:0}}>
        <div style={{paddingLeft:'2cm',paddingRight:'2cm'}}>
          <label className="form-label mt-3 mb-3" style={{fontSize: '12px'}}>
              Le: {props.data.date}
          </label>
          <div className={'w-100'}>
              <h1 className="text-center" style={{textAlign: "center", fontSize: '15px', textDecoration: "underline"}}>
                  Facture N°&nbsp;{props.data.numero_facture}
              </h1>
          </div>


          <label className="form-label mt-3 mb-3 w-100" style={{fontSize: '12px'}}>
              <strong>Situation de Travaux N°:</strong> {props.data.num_situation}
          </label>
          <hr/>
          <div className={'w-100'}>
              <label className="form-label" style={{fontSize: '12px'}}>
                  <strong>Marché:</strong> {props.data.marche} du {props.data.signature} <br/>
                  <strong>Objet:</strong> {props.data.projet} <br/>d'un montant
                  de {Humanize(props.data.montant_marche)} DA <br/>
                  <span style={{textDecoration: "underline", fontSize: '12px'}}><strong>REF:</strong> </span>
                  &nbsp;
                  <strong style={{fontSize: '12px'}}>Pole:</strong>{props.data.pole} &nbsp;
                  <strong style={{fontSize: '12px'}}>NT:</strong>{props.data.num_travail}&nbsp;
                  <strong style={{fontSize: '12px'}}>Client:</strong>{props.data.client}&nbsp;

              </label>

          </div>
          <hr/>
          <div className={'mt-3 mb-3 w-100'}>
              <label className="form-label" style={{fontSize: '12px'}}>
                  Selon la situation des travaux du {props.data.du} au {props.data.au} : <br/><br/>
                  Montant cumulé des traveaux réalisés au {props.data.au} en
                  (HT) {Humanize(props.data.montant_cumule)} DA <br/>
                  Montant cumulé précédemment des traveaux réalisés au {props.data.du} en
                  (HT) {Humanize(props.data.montant_precedent)} DA <br/>


                  Montant cumulé des traveaux réalisés du {props.data.du} au {props.data.au} en
                  (HT) {Humanize(props.data.montant)} DA <br/>

                  RG : {extra.rg}% <br/> Montant de retenue de garantie en
                  (HT) {Humanize(props.data.montant_rg)} DA <br/>
                  Taux de rabais : {props.data.rabais}% <br/> Montant du rabais en (HT)
                  : {Humanize(props.data.montant_rb)} DA <br/>
                  TVA : {extra.tva}% <br/>
                  Montant de la
                  taxe {Humanize((props.data.tva / 100) * props.data.montant)} DA <br/>


              </label>
          </div>

          {
              props.data.avf !== 0 &&
              <div className={'mt-3 mb-3 w-100'}>
                  <label className="form-label " style={{fontSize: '12px', width: '100%'}}>
                      <strong>Avance Forfaitaire </strong>:{Humanize(props.data.avf)} DA
                  </label>
              </div>

          }
          {props.data.ava !== 0 &&
              <div className={'mt-3 mb-3 w-100'}>
                  <label className="form-label " style={{fontSize: '12px', width: '100%'}}>
                      <strong>Avance sur Appros</strong>:{Humanize(props.data.ava)} DA
                  </label>
              </div>
          }

          {props.data.tva === "0.00" &&

              <div className={'mt-3 mb-3 w-100'}>
                  <label className="form-label text-center" style={{fontSize: '12px', width: '100%'}}>
                      <strong>EXONEREE DES TAXES</strong>
                  </label>
              </div>
          }


          <div className={'mt-3 mb-3 w-100'}>
              <label className="form-label" style={{fontSize: '12px',width:'100%'}}>
                  MONTANT DE LA FACTURE EN (HT) {Humanize(props.data.montant_factureHT)} DA <br/>
                  MONTANT NET À PAYER À L'ENTREPRISE EN (TTC) {Humanize(props.data.montant_factureTTC)} DA <br/>

              </label>
          </div>

          <div className={'mt-3 mb-3 w-100'}>
              <label className="form-label" style={{fontSize: '12px' ,width:"100"}}>
                  Arretée la présente facture à la somme de <strong>{props.data.somme}</strong>
              </label>
          </div>

        </div>
      </div>
  )
});

export default InvoicePrinter;

