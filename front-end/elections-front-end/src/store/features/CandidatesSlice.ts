import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Candidate, Status } from "../../types";
import axios from "axios";

interface StudentStateType {
    candidates: Candidate[];
    status: Status;
    error: string | null;
  }
  
  const initialState: StudentStateType = {
    candidates: [],
    status: "idle",
    error: null,
  };

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const featchCandidates = createAsyncThunk(
  "candidates/featchCandidates",
  async (): Promise<Candidate[] | undefined> => {
    const response = await axios.get(`${BASE_URL}/api/candidates`);
    return response.data;
  }
);

export const candidatesSlice = createSlice({
    name: "Candidates",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(featchCandidates.pending, (state) => {
          state.status = "pending";
          state.error = null
      })
      .addCase(featchCandidates.fulfilled, (state, action) => {
          if (action.payload) state.candidates = action.payload;
          state.status = "fulfilled";
        })
        .addCase(featchCandidates.rejected, (state) => {
          state.error = "Canno't fetch candidates";
          state.status = "rejected";
        })
    },
  });


  export default candidatesSlice.reducer