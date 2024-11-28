import { createSlice } from "@reduxjs/toolkit";

export const languageToggle = createSlice({
  name: 'language',
  initialState: { value: false, },
  reducers: { toggle: (state)=>{state.value = !state.value}, },
})

export const { toggle } = languageToggle.actions

export default languageToggle.reducer