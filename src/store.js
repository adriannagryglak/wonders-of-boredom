import { configureStore } from '@reduxjs/toolkit';
import  activitiesReducer  from './features/activities/activitiesSlice';

export const store = configureStore({
    reducer: {
        activities: activitiesReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});