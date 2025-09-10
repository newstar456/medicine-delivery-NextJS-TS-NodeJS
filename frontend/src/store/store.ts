import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import drugstoresReducer from './slices/drugstoresSlice';
import cartReducer from "./slices/cartSlice";
import medicinesReducer from "./slices/medicinesSlice";


const rootReducer = combineReducers({
  drugstores: drugstoresReducer,
  cart: cartReducer,
  medicines: medicinesReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['drugstores', 'medicines', 'cart'],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});



export const persistor = persistStore(store);

// Types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
