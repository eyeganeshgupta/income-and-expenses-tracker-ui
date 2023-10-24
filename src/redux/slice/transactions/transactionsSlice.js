import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// * initialState
const initialState = {
  loading: false,
  transactions: [],
  transaction: null,
  isAdded: false,
  isUpdated: false,
  error: null,
};

// TODO: Create Action Creator - createAsyncThunk

// ! action to create transaction
export const createTransactionAction = createAsyncThunk(
  "transaction/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // ? destructing payload
    const { name, transactionType, amount, category, notes } = payload;
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
        `${baseURL}/transactions`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
          account: payload.id,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
