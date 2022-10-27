import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { shuffleArray } from "../../utils";

const activitiesCollectionRef = collection(db, "activities");

export const getActivities = createAsyncThunk(
  "activities/getsActivities",
  async ({ category, tags }) => {
    let q;
    if (!category && tags.length === 0) {
      q = activitiesCollectionRef;
    } else if (!category && tags.length > 0) {
      q = query(activitiesCollectionRef, where("tags", "array-contains-any", tags)
      );
    } else if (category && tags.length === 0) {
      q = query(activitiesCollectionRef, where(category, "==", true));
    } else {
      q = query(activitiesCollectionRef, where(category, "==", true), where("tags", "array-contains-any", tags)
      );
    }

    try {
      const data = await getDocs(q);
      return data;
    } catch (e) {
      return e.message;
    }
  }
);

export const updateActivity = createAsyncThunk("activities/updateActivity",
  async({id, points})=>{
    const ActivityDoc = doc(db,"activities", id);
      await updateDoc(ActivityDoc, {points: points});
      return {id, points};
  }
);

const initialState = {
    activities: [],
    errors: null,
    loading: false,
    sorting: "top rated activities",
  };

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    sortActivities: (state, action)=>{
        let sortedActivities = action.payload.includes("top") ? 
        state.activities.sort((a, b) => a.points - b.points).reverse()
        : action.payload.includes("least") ? 
        state.activities.sort((a, b) => a.points - b.points)
        : shuffleArray(state.activities);
        state.activities = sortedActivities;
    },
    chooseSorting: (state, action) => {
        state.sorting = action.payload;
    },
    setErrors: (state, action) => {
        state.errors = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getActivities.pending, (state) => {
        state.loading = true;
        state.activities = [];
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;
        state.activities = action.payload.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.loading = false;
        state.activities = [];
        state.errors = action.error.message;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.activities = state.activities.map(activity => {
          return activity.id === action.payload.id ? {...activity, points: action.payload.points} : activity;
        });
      })
  },
});

export const selectActivitiesState = (state) => state.activities;
export const { sortActivities, chooseSorting, setErrors } = activitiesSlice.actions;
export default activitiesSlice.reducer;