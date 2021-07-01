import {atom} from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        user: null,
    }
})



// login: (state, action) => {
//     state.user = action.payload;
//   },
//   logout: (state) => {
//     state.user = null;
//   }