import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store/Store";

interface Obj {
    [key: string]: any;
}

export enum Variant {
  DANGER = "#f8d7da",
  WARNING = "#fff3cd",
  SUCCESS = "#d1e7dd",
  NULL = "none",
}
export interface AlertMessageState {
    showAlertMessage:boolean;
    message:string,
    variant:Variant,

}

const initialState: AlertMessageState = {
    showAlertMessage:false,
    message:'',
    variant:Variant.NULL,
};

export const AlertMessage = createSlice({
    name: "Alert",
    initialState,
    reducers: {
        displayAlertMessage: (state,action: PayloadAction<{ variant: Variant; message: string }>) => {
            state.showAlertMessage=true;
            state.message=action.payload.message;
            state.variant=action.payload.variant;
        },

        hideAlertMessage:() => initialState,

    }
});

export const {displayAlertMessage,hideAlertMessage } = AlertMessage.actions;

export default AlertMessage.reducer;


