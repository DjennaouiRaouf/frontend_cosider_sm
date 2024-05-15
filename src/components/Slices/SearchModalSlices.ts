import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}

export interface SearchDataModalState {
    showSearchContratForm:boolean;
    showSearchClientForm:boolean;
    showSearchDQEForm:boolean;
    showSearchCreanceForm:boolean;
    showSearchNTForm:boolean;
    showSearchFlashForm:boolean;
    showSearchInvoiceForm:boolean;
    showSearchAttForm:boolean;
    showSearchRevForm:boolean;

}

const initialState: SearchDataModalState = {
    showSearchContratForm:false,
    showSearchClientForm:false,
    showSearchDQEForm:false,
    showSearchCreanceForm:false,
    showSearchAttForm:false,
    showSearchNTForm:false,
    showSearchFlashForm:false,
    showSearchInvoiceForm:false,
    showSearchRevForm:false,
};

export const SearchDataModal = createSlice({
    name: "Search",
    initialState,
    reducers: {
        showSearchContrat: (state) => {

            state.showSearchContratForm=true

        },
        hideSearchContrat: (state) => {
            state.showSearchContratForm=false
        },


        showSearchRev: (state) => {

            state.showSearchRevForm=true

        },
        hideSearchRev: (state) => {
            state.showSearchRevForm=false
        },

         showSearchClient: (state) => {

            state.showSearchClientForm=true

        },
        hideSearchClient: (state) => {
            state.showSearchClientForm=false
        },
        showSearchDQE: (state) => {

            state.showSearchDQEForm=true

        },
        hideSearchDQE: (state) => {
            state.showSearchDQEForm=false
        },

     showSearchAtt: (state) => {

            state.showSearchAttForm=true

        },
        hideSearchAtt: (state) => {
            state.showSearchAttForm=false
        },



        showSearchInvoice: (state) => {
            state.showSearchInvoiceForm=true
        },
        hideSearchInvoice: (state) => {
            state.showSearchInvoiceForm=false
        },

        showSearchFlash: (state) => {

            state.showSearchFlashForm=true

        },
        hideSearchFlash: (state) => {
            state.showSearchFlashForm=false
        },


            showSearchCreance: (state) => {

            state.showSearchCreanceForm=true

        },
        hideSearchCreance: (state) => {
            state.showSearchCreanceForm=false
        },


            showSearchNT: (state) => {

            state.showSearchNTForm=true

        },
        hideSearchNT: (state) => {
            state.showSearchNTForm=false
        },


    }
});

export const { showSearchContrat,hideSearchContrat,
showSearchClient,hideSearchClient,
showSearchDQE,hideSearchDQE,
showSearchInvoice,hideSearchInvoice,
showSearchCreance,hideSearchCreance,
showSearchNT,hideSearchNT,
    showSearchAtt,hideSearchAtt,
showSearchFlash,hideSearchFlash,
showSearchRev,hideSearchRev} = SearchDataModal.actions;

export default SearchDataModal.reducer;