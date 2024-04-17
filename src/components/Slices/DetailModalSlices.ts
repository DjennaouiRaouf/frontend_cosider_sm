import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface Obj {
    [key: string]: any;
}
export interface DetailDataModaldata {
    showDetailInvoiceForm:any;

}

const initialState: DetailDataModaldata = {
    showDetailInvoiceForm:{
        id:'',
        shown:false,
        data:[],
        fields:[],
        loadingFields: 'idle',
        loadingData: 'idle',
        errorFields: null,
        errordata: null,
    },
};



export const fetchData:any = createAsyncThunk('data', async (params:  any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params}`);
        return response.data;
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



export const DetailDataModal = createSlice({
    name: "Detail",
    initialState,
    reducers: {

         showDetailInvoice: (data,action: PayloadAction<{id:string}>) => {
             data.showDetailInvoiceForm.id=action.payload.id
             data.showDetailInvoiceForm.shown=true

        },
        hideDetailInvoice: (data) => {
            data.showDetailInvoiceForm={
                 id:'',
                shown:false,
                data:[],
                fields:[],
                loadingFields: 'idle',
                loadingData: 'idle',
                errorFields: null,
                errordata: null,
            }
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (data) => {
                data.showDetailInvoiceForm.loadingData = 'pending';
            })

            .addCase(fetchFields.pending, (data) => {
                data.showDetailInvoiceForm.loadingFields = 'pending';
            })

            .addCase(fetchData.fulfilled, (data, action) => {
                data.showDetailInvoiceForm.loadingData = 'fulfilled';
                data.showDetailInvoiceForm.data = action.payload;

            })
            .addCase(fetchFields.fulfilled, (data, action) => {
                data.showDetailInvoiceForm.loadingFields = 'fulfilled';
                data.showDetailInvoiceForm.fields = action.payload;

            })
            .addCase(fetchData.rejected, (data, action) => {
                data.showDetailInvoiceForm.loadingData = 'rejected';
                data.showDetailInvoiceForm.errordata = action.error.message || 'An error occurred';
            })
            .addCase(fetchFields.rejected, (data, action) => {
                data.showDetailInvoiceForm.loadingFields = 'rejected';
                data.showDetailInvoiceForm.errorFields = action.error.message || 'An error occurred';
            });

    },
});

export const {showDetailInvoice,hideDetailInvoice} = DetailDataModal.actions;

export default DetailDataModal.reducer;