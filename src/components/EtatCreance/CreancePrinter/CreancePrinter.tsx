import { forwardRef } from 'react';
import {useSelector} from "react-redux";
import "./CreancePrinter.css"
import {Humanize} from "../../Utils/Utils";
interface InvoicePrinterProps {
  data:any
}
const CreancePrinter = forwardRef<HTMLDivElement, InvoicePrinterProps>((props, ref) => {

  return (
      <div ref={ref} className={"print-only"}  style={{width: "29.7cm", height: '21cm', margin: 0}}>
          <style>
              {`
            @media print {
              @page {
                size: landscape;
              }
            }
          `}
          </style>


          <div className="table-responsive">
              <table className="table" style={{fontSize: '12px'}}>
                  <thead>
                  <tr>
                      <th>Marché</th>
                      <th>Pole</th>
                      <th>NT</th>
                      <th>Client</th>
                      <th>M.G.Factures</th>
                      <th>M.G.Payé</th>
                      <th>M.G.Créance</th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.data.map((item:any, index:any) => (
                      <tr key={index}>
                          <td>
                              <p>{item.id}</p>
                          </td>
                          <td>
                              <p>{item.code_site}</p>
                          </td>
                          <td>
                              <p>{item.nt}</p>
                          </td>

                          <td>
                              <p>{item.client}</p>
                          </td>
                          <td>
                              <p>{Humanize(item.mgf)}</p>
                          </td>
                          <td><p>{Humanize(item.mgp)}</p></td>
                          <td>
                              <p>{Humanize(item.mgc)}</p>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </div>
  )
});

export default CreancePrinter;

