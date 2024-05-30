import { forwardRef } from 'react';
import {useSelector} from "react-redux";
import "./ProdSPrinter.css"
import {Humanize} from "../../Utils/Utils";
import numeral from "numeral";
interface AttPrinterProps {
  data:any;
    extra:any;
}
const ProdSPrinter = forwardRef<HTMLDivElement, AttPrinterProps>((props, ref) => {
    const getCurrentDate = ():string => {
          const today: Date = new Date();
          const year: number = today.getFullYear();
          let month: string | number = today.getMonth() + 1; // Months are zero-based
          let day: string | number = today.getDate();

          // Append leading zeros if month or day is less than 10
          if (month < 10) {
            month = '0' + month;
          }
          if (day < 10) {
            day = '0' + day;
          }

          return `${year}-${month}-${day}`;

    }

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
              <h4 style={{textAlign: "center"}}>Etat de la production stockée </h4>
              <hr/>
              <div className="row">
                  <div className="col-sm-7 col-lg-6 col-xl-6 col-xxl-5">
                      <label className="form-label" style={{width: "100%"}}>
                          <strong>NT :</strong> {props.extra.nt}
                      </label>
                      <label className="form-label" style={{width: "100%"}}>
                          <strong>Pole :</strong> {props.extra.pole}
                      </label>

                  </div>
                  <div className="col">
                      <h6 className="mb-0" style={{width: "100%", marginTop: 7}}>
            <span style={{backgroundColor: "rgb(255, 255, 255)"}}>
                <strong>Le :</strong>{getCurrentDate()}
            </span>
                      </h6>
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
                                  <th style={{width: 300}}>Libelle</th>
                                  <th style={{width: 100}}>Qte Produite</th>
                                  <th style={{width: 100}}>Qte Attachée</th>
                                  <th style={{width: 100}}>Ecart</th>

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
                                          <p className="text-break" style={{width: 300}}>
                                              {item.libelle}
                                          </p>
                                      </td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {numeral(item.qte_prod).format('0.0000')}{" "}{item.unite}
                                      </p>

                                      </td>
                                      <td><p className="text-break" style={{width: 100}}>
                                          {numeral(item.qte_att).format('0.0000')}{" "}{item.unite}

                                      </p></td>
                                      <td><p className="text-break" style={{width: 100}}>
                                              {numeral(item.ecart).format('0.0000')}{" "}{item.unite}

                                      </p></td>
                                  </tr>
                              ))}

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

export default ProdSPrinter;

