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
