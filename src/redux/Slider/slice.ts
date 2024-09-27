import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CardSliceState, SliderName, Card } from "./types";
import { StatusLoading } from "../globalTypes";

export const fetchAnimeCards = createAsyncThunk(
    "slider/fetchCardStatus",
    async ({
        apiUrl,
        sliderName,
    }: {
        apiUrl: string;
        sliderName: SliderName;
    }) => {
        const res = await axios.get<{ list: Card[] }>(
            `https://api.anilibria.tv/v3/${apiUrl}`
        );
        return { data: res.data.list as Card[], sliderName };
    }
);

const initialState: CardSliceState = {
    newAnimeCards: [],
    newSeriesCards: [],
    popularAnimeCards: [],
    bestRatingCards: [],
    moviesCards: [],
    status: {
        newAnimeCards: StatusLoading.LOADING,
        newSeriesCards: StatusLoading.LOADING,
        popularAnimeCards: StatusLoading.LOADING,
        bestRatingCards: StatusLoading.LOADING,
        moviesCards: StatusLoading.LOADING,
    },
};

const sliderSlice = createSlice({
    name: "slider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimeCards.pending, (state, action) => {
                const sliderName = action.meta.arg.sliderName;
                state.status[sliderName] = StatusLoading.LOADING;
            })
            .addCase(fetchAnimeCards.fulfilled, (state, action) => {
                const { data, sliderName } = action.payload;
                state[sliderName] = data;
                state.status[sliderName] = StatusLoading.SUCCESS;
            })
            .addCase(fetchAnimeCards.rejected, (state, action) => {
                const sliderName = action.meta.arg.sliderName;
                state.status[sliderName] = StatusLoading.ERROR;
            });
    },
});

export default sliderSlice.reducer;
