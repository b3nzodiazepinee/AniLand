import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusLoading } from "../globalTypes";
import { fetchPlayerPage, PlayerSliceState } from "./types";

export const fetchPlayer = createAsyncThunk(
    "player/fetchPlayerStatus",
    async (apiUrl: string, { rejectWithValue }) => {
        try {
            const res = await axios.get<fetchPlayerPage>(
                `https://api.anilibria.tv/v3/${apiUrl}`
            );
            console.log("API Response:", res.data);
            return res.data as fetchPlayerPage;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState: PlayerSliceState = {
    names: {
        ru: "",
    },
    player: {
        host: "",
        list: {},
    },
    currentEpisode: "1",
    selectedQuality: "hd",
    status: StatusLoading.LOADING,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setQuality(state, action) {
            state.selectedQuality = action.payload;
        },
        setEpisode(state, action) {
            console.log(action.payload);
            state.currentEpisode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayer.pending, (state) => {
                state.status = StatusLoading.LOADING;
            })
            .addCase(fetchPlayer.fulfilled, (state, action) => {
                console.log("Received player data:", action.payload);

                state.names = action.payload.names;
                if (action.payload.player) {
                    state.player = action.payload.player;
                } else {
                    state.player = initialState.player;
                }
                state.status = StatusLoading.SUCCESS;
            })
            .addCase(fetchPlayer.rejected, (state) => {
                state.player = initialState.player;
                state.status = StatusLoading.ERROR;
            });
    },
});

export const { setQuality, setEpisode } = playerSlice.actions;

export default playerSlice.reducer;
