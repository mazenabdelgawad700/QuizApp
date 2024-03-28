import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import QuizSliceReducer from "./QuizSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [QuizSliceReducer],
};

const persistedReducer = persistReducer(persistConfig, QuizSliceReducer);

export const store = configureStore({
  reducer: {
    quiz: persistedReducer,
  },
});

export const persistor = persistStore(store);
