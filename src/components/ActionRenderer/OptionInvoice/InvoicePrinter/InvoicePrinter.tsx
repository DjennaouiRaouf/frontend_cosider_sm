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
      <div ref={ref} className={"print-only"} style={{width: '21cm', height: '29.7cm', margin: 0}}>
          <style>
              {`
            @media print {
              @page {
                size:portrait;
              }
            }
          `}
          </style>
          <div style={{paddingLeft: '2cm', paddingRight: '2cm'}}>
              <label className="form-label mt-3 mb-3" style={{fontSize: '12px'}}>
                  Le: {props.data.date}
              </label>
              <div className={'w-100'}>
                  <h1 className="text-center"
                      style={{textAlign: "center", fontSize: '15px', textDecoration: "underline"}}>
                      Facture N°&nbsp;{props.data.numero_facture}
                  </h1>
              </div>


              <label className="form-label mt-3 mb-3 w-100" style={{fontSize: '12px'}}>
                  <strong>Situation de Travaux N°:</strong> {props.data.num_situation}
              </label>
              <hr/>
              <div className={'w-100'}>
                  <label className="form-label" style={{fontSize: '12px'}}>

                      <div className="input-group w-100  ">
                          <label className="form-label w-80 " style={{fontSize: '12px'}}><strong>Marché
                              :</strong></label>
                          <label className="form-label w-20"
                                 style={{
                                     fontSize: '12px',
                                     marginLeft: 10
                                 }}>{props.data.marche} &nbsp; du &nbsp; {extra.signature}
                          </label>


                      </div>

                      <div className="input-group w-100 ">
                          <label className="form-label w-80 " style={{fontSize: '12px'}}><strong>Objet
                              :</strong></label>
                          <label className="form-label w-10"
                                 style={{fontSize: '12px', marginLeft: 10}}>{extra.projet}
                          </label>
                          <label className="form-label w-10 "
                                 style={{fontSize: '12px', marginLeft: 10}}>d'un montant
                              de {Humanize(extra.montant_marche)} DA en HT
                          </label>


                      </div>


                      <span style={{textDecoration: "underline", fontSize: '12px'}}><strong>REF:</strong> </span>
                      &nbsp;
                      <div className="input-group w-100">
                          <label className="form-label " style={{fontSize: '12px'}}><strong>Pole
                              :</strong></label>
                          <label className="form-label "
                                 style={{fontSize: '12px', marginLeft: 10}}>{extra.pole}
                          </label>
                          <label className="form-label "
                                 style={{fontSize: '12px', marginLeft: 10}}><strong>NT :</strong>
                          </label>

                          <label className="form-label "
                                 style={{fontSize: '12px', marginLeft: 10}}>{extra.nt}
                          </label>

                          <label className="form-label "
                                 style={{fontSize: '12px', marginLeft: 10}}><strong>Client :</strong>
                          </label>

                          <label className="form-label "
                                 style={{fontSize: '12px', marginLeft: 10}}>{extra.client}
                          </label>

                      </div>

                  </label>

              </div>
              <hr/>
              <div className={'mt-3 mb-3 w-100'}>
                  <label className="form-label" style={{fontSize: '12px'}}>
                      Selon la situation des travaux du {props.data.du} au {props.data.au} : <br/><br/>

                      {props.data.montant_precedent !== 0 &&
                          <>

                              <div className="input-group w-100">
                                  <label className="form-label  w-90" style={{fontSize: '12px'}}>Montant cumulé des
                                      traveaux
                                      réalisés au {props.data.du} en
                                      (HT)
                                      :</label>
                                  <label className="form-label  w-10"
                                         style={{
                                             fontSize: '12px',
                                             marginLeft: 10
                                         }}><strong>{Humanize(props.data.montant_precedent)} DA</strong>
                                  </label>
                              </div>
                          </>
                      }

                      <div className="input-group w-100">
                          <label className="form-label  w-90" style={{fontSize: '12px'}}>Montant cumulé des traveaux
                              réalisés au {props.data.au} en
                              (HT)
                              :</label>
                          <label className="form-label  w-10"
                                 style={{
                                     fontSize: '12px',
                                     marginLeft: 10
                                 }}><strong>{Humanize(props.data.montant_cumule)} DA</strong>
                          </label>
                      </div>

                      <div className="input-group w-100">
                          <label className="form-label  w-90" style={{fontSize: '12px'}}>Montant cumulé des traveaux
                              réalisés du {props.data.du} au {props.data.au} en
                              (HT)
                              :</label>
                          <label className="form-label  w-10"
                                 style={{
                                     fontSize: '12px',
                                     marginLeft: 10
                                 }}><strong>{Humanize(props.data.montant)} DA</strong>
                          </label>
                      </div>
                      {extra.rg !== 0 &&
                          <>

                              <div className="input-group w-100">
                                  <label className="form-label  w-50" style={{fontSize: '12px'}}>Montant de la Retenue
                                      de Garantie
                                      ({extra.rg}%)
                                      :</label>
                                  <label className="form-label  w-40"
                                         style={{
                                             fontSize: '12px',
                                             marginLeft: 10
                                         }}><strong>{Humanize(props.data.montant_rg)} DA </strong>
                                  </label>
                              </div>
                          </>

                      }
                      {extra.rb !== 0 &&
                          <>
                              <div className="input-group w-100">
                                  <label className="form-label  w-50" style={{fontSize: '12px'}}>Montant du Rabais
                                      ({extra.rb}%)
                                      :</label>
                                  <label className="form-label  w-40"
                                         style={{
                                             fontSize: '12px',
                                             marginLeft: 10
                                         }}><strong>{Humanize(props.data.montant_rb)} DA </strong>
                                  </label>
                              </div>


                          </>
                      }
                      {
                          extra.tva !== 0 &&
                          <>
                              <div className="input-group w-100">
                                  <label className="form-label  w-50" style={{fontSize: '12px'}}>Montant de la TVA
                                      ({extra.tva}%)
                                      :</label>
                                  <label className="form-label  w-40"
                                         style={{
                                             fontSize: '12px',
                                             marginLeft: 10
                                         }}><strong>{Humanize((extra.tva / 100) * props.data.montant)} DA</strong>
                                  </label>
                              </div>

                          </>
                      }


                  </label>
              </div>

              {
                  props.data.avf !== 0 &&
                  <div className={'mt-3 mb-3 w-100'}>
                      <div className="input-group w-100">
                          <label className="form-label  w-50" style={{fontSize: '12px'}}>Avance Forfaitaire
                              :</label>
                          <label className="form-label  w-40"
                                 style={{
                                     fontSize: '12px',
                                     marginLeft: 10
                                 }}><strong>{Humanize(props.data.avf)} DA</strong> </label>
                      </div>
                  </div>

              }
              {
                  props.data.ave !== 0 &&
                  <div className={'mt-3 mb-3 w-100'}>
                      <div className="input-group w-100">
                          <label className="form-label  w-50" style={{fontSize: '12px'}}>Avance Exceptionnelle
                              :</label>
                          <label className="form-label  w-40"
                                 style={{
                                     fontSize: '12px',
                                     marginLeft: 10
                                 }}><strong>{Humanize(props.data.ave)} DA</strong> </label>
                      </div>


                  </div>

              }

              {props.data.ava !== 0 &&
                  <div className={'mt-3 mb-3 w-100'}>
                      <div className="input-group w-100">
                          <label className="form-label  w-50" style={{fontSize: '12px'}}>Avance sur Appros
                              :</label>
                          <label className="form-label  w-40"
                                 style={{
                                     fontSize: '12px',
                                     marginLeft: 10
                                 }}><strong>{Humanize(props.data.ava)} DA</strong> </label>
                      </div>

                  </div>
              }


              {extra.tva === 0 &&

                  <div className={'mt-3 mb-3 w-100'}>
                      <label className="form-label text-center" style={{fontSize: '12px', width: '100%'}}>
                          <strong>EXONEREE DES TAXES</strong>
                      </label>
                  </div>
              }


              <div className={'mt-3 mb-3 w-100'}>
                  <div className="input-group w-100">
                      <label className="form-label  w-50" style={{fontSize: '12px'}}>MONTANT DE LA FACTURE EN (HT)
                          :</label>
                      <label className="form-label  w-40"
                             style={{
                                 fontSize: '12px',
                                 marginLeft: 10
                             }}>{Humanize(props.data.montant_factureHT)} DA </label>
                  </div>
              </div>
              <div className={'mt-3 mb-3 w-100'}>
                  <div className="input-group w-100">
                      <label className="form-label  w-50" style={{fontSize: '12px'}}>MONTANT DE LA FACTURE EN
                          (TTC)
                          :</label>
                      <label className="form-label  w-40"
                             style={{
                                 fontSize: '12px',
                                 marginLeft: 10
                             }}><strong>{Humanize(props.data.montant_factureTTC)} DA </strong></label>
                  </div>
              </div>


              <div className={'mt-3 mb-3 w-100'}>
                  <div className="input-group w-100">
                      <label className="form-label  w-50" style={{fontSize: '12px'}}>Arretée la présente facture à la
                          somme de
                          :</label>
                      <label className="form-label  w-50"
                             style={{fontSize: '12px'}}><strong>{props.data.somme}</strong> </label>
                  </div>
              </div>

              <div className={'mt-3 mb-3 w-100'}>

                  <div className="card" style={{width: "100%", fontSize: 11}}>
                      <div
                          className="card-body text-capitalize fs-6"
                          style={{width: 449, marginRight: "-25px", height: 35}}
                      >
                          <h6
                              className="card-title"
                              style={{textDecoration: "underline", fontSize: 12}}
                          >
                              Pour Mémoire
                          </h6>
                          <h6
                              className="card-title"
                              style={{fontSize: 12}}
                          >
                              Remboursement cumulé des avances jusqu'à présent
                          </h6>
                      </div>
                      <div className="card-body" style={{height: 129}}>
                          <div>
                              <table>
                                  <tbody>
                                  <tr>
                                  <td style={{width: "374.7px"}}>
                                          <p>Avance Forfaitaire</p>
                                      </td>
                                      <td>{Humanize(props.data.caf)+' DA'}</td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <p>Avance sur Approvisionnement</p>
                                      </td>
                                      <td>{Humanize(props.data.caa)+' DA'}</td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <p>Avance Exceptionnelle</p>
                                      </td>
                                      <td>{Humanize(props.data.cae)+' DA'}</td>
                                  </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>


              </div>

          </div>
      </div>
  )
});

export default InvoicePrinter;

