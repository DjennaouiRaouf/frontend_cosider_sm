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
      <div ref={ref} className={"print-only"}style={{transform:"scale(0.9)",margin:0, width: "100%"}}>

              <div>

                      <h4 style={{textAlign: "center"}}>Attachement des travaux du {props.extra.month} </h4>
                      <hr/>
                      <div className="row">
                          <div className="col-sm-7 col-lg-6 col-xl-6 col-xxl-5">
                              <label className="form-label" style={{width: "100%"}}>
                                  <strong>Contrat N° :</strong> {props.extra.marche}
                              </label>
                              <label className="form-label" style={{width: "100%"}}>
                                  <strong>Objet :</strong> {''}
                              </label>
                              <label className="form-label" style={{width: "100%"}}>
                                  <strong>NT :</strong> {props.extra.nt}
                              </label>
                              <label className="form-label" style={{width: "100%"}}>
                                  <strong>Site :</strong> {props.extra.site}
                              </label>

                          </div>
                          <div className="col">
                              <h6 className="mb-0" style={{width: "100%", marginTop: 7}}>
            <span style={{backgroundColor: "rgb(255, 255, 255)"}}>
              Date Facture : 14/04/2024
            </span>
                              </h6>
                              <label className="form-label" style={{width: "100%"}}>
                                  Client : 2222
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
                                                      {item.libelle_tache + "sdfdsgjhgqkcjvbfjhqjlqjshgfzmieufhdskjqvnhjkbqkdfsjbvjdf"}
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
                                                  {item.montant_precedent}
                                              </p></td>
                                              <td><p className="text-break" style={{width: 100}}>
                                                  {item.montant}
                                              </p></td>
                                              <td><p className="text-break" style={{width: 100}}>
                                                  {item.montant_cumule}
                                              </p></td>
                                          </tr>
                                      ))}

                                      </tbody>
                                  </table>
                                  <div className="card">
                                      <div className="card-header">
                                          <h5 className="mb-0">Total</h5>
                                      </div>
                                      <div className="card-body">
                                          <label className="form-label" style={{width: "100%"}}>
                                              <strong>Qauntité : </strong>{props.extra.qt}
                                          </label>
                                          <label className="form-label" style={{width: "100%"}}>
                                              <strong>Montant en HT : </strong>{Humanize(props.extra.mt)}DA
                                          </label>
                                          {
                                              props.extra.rabais !== 0 && (

                                                  <label className="form-label" style={{width: "100%"}}>
                                                      <strong>Montant en HT avec rabais de ({props.extra.rabais}%)
                                                          : </strong>{Humanize(props.extra.mht)}DA
                                                  </label>)
                                          }
                                          {props.extra.tva?.map((item: any, index: any) => (
                                              <label key={index} className="form-label" style={{width: "100%"}}>
                                                  <strong>Montant en TTC avec({item.tva}%)
                                                      : </strong>{Humanize(item.total_amount)}DA
                                              </label>

                                          ))}
                                          <label className="form-label" style={{width: "100%"}}>
                                              <strong>Montant en TTC :</strong>{Humanize(props.extra.mttc)}DA
                                          </label>

                                      </div>
                                  </div>
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

