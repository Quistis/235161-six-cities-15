import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Setting } from '../../const';

type ChangeSortingPayload = {
  sorting: string;
}

type SortingSliceType = {
  currentSortType: string;
}

const initialState: SortingSliceType = {
  currentSortType: Setting.defaultSorting,
};

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    changeSorting: (state ,action: PayloadAction<ChangeSortingPayload>) => {
      const {sorting} = action.payload;
      state.currentSortType = sorting;
    }
  },
});

export const sortingReducer = sortingSlice.reducer;
