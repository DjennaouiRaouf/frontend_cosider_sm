import * as React from "react";
import {useLocation, useParams, useSearchParams} from "react-router-dom";

import Form from 'react-bootstrap/Form';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Plot from 'react-plotly.js';

import {useDispatch} from "react-redux";


type TaskStateProps = {
  //
};

const TaskState: React.FC<any> = () => {
  const [searchParams] = useSearchParams();
  const { cid } = useParams();
  const[x,setX]=useState<any[]>([]);
  const[y1,setY1]=useState<any[]>([]);
  const[y2,setY2]=useState<any[]>([]);

  const getDataSet = async() => {
const marche_id:string=encodeURIComponent(String(cid));
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/dqestate/?marche=${marche_id}`,{

      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {


          setX(response.data.X)
          setY1(response.data.Y1)
          setY2(response.data.Y2)




        })
        .catch((error:any) => {


        });


  }

    useEffect(() => {
        getDataSet()
    },[]);




  return (
      <>
            <div className="card">
              <div className="card-body">
                <div className="plot-container">
                  <Plot
                      data={[
                        {
                            x: x,
                            y: y1,
                            name: 'quantités réalisées jusqu\'à présent',
                            type: 'bar'

                        },
                          {
                              x: x,
                              y: y2,
                              name: 'quantités contractuelles',
                              type: 'bar'

                          },





                      ]}



                      layout={{title: `Statistiques des Taches  du Marché ${cid}`,
                          barmode: 'stack',
                          xaxis: {title: 'Code de la Tache'},
                          yaxis: {title: 'Quantité'},




                  }}
                      style={{width:"100%"}}
                  />
                </div>


              </div>
            </div>

      </>
  );
};



export default TaskState;