import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../mainSlice/mainSlice";

const store = configureStore({
  reducer: {
    notesMain: mainSlice,
  },
});

export default store;
