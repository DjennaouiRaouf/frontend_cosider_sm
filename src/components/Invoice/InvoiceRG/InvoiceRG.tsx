import { forwardRef } from 'react';
import {useSelector} from "react-redux";
import {Humanize} from "../../Utils/Utils";

interface InvoiceRGProps {
  facture:any
  extra:any
}
const InvoiceRG = forwardRef<HTMLDivElement, InvoiceRGProps>((props, ref) => {

    const currentDate = () :string => {
      var currentDate = new Date();

        var year = currentDate.getFullYear();
        var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        var day = ('0' + currentDate.getDate()).slice(-2);
        var formattedDate = year + '-' + month + '-' + day;
        return formattedDate

    }
  return (
      <div ref={ref} className={"print-only"}
           style={{width: '21cm', height: '29.7cm', margin: 0}}>
          <style>
              {`
            @media print {
              @page {
                size: portrait;
              }
            }
          `}
          </style>
          <label className="form-label mt-3 mb-3" style={{fontSize: '12px'}}>
              Le: {currentDate()}
          </label>
          <div>
              <h1 className="text-center" style={{textAlign: "center", fontSize: '15px', textDecoration: "underline"}}>
                  Facture Retenue de Garantie
              </h1>
          </div>


          <hr/>
          <div>

              <label className="form-label" style={{fontSize: '12px'}}>
                  <strong>Marché:</strong> {props.extra.contrat} du {props.extra.signature} <br/>
                  <strong>Objet:</strong> {props.extra.projet} <br/>d'un montant
                  de {Humanize(props.extra.montant_marche)} DA <br/>
                  <span style={{textDecoration: "underline", fontSize: '12px'}}><strong>REF:</strong> </span>
                  &nbsp;
                  <strong style={{fontSize: '12px'}}>Pole:</strong>{props.extra.pole} &nbsp;
                  <strong style={{fontSize: '12px'}}>NT:</strong>{props.extra.num_travail}&nbsp;
                  <strong style={{fontSize: '12px'}}>Client:</strong>{props.extra.client}&nbsp;

              </label>

              <hr/>
          </div>
          <div className={'mt-3 mb-3'}>

              <div className="table-responsive" style={{fontSize: '12px', width: "100%"}}>
                  <table className="table">
                      <thead>
                      <tr>
                          <th>Facture</th>
                          <th>Situation</th>
                          <th>Montant RG</th>

                      </tr>
                      </thead>
                      <tbody>
                      {props.facture.map((item: any, index: any) => (
                          <tr key={index}>
                              <td>{item.numero_facture}</td>
                              <td>{item.num_situation}</td>
                              <td>{Humanize(item.montant_rg)} DA</td>
                          </tr>
                      ))}
                      <tr>
                          <td className={"text-start"}>Total :</td>
                          <td className={"text-start"}>{Humanize(props.extra.rg_total)} DA</td>
                      </tr>
                      </tbody>
                  </table>
              </div>

          </div>


      </div>
  )
});

export default InvoiceRG;

