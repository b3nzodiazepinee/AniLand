import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import animeSlice from "./slices/animeSlice";
import bannerSlice from "./slices/bannerSlice";


export const store = configureStore({
    reducer: {
        animeSlice,
        bannerSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();