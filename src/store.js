import { configureStore } from '@reduxjs/toolkit';
import  activitiesReducer  from './features/activities/activitiesSlice';
import addingActivityReducer from './features/create-activity/addingActivityslice';

export const store = configureStore({
    reducer: {
        activities: activitiesReducer,
        addingActivity: addingActivityReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});