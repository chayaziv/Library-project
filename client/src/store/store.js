import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { userSlice } from "../redux/SubscriptionsSlice";
import { persistReducer, persistStore } from "redux-persist";
// import { MyPurchaseSlice } from "../redux/MyPurchasesSlice";
import { packageSlice } from "../redux/packageListSlice";


const rootReducer = combineReducers({
    
    user: userSlice.reducer,
    // purchases:MyPurchaseSlice.reducer,
    package:packageSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    white: 'user',
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});


export const persistor = persistStore(store);


//export const RootState = ReturnType;
export const  AppDispatch =  store.dispatch;

