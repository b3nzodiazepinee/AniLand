import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusLoading, Banner, BannerSliceState } from "../types";

export const fetchBanner = createAsyncThunk(
    "banner/fetchBannerStatus",
    async (apiUrl: string, { rejectWithValue }) => {
        try {
            const res = await axios.get<Banner>(
                `https://api.anilibria.tv/v3/${apiUrl}`
            );
            console.log("API response:", res.data);
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
            en: "", 
            alternative: null,
        },
        description: "",
    },
    status: StatusLoading.LOADING,
};

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        // setItems(state, action) {
        //     state.item = action.payload;
        // },
    },
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
                        ru: "",            // Значение по умолчанию
                        en: "",            // Значение по умолчанию
                        alternative: null, // Значение по умолчанию
                    },
                    description: "",
                };
            });
    },
});

// export const { setItems } = bannerSlice.actions;

export default bannerSlice.reducer;
