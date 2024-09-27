import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import animeSlice from "./anime/slice";
import bannerSlice from "./banner/slice";
import sliderSlice from "./Slider/slice";

export const store = configureStore({
    reducer: {
        animeSlice,
        bannerSlice,
        sliderSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
