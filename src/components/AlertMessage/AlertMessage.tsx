import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {Alert, Toast, ToastContainer} from "react-bootstrap";
import {hideAlertMessage} from "../Slices/AlertMessageSlices";
import './AlertMessage.css';
import {useEffect} from "react";
type AlertMessageProps = {
  //
};

const AlertMessage: React.FC<any> = () => {
  const {showAlertMessage,variant,message} = useSelector((state: RootState) => state.alertMessageReducer);

  const dispatch=useDispatch();


  const onClose = () => {
    dispatch(hideAlertMessage());
  }
  return (
      <>
         <ToastContainer
                      className="p-3"
                      position={'top-end'}
                      style={{ zIndex: 9999}}
                    >
                    <Toast onClose={onClose}  show={showAlertMessage} delay={5000} autohide style={{backgroundColor:variant}}>

                      <Toast.Body>{message}</Toast.Body>
                    </Toast>
                    </ToastContainer>

      </>
  );
};

export default AlertMessage;
