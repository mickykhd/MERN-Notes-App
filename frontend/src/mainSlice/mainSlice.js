const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: "",
  userName: "",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;

      if (name === "token") {
        state.token = value.token;
        state.userName = value.user.name;
      }
      if (name === "loggedIn") {
        state.isLoggedIn = value;
      }
      if (name === "logout") {
        state.isLoggedIn = false;
        state.token = "";
        state.userName = "";
      }
      if (name === "preToken") {
        state.token = value.token;
        state.userName = value.name;
      }
      if (name === "loading") {
        state.isLoading = value;
      }
      if (name === "loginLoad") {
        state.isLoading = value;
      }
    },
  },
});

export const { handleChange } = mainSlice.actions;

export default mainSlice.reducer;
