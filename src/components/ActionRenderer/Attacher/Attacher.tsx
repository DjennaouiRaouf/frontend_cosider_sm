import * as React from "react";
import {useDispatch} from "react-redux";
import {showAddAttachement} from "../../Slices/AddModalSlices";
import {useSearchParams} from "react-router-dom";
import {fetchFields, fetchState, showEdit} from "../../Slices/EditModalSlices";


type AttacherProps = {
 data:any;
};
const Attacher: React.FC<AttacherProps> = (props) => {
    const dispatch=useDispatch();
    const [searchParams] = useSearchParams();

    const attache = () => {
       const rowData:any =  props.data  ;

       if(rowData){
           dispatch(fetchFields(`/forms/attfields/?flag=f`))
           dispatch(fetchState(`/forms/attstate/?idp=${rowData['id_production']}`))
           dispatch(showEdit({id:rowData['id_production']}))
       }

    }

    return (<>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={attache}
          
        >
          <i className="fa fa-print" style={{fontSize: 16, marginRight: 9}}/>
          Attacher
      </button>


  </>);
};

export default Attacher;
