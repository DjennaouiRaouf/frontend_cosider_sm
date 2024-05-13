import * as React from "react";
import {useDispatch} from "react-redux";
import {fetchFields, fetchState, showEdit} from "../../Slices/EditModalSlices";
import {useSearchParams} from "react-router-dom";


type EditContratProps = {
    data:any;
    refresh:(params:any)=>void,
};
const ContratOption: React.FC<EditContratProps> = (props) => {
    const dispatch=useDispatch();
    const [searchParams] = useSearchParams();

    const EditContrat = () => {
       const rowData:any =  props.data  ;

       if(rowData){
           dispatch(fetchFields(`/forms/marchefields/?flag=f`))
           dispatch(fetchState(`/forms/marchefieldsstate/?id=${rowData['id']}`))
             dispatch(showEdit({id:{
               id:rowData['id'],

               }}))

       }

    }




    return (<>
        <button
            className="btn btn-primary btn-sm"
            type="button"
            style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
            onClick={EditContrat}
            data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier"

        >
            <i className="fas fa-edit" style={{fontSize: 16}}/>

        </button>



    </>);
};

export default ContratOption;
