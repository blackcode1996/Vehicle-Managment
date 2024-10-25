import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  selectedBrand: string | null;
  selectedModel: string | null;
  priceRange: [number, number]; 
  sortBy: 'asc' | 'desc' | null; 
}

const initialState: FilterState = {
  selectedBrand: null,
  selectedModel: null,
  priceRange: [0, 1000],
  sortBy: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedBrand(state, action: PayloadAction<string | null>) {
      state.selectedBrand = action.payload;
    },
    setSelectedModel(state, action: PayloadAction<string | null>) {
      state.selectedModel = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    setSortBy(state, action: PayloadAction<'asc' | 'desc' | null>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSelectedBrand, setSelectedModel, setPriceRange, setSortBy } = filterSlice.actions;

export const filterData = (state: any) => state.filter;

export default filterSlice.reducer;
