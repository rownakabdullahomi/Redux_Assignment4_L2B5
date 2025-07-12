import { configureStore } from "@reduxjs/toolkit";
import { libraryApi } from "./redux/api/libraryApi";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(libraryApi.middleware);
  },
});
