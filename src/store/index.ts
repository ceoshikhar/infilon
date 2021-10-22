import { configureStore } from '@reduxjs/toolkit';

import { companySliceReducer } from './companySlice';

export const store = configureStore({
    reducer: {
        company: companySliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispath = typeof store.dispatch;
