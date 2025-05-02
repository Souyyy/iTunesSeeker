import { createSlice } from '@reduxjs/toolkit';

// Creation du slice favoris
const favorisSlice = createSlice({
  name: 'favoris',
  initialState: [],
  // definbtion des reducers qui vont gerer les actions
  reducers: {
    toggleFavori: (state, action) => {
      const index = state.findIndex(item => item.trackId === action.payload.trackId);
      // Si l'element existe pas dans le tableau, on l'ajoute, sinon on le retire
      if (index === -1) {
        state.push(action.payload); 
      } else {
        state.splice(index, 1);
      }
    },
  },
});

export const { toggleFavori } = favorisSlice.actions;
export default favorisSlice.reducer;