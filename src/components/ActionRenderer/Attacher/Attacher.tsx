import * as React from "react";
import {useDispatch} from "react-redux";
import {showAddAttachement} from "../../Slices/AddModalSlices";


type AttacherProps = {
 data:any;
};
const Attacher: React.FC<AttacherProps> = (props) => {
    const dispatch=useDispatch();

    const attache = () => {
       const rowData:any =  props.data  ;
        dispatch(showAddAttachement())
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
