import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, User } from "../../types";
import axios from "axios";

interface UserStateType {
  user: User | null;
  status: Status;
  error: string | null;
  token: string | null;
}
const initialState: UserStateType = {
  user: null,
  status: "idle",
  error: null,
  token: localStorage.getItem("token") || null,
};
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: { userName: string; password: string }) => {
    const response = await axios.post(`${BASE_URL}/api/register`, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { userName: string; password: string }) => {
    const response = await axios.post(`${BASE_URL}/api/login`, credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        (state.status = "pending"), (state.error = null);
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<any>): void => {
          if (action.payload) {
            state.user = action.payload;
            state.error = null;
            state.status = "fulfilled";
          }
        }
      )
      .addCase(loginUser.rejected, (state) => {
        (state.error = " error"),
          (state.status = "rejected"),
          (state.user = null);
      })
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        (state.status = "pending"), (state.error = null);
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<any>): void => {
          if (action.payload) {
            state.user = action.payload;
            state.error = null;
            state.status = "fulfilled";
          }
        }
      )
      .addCase(registerUser.rejected, (state) => {
        (state.error = " error"),
          (state.status = "rejected"),
          (state.user = null);
      });
  },
});

export default userSlice.reducer;

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Candidate, Status, User } from "../../types";
// import axios from "axios";

// interface UserStateType {
//   user: User | null;
//   status: Status;
//   error: string | null;
// }

// const initialState: UserStateType = {
//   user: null,
//   status: "idle",
//   error: null,
// };

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const login = createAsyncThunk(
//     "logIn/logIn",
//     async (user): Promise<any> => {
//       const response = await axios.post(`${BASE_URL}/api/login`, user);
//       return response.data;
//     }
// )

// const registerUser = () => {}

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers:{},
//     extraReducers(builder){
//         builder
//         .addCase(login.pending, (state)=>{
//             state.user = null
//             state.status = 'pending',
//             state.error = null;
//         })
//         .addCase(login.fulfilled, (state, action:PayloadAction<any>):void => {
//             if (action.payload) {
//                 state.user = action.payload;
//                 state.error = null;
//                 state.status = 'fulfilled';
//             }
//         })
//         .addCase(login.rejected, (state)=>{
//             state.error = ' error',
//             state.status = 'rejected',
//             state.user = null
//         })
//         .addCase(registerUser.pending, (state)=>{
//             state.user = null
//             state.status = 'pending',
//             state.error = null;
//         })
//         .addCase(registerUser.fulfilled, (state, action:PayloadAction<any>):void => {
//             if (action.payload) {
//                 state.user = action.payload;
//                 state.error = null;
//                 state.status = 'fulfilled';
//             }
//         })
//         .addCase(registerUser.rejected, (state)=>{
//             state.error = ' error',
//             state.status = 'rejected',
//             state.user = null
//         })
//     }
// })
