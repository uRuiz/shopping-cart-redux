import { CONFIG } from "../../config";
import {
  fetchOompaLoompaDetailsFromAPI,
  fetchOompaLoompasFromAPI,
} from "../../services/oompaLoompaService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOompaLoompasIfNeeded = createAsyncThunk(
  "oompaLoompas/fetchIfNeeded",
  async (_, { getState }) => {
    const { lastUpdated, data, currentPage, hasMore, isLoading } =
      getState().oompaLoompas.list;
    const now = Date.now();
    if (
      !lastUpdated ||
      now - lastUpdated > CONFIG.ONE_DAY_IN_MS ||
      hasMore ||
      !isLoading
    ) {
      const response = await fetchOompaLoompasFromAPI(currentPage);
      return response;
    }
    return data;
  },
);

export const fetchOompaLoompaDetailsIfNeeded = createAsyncThunk(
  "oompaLoompas/fetchDetails",
  async (id, { getState }) => {
    const lastUpdated = getState().oompaLoompas.details.lastUpdated[id];
    const now = Date.now();
    if (!lastUpdated || now - lastUpdated > CONFIG.ONE_DAY_IN_MS) {
      return await fetchOompaLoompaDetailsFromAPI(id);
    }

    return getState().oompaLoompas.details.data[id];
  },
);
