import * as React from "react";
import {useDispatch} from "react-redux";
import {fetchFields, fetchState, showEdit} from "../../Slices/EditModalSlices";
import axios from "axios";
import Cookies from "js-cookie";
import {displayAlertMessage, Variant} from "../../Slices/AlertMessageSlices";
import {useSearchParams} from "react-router-dom";


type EditNTProps = {
    data:any;
    refresh:(params:any)=>void,
};
const NTOption: React.FC<EditNTProps> = (props) => {
    const dispatch=useDispatch();
    const [searchParams] = useSearchParams();

    const EditNT = () => {
       const rowData:any =  props.data  ;
       if(rowData){
           dispatch(fetchFields(`/forms/ntfields/?flag=f`))
           dispatch(fetchState(`/forms/ntfieldsstate/?nt=${rowData['nt']}&code_site=${rowData['site']}`))
           dispatch(showEdit({id:{
               nt:rowData['nt'],
               code_site:rowData['site']
               }}))

       }

    }






    return (<>
        <button
            className="btn btn-primary btn-sm"
            type="button"
            style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
            onClick={EditNT}
              data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier"

        >
            <i className="fas fa-edit" style={{fontSize: 16}}/>

        </button>



    </>);
};

export default NTOption;
