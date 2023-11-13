// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './features/commentsSlice';
import loggerMiddleware from './middleware/loggerMiddleware'; // Import your middleware

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
