import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// * initialState
const initialState = {
  loading: false,
  account: null,
  accounts: [],
  success: false,
  error: null,
  isUpdated: false,
};

// TODO: Create Action Creator - createAsyncThunk

// ! action to create account/project
export const createAccountAction = createAsyncThunk(
  "account/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, initialBalance, accountType, notes } = payload;
    try {
      // TODO: get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // TODO: pass the token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // TODO: make the request
      const { data } = await axios.post(
        `${baseURL}/accounts`,
        {
          name,
          initialBalance,
          accountType,
          notes,
        },
        config
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! action to get single accountDetails
export const getSingleAccountAction = createAsyncThunk(
  "account/get-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // TODO: get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // TODO: pass the token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // TODO: make the request
      const { data } = await axios.get(`${baseURL}/accounts/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! action to update accountDetails
export const updateAccountAction = createAsyncThunk(
  "account/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // ? destructing payload
    const { name, initialBalance, accountType, notes, id } = payload;
    try {
      // TODO: get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // TODO: pass the token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // TODO: make the request to update an accountDetails
      const { data } = await axios.put(
        `${baseURL}/accounts/${id}`,
        { name, accountType, notes, initialBalance },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// * accountsSlice - reducer
const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  extraReducers: (builder) => {
    // TODO: handle create account lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(createAccountAction.pending, (state) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
      state.error = null;
    });

    // ? rejected
    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });

    // ---------------------------------------------

    // TODO: handle singleAccount lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(getSingleAccountAction.pending, (state) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
      state.error = null;
    });

    // ? rejected
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });

    // ---------------------------------------------

    // TODO: handle update accountDetails lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(updateAccountAction.pending, (state) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.account = action.payload;
      state.error = null;
    });

    // ? rejected
    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.isUpdated = false;
      state.account = null;
      state.error = action.payload;
    });
  },
});
