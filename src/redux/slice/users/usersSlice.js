import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// * initialState
const initialState = {
  loading: false,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    error: null,
  },
  error: null,
};

// TODO: Create Action Creator - createAsyncThunk

// ! register
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (
    { fullName, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // ? header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // ? request to an endPoint
      const response = await axios.post(
        `${baseURL}/users/register`,
        {
          // ! fullName,
          fullname: fullName,
          email,
          password,
        },
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ! loginUserAction
export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // settingUp header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${baseURL}/users/login`,
        { email, password },
        config
      );

      // TODO: save user into localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ! logoutUserAction
export const logoutUserAction = createAsyncThunk("user/logout", async () => {
  // * remove user from localStorage
  localStorage.removeItem("userInfo");
  return null;
});

// * usersSlice - reducer
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // TODO: handle register lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
      state.userAuth.error = null;
    });

    // ? rejected
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = null;
      state.userAuth.error = action.payload;
    });

    // ---------------------------------------------

    // TODO: handle login lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
      state.userAuth.error = null;
    });

    // ? rejected
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = null;
      state.userAuth.error = action.payload;
    });

    // ----------------logout-----------------------

    // TODO: handle logout fulfilled state
    // ? fulfilled
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = null;
    });

    // ---------------------------------------------

    // TODO: handle profile lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(getProfileAction.pending, (state, action) => {
      state.loading = true;
      state.profile = null;
    });

    // ? fulfilled
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });

    // ? rejected
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.profile = null;
      state.error = action.payload;
    });
  },
});

// TODO: generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
