import { configureStore } from '@reduxjs/toolkit';
import favorisReducer from './favorisSlice';
import notationsReducer from './notationSlice';

// Confiuguration du store Redux avec les reducers favoris et notations
export const store = configureStore({
  reducer: {
    favoris: favorisReducer,
    notations: notationsReducer,
  },
});