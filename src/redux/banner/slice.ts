import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusLoading } from "../globalTypes";
import { Banner, BannerSliceState } from "./types";

export const fetchBanner = createAsyncThunk(
    "banner/fetchBannerStatus",
    async (apiUrl: string, { rejectWithValue }) => {
        try {
            const res = await axios.get<Banner>(
                `https://api.anilibria.tv/v3/${apiUrl}`
            );
            return res.data as Banner;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState: BannerSliceState = {
    item: {
        id: 0,
        names: {
            ru: "",
        },
        description: "",
    },
    status: StatusLoading.LOADING,
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanner.pending, (state) => {
                state.status = StatusLoading.LOADING;
            })
            .addCase(fetchBanner.fulfilled, (state, action) => {
                state.item = action.payload;
                state.status = StatusLoading.SUCCESS;
            })
            .addCase(fetchBanner.rejected, (state) => {
                state.status = StatusLoading.ERROR;
                state.item = {
                    id: 0,
                    names: {
                        ru: "",
                    },
                    description: "",
                };
            });
    },
});

export default bannerSlice.reducer;
