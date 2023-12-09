"use client";
import { configureStore } from "@reduxjs/toolkit";
import setupReducer from "./slice/setupSlice";
import modalsReducer from "./slice/modalsSlice";
import contactReducer from "./slice/contactsSlice";

export const store = configureStore({
  reducer: {
    setup: setupReducer,
    modals: modalsReducer,
    contacts: contactReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
