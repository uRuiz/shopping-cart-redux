import { configureStore } from "@reduxjs/toolkit";
import oompaLoompasReducer from "./oompaLoompa/slice";

export const store = configureStore({
  reducer: {
    oompaLoompas: oompaLoompasReducer,
  },
});
