import * as React from "react";
import {useDispatch} from "react-redux";
import {fetchFields, fetchState, showEdit} from "../../Slices/EditModalSlices";
import axios from "axios";
import Cookies from "js-cookie";
import {displayAlertMessage, Variant} from "../../Slices/AlertMessageSlices";
import {useSearchParams} from "react-router-dom";


type EditDQEProps = {
    data:any;
    refresh:(params:any)=>void,
};
const DQEOption: React.FC<EditDQEProps> = (props) => {
    const dispatch=useDispatch();
    const [searchParams] = useSearchParams();

    const EditDQE = () => {
       const rowData:any =  props.data  ;
        console.log(rowData)
       if(rowData){
           dispatch(fetchFields(`/forms/dqefields/?flag=f`))
           dispatch(fetchState(`/forms/dqefieldsstate/?nt=${rowData['nt']}&ct=${rowData['code_tache']}&cs=${rowData['pole']}`))
           dispatch(showEdit({id:{
                   nt:rowData['nt'],
                   code_site:rowData['pole'],
                   code_tache:rowData['code_tache']
               }}))
       }

    }


    return (<>
        <button
            className="btn btn-primary btn-sm"
            type="button"
            style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
            onClick={EditDQE}
   data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier"

        >
            <i className="fas fa-edit" style={{fontSize: 16}}/>
        </button>


    </>);
};

export default DQEOption;
