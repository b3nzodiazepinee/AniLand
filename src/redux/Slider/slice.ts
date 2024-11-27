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
        page,
    }: {
        apiUrl: string;
        sliderName: SliderName;
        page: number;
    }) => {
        const res = await axios.get<{ list: Card[] }>(
            `https://api.anilibria.tv/v3/${apiUrl}&items_per_page=6&page=${page}`
        );
        console.log(res.data.list);
        return { data: res.data.list as Card[], sliderName, page };
    }
);

const initialState: CardSliceState = {
    newAnimeCards: [],
    newSeriesCards: [],
    popularAnimeCards: [],
    bestRatingCards: [],
    moviesCards: [],
    page: {
        newAnimeCards: 1,
        newSeriesCards: 1,
        popularAnimeCards: 1,
        bestRatingCards: 1,
        moviesCards: 1,
    },
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
                const { data, sliderName, page } = action.payload;
                if (page === 1) {
                    state[sliderName] = data;
                } else {
                    state[sliderName] = [...state[sliderName], ...data];
                }
                state.page[sliderName] = page;
                state.status[sliderName] = StatusLoading.SUCCESS;
            })
            .addCase(fetchAnimeCards.rejected, (state, action) => {
                const sliderName = action.meta.arg.sliderName;
                state.status[sliderName] = StatusLoading.ERROR;
            });
    },
});

export default sliderSlice.reducer;
