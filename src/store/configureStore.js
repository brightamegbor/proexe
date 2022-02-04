import { configureStore } from "@reduxjs/toolkit";
import reducer from "./users";
import api from "./middleware/api";

export default function store() {
  return configureStore({
      reducer: reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
  });
}