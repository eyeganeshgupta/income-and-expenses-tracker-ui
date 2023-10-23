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
