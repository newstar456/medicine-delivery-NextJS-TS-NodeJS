import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Medicine {
  id: number;
  name: string;
  price: number;
  drugStoreId: number;
  drugStore?: { id: number; name: string };
}

interface MedicinesState {
  medicines: Medicine[];
  loading: boolean;
  error: string | null;
}

const initialState: MedicinesState = {
  medicines: [],
  loading: false,
  error: null,
};

export const fetchMedicines = createAsyncThunk<Medicine[]>(
  "medicines/fetchMedicines",
  async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/medicines`);
    return res.data;
  }
);

const medicinesSlice = createSlice({
  name: "medicines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicines.fulfilled, (state, action: PayloadAction<Medicine[]>) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch medicines";
      });
  },
});

export default medicinesSlice.reducer;