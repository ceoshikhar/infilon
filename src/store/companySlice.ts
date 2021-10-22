import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import jsonData from '../data/data.json';

import { RootState } from '.';

export interface Company {
    id: number;
    key: number;
    uid: string;
    business_name: string;
    suffix: string;
    industry: string;
    catch_phrase: string;
    buzzword: string;
    bs_company_statement: string;
    employee_identification_number: string;
    duns_number: string;
    logo: string;
    type: string;
    phone_number: string;
    full_address: string;
    latitude: number;
    longitude: number;
}

export interface CompanyState {
    companies: Company[];
}

const initialState: CompanyState = {
    companies: [],
};

export const fetchCompanies = createAsyncThunk(
    'fetchCompanies',
    async (): Promise<Company[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = jsonData;
                resolve((data as unknown) as Company[]);
            }, 1000);
        });
    }
);

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        updateCompanyById: (
            state,
            action: PayloadAction<{ id: number; updatedValues: Company }>
        ) => {
            const afterUpdating = state.companies.map((company) => {
                if (company.id === action.payload.id) {
                    return {
                        ...company,
                        ...action.payload.updatedValues,
                    };
                }

                return { ...company };
            });

            state.companies = afterUpdating;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
            state.companies = action.payload;
        });
    },
});

export const { updateCompanyById } = companySlice.actions;

export const selectCompanies = (state: RootState) => state.company.companies;

export const companySliceReducer = companySlice.reducer;
