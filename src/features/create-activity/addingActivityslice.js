import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const activitiesCollectionRef = collection(db, "activities");

export const addActivity = createAsyncThunk(
  "activities/addActivity",
  async (newActivity) => {
    await addDoc(activitiesCollectionRef, newActivity);
  }
);

const initialState = {
  error: null,
  message: null,
};

export const addingActivitySlice = createSlice({
  name: "addingActivity",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetMessage: (state) => {
        state.message = null;
      },
  },
  extraReducers(builder) {
    builder
      .addCase(addActivity.pending, (state) => {
        state.error = null;
        state.message = null;
      })
      .addCase(addActivity.fulfilled, (state) => {
        state.error = null;
        state.message = "Well done and thank you! Your idea will now be part of our ever-growing jar of wonders.";
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAddingActivityState = (state) => state.addingActivity;
export const { setError, resetMessage } = addingActivitySlice.actions;
export default addingActivitySlice.reducer;