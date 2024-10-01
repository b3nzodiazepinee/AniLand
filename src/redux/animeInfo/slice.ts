import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AnimeInfo, AnimeInfoState } from "./types";
import { StatusLoading } from "../globalTypes";

export const fetchAnimeInfo = createAsyncThunk(
    "animeInfo/fetchAnimeInfoStatus",
    async (apiUrl: string, { rejectWithValue }) => {
        try {
            const res = await axios.get<AnimeInfo>(
                `https://api.anilibria.tv/v3/${apiUrl}`
            );
            return res.data as AnimeInfo;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState: AnimeInfoState = {
    animeInfo: {
        id: 0,
        code: "",
        names: {
            ru: "",
        },
        type: {
            string: "",
            episodes: 0,
            length: 0,
        },
        genres: [],
        status: {
            string: "",
        },
        posters: {
            original: {
                url: "",
            },
        },
        description: "",
        season: {
            string: "",
            year: 0,
        },
        player: {
            episodes: {
                last: 0,
            },
        },
    },
    status: StatusLoading.LOADING,
};

const animeInfoSlice = createSlice({
    name: "animeInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimeInfo.pending, (state) => {
                state.status = StatusLoading.LOADING;
            })
            .addCase(fetchAnimeInfo.fulfilled, (state, action) => {
                state.animeInfo = action.payload;
                state.status = StatusLoading.SUCCESS;
            })
            .addCase(fetchAnimeInfo.rejected, (state) => {
                state.status = StatusLoading.ERROR;
                state.animeInfo = initialState.animeInfo;
            });
    },
});

export default animeInfoSlice.reducer;
