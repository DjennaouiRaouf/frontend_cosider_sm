import * as React from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import {useSearchParams} from "react-router-dom";
import {displayAlertMessage, Variant} from "../../Slices/AlertMessageSlices";
import {fetchData, fetchFields, showDetailInvoice} from "../../Slices/DetailModalSlices";


type DelInvoiceProps = {
 data:any;
 refresh:(params:any)=>void,
};
const DetailInvoice: React.FC<DelInvoiceProps> = (props) => {
    const dispatch=useDispatch();
    const [searchParams] = useSearchParams();
    const Delete = async() => {
       const rowData:any =  props.data;

       if(rowData){
           const id:string=encodeURIComponent(rowData['id'])
            dispatch(fetchFields('/forms/detaillistform/'));
            dispatch(fetchData(`/api_gc/getdet/?facture=${id}`));
            dispatch(showDetailInvoice({id:rowData['id']}))
       }


    }

    return (<>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={Delete}
        >
          <i className="fas fa-list" style={{fontSize: 16, marginRight: 9}}/>
          Détail
      </button>


  </>);
};

export default DetailInvoice;
