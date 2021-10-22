import React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchCompanies, selectCompanies } from '@/store/companySlice';

import { Loader } from '@/features/loader';

import { CompanyTable } from './components/company-table';

export const Company: React.FC = () => {
    const dispatch = useAppDispatch();
    const companies = useAppSelector(selectCompanies);

    if (!companies.length) {
        dispatch(fetchCompanies());
    }

    if (!companies.length) {
        return <Loader />;
    }

    return (
        <>
            <CompanyTable dataSource={companies} />
        </>
    );
};
