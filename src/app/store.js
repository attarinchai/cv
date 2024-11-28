import { configureStore } from '@reduxjs/toolkit';
import languageToggle from '../features/languages/languageToggle';

export default configureStore({
  reducer: {
    language: languageToggle,
  },
})