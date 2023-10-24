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
