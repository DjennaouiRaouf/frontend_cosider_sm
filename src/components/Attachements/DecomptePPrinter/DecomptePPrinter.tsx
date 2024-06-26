import { forwardRef } from 'react';
import {useSelector} from "react-redux";
import "./DecomptePPrinter.css"
import {Humanize} from "../../Utils/Utils";
interface DecomptePPrinterProps {
  data:any;
    extra:any;
}
const DecomptePPrinter = forwardRef<HTMLDivElement, DecomptePPrinterProps>((props, ref) => {

  return (
      <div ref={ref} className={"print-only"} style={{width: "29.7cm", height: '21cm', margin: 0}}>
          <style>
              {`
            @media print {
              @page {
                size: landscape;
              }
            }
          `}
          </style>
          <div>

              <h4 style={{textAlign: "center"}}>Décompte provisoir des travaux du mois {props.extra.date}</h4>
              <hr/>
              <div className="row">
                  <div className="col-sm-7 col-lg-6 col-xl-6 col-xxl-5">
                      <label className="form-label" style={{width: "100%"}}>
                          <strong>Contrat N° :</strong> {props.extra.marche}
                      </label>
                      <label className="form-label" style={{width: "100%"}}>
                          <strong>Objet :</strong> {props.extra.objet}
                      </label>
                      <label className="form-label" style={{width: "100%"}}>
                          <strong>NT :</strong> {props.extra.nt}
                      </label>
                      <label className="form-label" style={{width: "100%"}}>
                          <strong>Site :</strong> {props.extra.site}
                      </label>

                  </div>
                  <div className="col">
                      <label className="form-label" style={{width: "100%"}}>
                          <strong>Client :</strong> {props.extra.client}
                      </label>
                  </div>
              </div>
              <hr/>
              <div className="row">
                  <div className="col">
                      <div className="table-responsive">
                          <table className="table table table-sm">
                              <thead>
                              <tr>
                                  <th style={{width: 100}}>Réf.Tache</th>
                                  <th style={{width: 60}}>UM</th>
                                  <th style={{width: 200}}>Designation</th>
                                  <th style={{width: 100}}>Qte préc</th>
                                  <th style={{width: 100}}>Qte mois</th>
                                  <th style={{width: 100}}>Qte cumulé</th>
                                  <th style={{width: 100}}>M préc</th>
                                  <th style={{width: 100}}>M mois</th>
                                  <th style={{width: 100}}>M cumulé</th>


                              </tr>
                              </thead>
                              <tbody>
                              {props.data.map((item: any, index: any) => (
                                  <tr key={index}>
                                      <td>
                                          <p className="text-break" style={{width: 100}}>
                                              {item.code_tache}
                                          </p>
                                      </td>
                                      <td>
                                          <p className="text-break" style={{width: 60}}>
                                              {item.unite}
                                          </p>
                                      </td>
                                      <td>
                                          <p className="text-break" style={{width: 200}}>
                                              {item.libelle}
                                          </p>
                                      </td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {item.qte_precedente}
                                      </p>

                                      </td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {item.qte}
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {item.qte_cumule}
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {Humanize(item.montant_precedent)}
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {Humanize(item.montant)}
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {Humanize(item.montant_cumule)}
                                      </p></td>
                                  </tr>

                              ))}
                              <tr>
                                  <td>
                                      <p className="text-break" style={{width: 100}}>
                                      </p>
                                  </td>
                                  <td>
                                      <p className="text-break" style={{width: 60}}>
                                      </p>
                                  </td>
                                  <td>
                                      <p className="text-break" style={{width: 200}}>
                                      </p>
                                  </td>
                                  <td><p className="text-break" style={{width: 100}}>
                                  </p>

                                  </td>
                                  <td><p className="text-break" style={{width: 100}}>
                                  </p></td>
                                  <td><p className="text-break" style={{width: 100}}>
                                      Total en HT
                                  </p></td>
                                  <td><p className="text-break" style={{width: 100}}>
                                      {Humanize(props.extra.mtp)}DA
                                  </p></td>
                                  <td><p className="text-break" style={{width: 100}}>
                                      {Humanize(props.extra.mt)}DA
                                  </p></td>
                                  <td><p className="text-break" style={{width: 100}}>
                                      {Humanize(props.extra.mtc)}DA
                                  </p></td>
                              </tr>
                              {
                                  props.extra.tva !== 0 &&
                                  <tr>
                                      <td>
                                          <p className="text-break" style={{width: 100}}>
                                          </p>
                                      </td>
                                      <td>
                                          <p className="text-break" style={{width: 60}}>
                                          </p>
                                      </td>
                                      <td>
                                          <p className="text-break" style={{width: 200}}>
                                          </p>
                                      </td>
                                      <td><p className="text-break" style={{width: 100}}>
                                      </p>

                                      </td>
                                      <td><p className="text-break" style={{width: 100}}>
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          Total en TTC ({props.extra.tva}%)
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {Humanize(props.extra.txmtp)}DA
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {Humanize(props.extra.txmt)}DA
                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {Humanize(props.extra.txmtc)}DA
                                      </p></td>
                                  </tr>

                              }
                              </tbody>
                          </table>

                      </div>
                  </div>
              </div>
              <div
                  className="row mt-2"
                  style={{border: "0px none var(--bs-secondary-bg)"}}
              >
                  <div className="col">
                      <div className="card" style={{borderWidth: 0, height: 200}}>
                          <div className="card-body" style={{borderWidth: 0, height: 70}}/>
                      </div>
                  </div>
                  <div className="col">
                      <div className="card" style={{borderWidth: 0, height: 200}}>
                          <div className="card-body" style={{borderWidth: 0, height: 70}}/>
                      </div>
                  </div>
                  <div className="col">
                      <div className="card" style={{borderWidth: 0, height: 200}}>
                          <div className="card-body" style={{borderWidth: 0, height: 70}}/>
                      </div>
                  </div>
              </div>
          </div>


      </div>
  )
});

export default DecomptePPrinter;

