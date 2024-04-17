import { configureStore } from "@reduxjs/toolkit";

import AddDataModalReducer from "../Slices/AddModalSlices";
import SearchDataModalReducer from "../Slices/SearchModalSlices";
import AlertMessageReducer from "../Slices/AlertMessageSlices";
import EditDataModalReducer from "../Slices/EditModalSlices";
import DetailDataModalReducer from "../Slices/DetailModalSlices";

const store = configureStore({
    reducer: {
        addDataModalReducer: AddDataModalReducer,
        searchDataModalReducer: SearchDataModalReducer,
        alertMessageReducer:AlertMessageReducer,
        editDataModalReducer:EditDataModalReducer,
        detailDataModalReducer:DetailDataModalReducer,

    },

});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;