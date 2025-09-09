import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDrugstores } from "@/store/api/drugstores";


export interface Medicine {
  id: number;
  name: string;
  price: number;
  drugStoreId: number;
}

export interface DrugStore {
  id: number;
  name: string;
  address: string;
  medicines: Medicine[];
}

interface DrugStoresState {
  items: DrugStore[];
  loading: boolean;
  error: string | null;
}

const initialState: DrugStoresState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDrugstores = createAsyncThunk<DrugStore[], void, { rejectValue: string }>('drugstores/fetchDrugstores',
  async (_, { rejectWithValue }) => {
    try{
      return await getDrugstores();
    } catch (err: any){
      if (err.response && err.response.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Failed to fetch drugstores");
    }

  }
);

const drugstoresSlice = createSlice({
  name: 'drugstores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrugstores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrugstores.fulfilled, (state, action: PayloadAction<DrugStore[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDrugstores.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch drugstores";
      });
  },
});

export default drugstoresSlice.reducer;
