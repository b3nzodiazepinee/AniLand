import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import bannerSlice from "./banner/slice";
import sliderSlice from "./slider/slice";
import animeInfoSlice from "./animeInfo/slice";
import playerSlice from "./player/slice"

export const store = configureStore({
    reducer: {
        bannerSlice,
        sliderSlice,
        animeInfoSlice,
        playerSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
