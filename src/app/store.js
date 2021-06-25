import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import genreReducer from "../features/genreSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    genre: genreReducer,
  },
});