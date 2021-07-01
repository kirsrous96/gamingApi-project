import {atom} from 'recoil';

export const chatState = atom({
    key: 'chatState',
    default: {
        roomId: null,
        roomOwner: null
    }
})




// enterRoom: (state, action) => {
//     state.roomId = action.payload.roomId;
//     state.roomOwner = action.payload.roomOwner;
//   }