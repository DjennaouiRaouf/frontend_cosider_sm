import { forwardRef } from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../Store/Store";
import "./InvoicePrinter.css"
import {Humanize} from "../../../Utils/Utils";
interface InvoicePrinterProps {
  data:any
}
const InvoicePrinter = forwardRef<HTMLDivElement, InvoicePrinterProps>((props, ref) => {

  return (
      <div ref={ref} className={"print-only"} style={{marginRight: '12px', marginLeft: '12px'}}>
          <label className="form-label mt-3 mb-3" style={{fontSize: '12px'}}>
              Le: {props.data.date}
          </label>
          <div>
              <h1 className="text-center" style={{textAlign: "center", fontSize: '15px', textDecoration: "underline"}}>
                  Facture N°&nbsp;{props.data.numero_facture}
              </h1>
          </div>


          <label className="form-label mt-3 mb-3" style={{fontSize: '12px'}}>
              <strong>Situation de Travaux N°:</strong> {props.data.num_situation}
          </label>
          <hr/>
          <div>
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
          <div className={'mt-3 mb-3'}>
              <label className="form-label" style={{fontSize: '12px'}}>
                  Selon la situation des travaux du {props.data.du} au {props.data.au} : <br/><br/>
                  Montant cumulé des traveaux réalisés au {props.data.au} en
                  (HT) {Humanize(props.data.montant_cumule)} DA <br/>
                  Montant cumulé précédemment des traveaux réalisés au {props.data.du} en
                  (HT) {Humanize(props.data.montant_precedent)} DA <br/>


                  Montant cumulé des traveaux réalisés du {props.data.du} au {props.data.au} en
                  (HT) {Humanize(props.data.montant)} DA <br/>

                  RG : {props.data.retenue_garantie}% <br/> Montant de retenue de garantie en
                  (HT) {Humanize(props.data.montant_rg)} DA <br/>
                  Taux de rabais : {props.data.rabais}% <br/> Montant du rabais en (HT)
                  : {Humanize(props.data.montant_rb)} DA <br/>
                  TVA : {props.data.tva}% <br/>
                  Montant de la
                  taxe {Humanize((props.data.tva / 100) * props.data.montant)} DA <br/>


              </label>
          </div>

          {
          props.data.montant_avf_remb!=="0.00" &&
          <div className={'mt-3 mb-3'}>
              <label className="form-label " style={{fontSize: '12px', width: '100%'}}>
                  <strong>Avance Forfaitaire </strong>:{Humanize(props.data.montant_avf_remb)} DA
              </label>
          </div>

          }
          { props.data.montant_ava_remb !=="0.00" &&
          <div className={'mt-3 mb-3'}>
              <label className="form-label " style={{fontSize: '12px', width: '100%'}}>
                  <strong>Avance sur Appros</strong>:{Humanize(props.data.montant_avf_remb)} DA
              </label>
          </div>
          }

          {props.data.tva === "0.00" &&

              <div className={'mt-3 mb-3'}>
                  <label className="form-label text-center" style={{fontSize: '12px', width: '100%'}}>
                      <strong>EXONEREE DES TAXES</strong>
                  </label>
              </div>
          }


          <div className={'mt-3 mb-3'}>
              <label className="form-label" style={{fontSize: '12px'}}>
                  MONTANT DE LA FACTURE EN (HT) {Humanize(props.data.montant_factureHT)} DA <br/>
                  MONTANT NET À PAYER À L'ENTREPRISE EN (TTC) {Humanize(props.data.montant_factureTTC)} DA <br/>

              </label>
          </div>

          <div className={'mt-3 mb-3'}>
              <label className="form-label" style={{fontSize: '12px'}}>
                  Arretée la présente facture à la somme de <strong>{props.data.somme}</strong>
              </label>
          </div>


      </div>
  )
});

export default InvoicePrinter;

