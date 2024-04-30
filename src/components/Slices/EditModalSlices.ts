import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface Obj {
    [key: string]: any;
}
export interface EditDataModalState {
    showEditForm:any;
}

const initialState: EditDataModalState = {
    showEditForm:{
        id:'',
        shown:false,
        state:[],
        fields:[],
        loadingFields: 'idle',
        loadingState: 'idle',
        errorFields: null,
        errorState: null,
    },
};



export const fetchState:any = createAsyncThunk('data', async (params:  any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params}`);
        return response.data.state;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});

export const fetchFields:any = createAsyncThunk('fields', async (params:  any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params}`);

        return response.data.fields;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});



export const EditDataModal = createSlice({
    name: "Edit",
    initialState,
    reducers: {

         showEdit: (state,action: PayloadAction<{id:string}>) => {
             state.showEditForm.id=action.payload.id
             state.showEditForm.shown=true

        },
        hideEdit: (state) => {
            state.showEditForm={
                 id:'',
                shown:false,
                state:[],
                fields:[],
                loadingFields: 'idle',
                loadingState: 'idle',
                errorFields: null,
                errorState: null,
            }
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchState.pending, (state) => {
                state.showEditForm.loadingState = 'pending';
            })

            .addCase(fetchFields.pending, (state) => {
                state.showEditForm.loadingFields = 'pending';
            })

            .addCase(fetchState.fulfilled, (state, action) => {
                state.showEditForm.loadingState = 'fulfilled';
                state.showEditForm.state = action.payload;

            })
            .addCase(fetchFields.fulfilled, (state, action) => {
                state.showEditForm.loadingFields = 'fulfilled';
                state.showEditForm.fields = action.payload;

            })
            .addCase(fetchState.rejected, (state, action) => {
                state.showEditForm.loadingState = 'rejected';
                state.showEditForm.errorState = action.error.message || 'An error occurred';
            })
            .addCase(fetchFields.rejected, (state, action) => {
                state.showEditForm.loadingFields = 'rejected';
                state.showEditForm.errorFields = action.error.message || 'An error occurred';
            });

    },
});

export const {showEdit,hideEdit} = EditDataModal.actions;

export default EditDataModal.reducer;