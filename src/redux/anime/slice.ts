import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anime, AnimeSliceState } from "./types";
import { StatusLoading } from "../globalTypes";

export const fetchAnime = createAsyncThunk(
    "anime/fetchAnimeStatus",
    async (apiUrl: string) => {
        const res = await axios.get<Anime[]>(
            `https://api.anilibria.tv/v3/${apiUrl}`
        );
        console.log(res.data);
        return res.data as Anime[];
    }
);

const initialState: AnimeSliceState = {
    items: [],
    status: StatusLoading.LOADING,
};

const animeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnime.pending, (state) => {
                state.status = StatusLoading.LOADING;
            })
            .addCase(fetchAnime.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = StatusLoading.SUCCESS;
            })
            .addCase(fetchAnime.rejected, (state) => {
                state.status = StatusLoading.ERROR;
                state.items = [];
            });
    },
});

export const { setItems } = animeSlice.actions;

export default animeSlice.reducer;
