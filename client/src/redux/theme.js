import { createSlice } from "@reduxjs/toolkit";

let savedTheme;
try {
  savedTheme = JSON.parse(window?.localStorage.getItem("theme"));
} catch (e) {
  savedTheme = "dark"; // Default theme if parsing fails
}

const initialState = {
  theme: savedTheme ?? "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export default themeSlice.reducer;

export function SetTheme(value) {
  return (dispatch) => {
    dispatch(themeSlice.actions.setTheme(value));
  };
}