import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}

export interface SearchDataModalState {
    showSearchContratForm:boolean;
    showSearchClientForm:boolean;
    showSearchDQEForm:boolean;
    showSearchCreanceForm:boolean;
    showSearchBLForm:boolean;
    showSearchNTForm:boolean;
}

const initialState: SearchDataModalState = {
    showSearchContratForm:false,
    showSearchClientForm:false,
    showSearchDQEForm:false,
    showSearchCreanceForm:false,
    showSearchBLForm:false,
    showSearchNTForm:false,

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

        showSearchBL: (state) => {
            state.showSearchBLForm=true
        },
        hideSearchBL: (state) => {
            state.showSearchBLForm=false
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
showSearchBL,hideSearchBL,
showSearchCreance,hideSearchCreance,
showSearchNT,hideSearchNT} = SearchDataModal.actions;

export default SearchDataModal.reducer;