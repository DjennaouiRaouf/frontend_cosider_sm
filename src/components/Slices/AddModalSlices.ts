import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataModalState {
    showAddContratForm:boolean;
    showAddClientForm:boolean;
    showAddDQEForm:boolean;
    showAddAttachementForm:any;
    showAddNTForm:boolean;
    showAddFactureForm:boolean;
    showAddAvanceForm:boolean;
    showAddEncaissementForm:any;
    showAddSiteForm:boolean;
    showAddCautionForm:boolean;
}

const initialState: AddDataModalState = {
    showAddContratForm:false,
    showAddClientForm:false,
    showAddDQEForm:false,

    showAddCautionForm:false,
    showAddAttachementForm: {
        shown:false,
        default:{},
    },
    showAddNTForm:false,
    showAddFactureForm:false,
    showAddAvanceForm:false,
    showAddSiteForm:false,
    showAddEncaissementForm:{
        shown:false,
        facture:null,
    },

};

export const AddDataModal = createSlice({
    name: "Add",
    initialState,
    reducers: {
        showAddContrat: (state) => {

            state.showAddContratForm=true

        },
        hideAddContrat: (state) => {
            state.showAddContratForm=false
        },
        
           showAddClient: (state) => {

            state.showAddClientForm=true

        },
        hideAddClient: (state) => {
            state.showAddClientForm=false
        },
    
         showAddDQE: (state) => {

            state.showAddDQEForm=true

        },
        hideAddDQE: (state) => {
            state.showAddDQEForm=false
        },



         showAddAvance: (state) => {

            state.showAddAvanceForm=true

        },
        hideAddAvance: (state) => {
            state.showAddAvanceForm=false
        },


         showAddCaution: (state) => {

            state.showAddCautionForm=true

        },
        hideAddCaution: (state) => {
            state.showAddCautionForm=false
        },



        showAddAttachement: (state,action) => {

            state.showAddAttachementForm={
                shown:true,
                default:action.payload,
            }

        },
        hideAddAttachement: (state) => {
            state.showAddAttachementForm={
                shown:false,
                default:{}
            }
        },

        showAddNT: (state) => {

            state.showAddNTForm=true

        },
        hideAddNT: (state) => {
            state.showAddNTForm=false
        },


          showAddSite: (state) => {

            state.showAddSiteForm=true

        },
        hideAddSite: (state) => {
            state.showAddSiteForm=false
        },

        showAddFacture: (state) => {

            state.showAddFactureForm=true

        },
        hideAddFacture: (state) => {
            state.showAddFactureForm=false
        },
        showAddEncaissement: (state,action) => {

            state.showAddEncaissementForm.shown=true;
            state.showAddEncaissementForm.facture=action.payload;

        },
        hideAddEncaissement: (state) => {
            state.showAddEncaissementForm={}
        },


    }
});

export const { showAddContrat,hideAddContrat,
showAddClient,hideAddClient,
    showAddAvance,hideAddAvance,
showAddDQE,hideAddDQE,
showAddAttachement,hideAddAttachement,
showAddNT,hideAddNT,
showAddFacture,hideAddFacture,
    showAddEncaissement,hideAddEncaissement,
showAddSite,hideAddSite,
showAddCaution,hideAddCaution} = AddDataModal.actions;

export default AddDataModal.reducer;