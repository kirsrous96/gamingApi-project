import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    roomId: null,
    roomOwner: null
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
      state.roomOwner = action.payload.roomOwner;
    },
  },
});

export const { enterRoom } = chatSlice.actions;


export const selectRoomId = (state) => state.chat.roomId;
export const selectroomOwner = (state) => state.chat.roomOwner;

export default chatSlice.reducer;