import { createSlice } from '@reduxjs/toolkit';

// Creation du slice notaitons
const notationsSlice = createSlice({
  name: 'notations',
  initialState: [],
    // definition des reducers qui vont gerer les actions de notaiton
  reducers: {
    noterMusique: (state, action) => {
      const { trackId, note, item } = action.payload;
      const index = state.findIndex(entree => entree.trackId === trackId);
        // Si l'element existe pas dans le tableau, on l'ajoute, sinon on met a jour la note
      if (index === -1) {
        state.push({ ...item, note });
      } else {
        state[index].note = note;
      }
    },
  },
});

export const { noterMusique } = notationsSlice.actions;
export default notationsSlice.reducer;