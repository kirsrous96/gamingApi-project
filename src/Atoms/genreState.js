import {atom} from 'recoil';

export const genreState = atom({
    key: 'genreState',
    default: []
})


// addGenre: (state, action) => {
//     state.genres = [...state.genres, action.payload]
//   },
//   deleteGenre: (state, action) => {
//       state.genres = state.genres.filter(function(el) { return el.genres !== action.payload }); 
//     }
// }