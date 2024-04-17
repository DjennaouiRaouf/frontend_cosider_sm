import * as React from "react";
import {useDispatch} from "react-redux";
import {fetchFields, fetchState, showEdit} from "../../Slices/EditModalSlices";


type EditCointratProps = {
 data:any;
};
const EditContrat: React.FC<EditCointratProps> = (props) => {
    const dispatch=useDispatch();

    const EditCointrat = () => {
       const rowData:any =  props.data  ;

       if(rowData){
           const id:string=encodeURIComponent(rowData['id']);
           //dispatch(fetchFields(`/forms/marchefieldsstate/?id=${id}`))
           //dispatch(fetchState(`/forms/marchefieldsstate/?id=${id}`))
           //dispatch(showEdit({id:rowData['id']}))
       }

    }

    return (<>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={EditCointrat}
          
        >
          <i className="fas fa-edit" style={{fontSize: 16, marginRight: 9}}/>
          Modifier
      </button>


  </>);
};

export default EditContrat;
