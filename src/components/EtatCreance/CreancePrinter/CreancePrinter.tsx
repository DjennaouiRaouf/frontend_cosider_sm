import { forwardRef } from 'react';
import {useSelector} from "react-redux";
import "./CreancePrinter.css"
import {Humanize} from "../../Utils/Utils";
interface InvoicePrinterProps {
  data:any
}
const CreancePrinter = forwardRef<HTMLDivElement, InvoicePrinterProps>((props, ref) => {

  return (
      <div ref={ref} className={"print-only"} style={{marginRight: '12px', marginLeft: '12px'}}>
          <div className="table-responsive">
              <table className="table" style={{fontSize: '12px'}}>
                  <thead>
                  <tr>
                      <th>Marché</th>
                      <th>NT</th>
                      <th>Site</th>
                      <th>Créance</th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.data.map((item:any, index:any) => (
                  <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.nt}</td>
                      <td>{item.code_site}</td>
                      <td>{item.creance}</td>
                  </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  )
});

export default CreancePrinter;

