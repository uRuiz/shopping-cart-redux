import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOompaLoompaDetailsIfNeeded,
  fetchOompaLoompasIfNeeded,
} from "./oompaLoompaThunks";

export const oompaLoompasSlice = createSlice({
  name: "oompaLoompa",
  initialState: {
    list: {
      isLoading: false,
      data: [],
      error: null,
      lastUpdated: null,
      currentPage: 1,
      hasMore: true,
    },
    details: {
      isLoading: false,
      data: [],
      error: null,
      lastUpdated: {},
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOompaLoompasIfNeeded.pending, (state, _action) => {
      state.list.isLoading = true;
      state.list.error = null;
    });
    builder.addCase(fetchOompaLoompasIfNeeded.fulfilled, (state, action) => {
      state.list.isLoading = false;
      state.list.data = [...state.list.data, ...action.payload.items];
      state.list.currentPage += 1;
      state.list.hasMore = action.payload.hasMore;
      state.list.lastUpdated = Date.now();
      state.list.error = null;
    });
    builder.addCase(fetchOompaLoompasIfNeeded.rejected, (state, action) => {
      state.list.isLoading = false;
      state.list.error = action.error.message;
    });
    builder.addCase(fetchOompaLoompaDetailsIfNeeded.pending, (state) => {
      state.details.isLoading = true;
      state.details.error = null;
    });
    builder.addCase(
      fetchOompaLoompaDetailsIfNeeded.fulfilled,
      (state, action) => {
        state.details.isLoading = false;
        state.details.data[action.meta.arg] = action.payload;
        state.details.lastUpdated[action.meta.arg] = Date.now();
        state.details.error = null;
      },
    );
    builder.addCase(
      fetchOompaLoompaDetailsIfNeeded.rejected,
      (state, action) => {
        state.details.isLoading = false;
        state.details.error = action.error.message;
      },
    );
  },
});

export default oompaLoompasSlice.reducer;
