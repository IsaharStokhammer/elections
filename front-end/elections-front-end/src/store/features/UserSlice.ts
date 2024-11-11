import { createAsyncThunk } from "@reduxjs/toolkit";
import { Candidate, Status, User } from "../../types";
import axios from "axios";

interface UserStateType {
  user: User | null;
  status: Status;
  error: string | null;
}

const initialState: UserStateType = {
  user: null,
  status: "idle",
  error: null,
};


