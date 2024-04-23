import { forwardRef } from 'react';
import {useSelector} from "react-redux";
import "./AttPrinter.css"
import {Humanize} from "../../Utils/Utils";
interface AttPrinterProps {
  data:any;
    extra:any;
}
const AttPrinter = forwardRef<HTMLDivElement, AttPrinterProps>((props, ref) => {

  return (
      <div ref={ref} className={"print-only"} style={{transform:"scale(0.9)",margin:0, width: "100%"}} >

          <div>
              <h4 style={{textAlign: "center"}}>Attachement des travaux du {props.extra.month} </h4>
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
                      <h6 className="mb-0" style={{width: "100%", marginTop: 7}}>
            <span style={{backgroundColor: "rgb(255, 255, 255)"}}>
                <strong>Du Mois :</strong>{props.extra.date}
            </span>
                      </h6>
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
                                  <th style={{width: 300}}>Designation</th>
                                  <th style={{width: 100}}>Qte préc</th>
                                  <th style={{width: 100}}>Qte mois</th>
                                  <th style={{width: 100}}>Qte cumulé</th>


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
                                          <p className="text-break" style={{width: 300}}>
                                              {item.libelle_tache}
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
                                  </tr>
                              ))}

                              <tr
                                  style={{
                                      border: "1px solid var(--bs-table-striped-color)",
                                      borderTopStyle: "solid",
                                      borderTopColor: "var(--bs-table-striped-color)",
                                      borderBottomStyle: "solid"
                                  }}
                              />
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

export default AttPrinter;

