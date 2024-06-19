import * as React from "react";
import {useDispatch} from "react-redux";
import {fetchFields, fetchState, showEdit} from "../../Slices/EditModalSlices";
import {useSearchParams} from "react-router-dom";


type EditContratProps = {
    data:any;
    refresh:(params:any)=>void,
};
const ContratAvenantOption: React.FC<EditContratProps> = (props) => {
    const dispatch=useDispatch();
    const [searchParams] = useSearchParams();

    const EditContrat = () => {
       const rowData:any =  props.data  ;
       console.log('ok')
       if(rowData){

           dispatch(fetchFields(`/forms/mavfields/?flag=f`))
           dispatch(fetchState(`/forms/avenantstate/?id=${rowData['id']}&av=${rowData['num_avenant']}`))
             dispatch(showEdit({id:{
               id:rowData['id'], num_avenant:rowData['num_avenant']

               }}))

       }

    }




    return (<>
        <button
            className="btn btn-primary btn-sm"
            type="button"
            style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
            onClick={EditContrat}
            data-bs-toggle="tooltip" data-bs-placement="top" title="Ajouter un Avenant"

        >
            <i className="fas fa-plus" style={{fontSize: 16}}/>

        </button>



    </>);
};

export default ContratAvenantOption;
