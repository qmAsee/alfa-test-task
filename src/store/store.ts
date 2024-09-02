import { configureStore, Store, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';
import countriesReducer from "./slices/countriesSlice";


const store:Store = configureStore({
    reducer: {
        countries: countriesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatchBase;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
export default store;