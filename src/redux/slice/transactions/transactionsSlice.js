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

// ! action to fetch single transaction details
export const getSingleTransactionAction = createAsyncThunk(
  "transaction/details",
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
      const { data } = await axios.get(`${baseURL}/transactions/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// * transactionsSlice - reducer
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    // TODO: handle create transaction lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(createTransactionAction.pending, (state) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(createTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
      state.isAdded = true;
      state.error = null;
    });

    // ? rejected
    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // ---------------------------------------------

    // TODO: handle update transaction lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(updateTransactionAction.pending, (state) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(updateTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
      state.isUpdated = true;
      state.error = null;
    });

    // ? rejected
    builder.addCase(updateTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = null;
      state.isUpdated = false;
      state.error = action.payload;
    });

    // ---------------------------------------------

    // TODO: handle getSingleTransaction lifecycle - pending, fulfilled, rejected
    // ? pending
    builder.addCase(getSingleTransactionAction.pending, (state) => {
      state.loading = true;
    });

    // ? fulfilled
    builder.addCase(getSingleTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
      state.error = null;
    });

    // ? rejected
    builder.addCase(getSingleTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = null;
      state.error = action.payload;
    });
  },
});

// * generate reducer
const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;
