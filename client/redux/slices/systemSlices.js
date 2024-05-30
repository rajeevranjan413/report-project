import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
// import baseUrl from "../../../utils/baseUrl";

//Redirect action

//Login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${"baseUrl"}/api/users/login`,
        userData,
        config
      );
      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Login
export const switchLanguageAction = createAsyncThunk(
  "user/language",
  async (newLanguage, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http call
      const { data } = await axios.post(
        "http://localhost:8000/api/user/language-switch",
         {language:newLanguage} ,
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem("userInfo", JSON.stringify(data?.data?.user));
      }
      return data?.data?.user;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//slices
const systemSlices = createSlice({
  name: "system",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    },
    logoutAction: (state) => {
      state.userAuth = null;
    },
    switchLanguageAction: (state, action) => {
      state.userAuth.language = action.payload;
    },
  },

  extraReducers: (builder) => {
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });


    // Language

    builder.addCase(switchLanguageAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(switchLanguageAction.fulfilled, (state, action) => {
        state.userAuth = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(switchLanguageAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      });

    // //logout
    // builder.addCase(logoutAction.pending, (state, action) => {
    //   state.loading = false;
    // });
    // builder.addCase(logoutAction.fulfilled, (state, action) => {
    //   state.userAuth = undefined;
    //   state.loading = false;
    //   state.appErr = undefined;
    //   state.serverErr = undefined;
    // });
    // builder.addCase(logoutAction.rejected, (state, action) => {
    //   state.appErr = action?.payload?.message;
    //   state.serverErr = action?.error?.message;
    //   state.loading = false;
    // });
  },
});
export const { setUserAuth, logoutAction } = systemSlices.actions;
export default systemSlices.reducer;
