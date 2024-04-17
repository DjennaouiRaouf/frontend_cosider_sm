import * as React from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import {useSearchParams} from "react-router-dom";


type RecupProps = {
 data:any;
 refresh:(params:any)=>void,
};
const Recup: React.FC<RecupProps> = (props) => {
    const [searchParams] = useSearchParams();
    const recup = async() => {
       const rowData:any =  props.data  ;
      rowData["est_recupere"]=true

      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/sm/recupcaution/`,rowData,{
        headers: {

          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',

        },
      })
          .then((response:any) => {

             const paramsArray = Array.from(searchParams.entries());
                const queryString = paramsArray.reduce((acc, [key, value], index) => {
                  if (index === 0) {
                    return `?${key}=${encodeURIComponent(value)}`;
                  } else {
                    return `${acc}&${key}=${encodeURIComponent(value)}`;
                  }
                }, '');

                props.refresh(queryString);
          })
          .catch((error:any) => {
            console.log(error)

          });



    }

    return (<>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={recup}
          
        >
          <i className="fa fa-print" style={{fontSize: 16, marginRight: 9}}/>
          Recuperer
      </button>


  </>);
};

export default Recup;
