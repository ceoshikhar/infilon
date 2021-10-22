import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
    Company,
    fetchCompanies,
    selectCompanies,
    updateCompanyById,
} from '@/store/companySlice';
import { Loader } from '@/features/loader';

export const CompanyEdit: React.FC = () => {
    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const companies = useAppSelector(selectCompanies);
    // To make it look like updating a company is an async process.
    const [loading, setLoading] = React.useState(false);

    if (!companies.length) {
        dispatch(fetchCompanies());
    }

    if (!companies.length) {
        return <Loader />;
    }

    const company = companies.filter(
        (company) => company.id === Number(params.id)
    )[0];

    const onFinish = (values: Company) => {
        setLoading(true);

        setTimeout(() => {
            dispatch(
                updateCompanyById({ id: company.id, updatedValues: values })
            );
            setLoading(false);
        }, 500);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed to update:', errorInfo);
    };

    return (
        <>
            <Form
                name="company-edit"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                initialValues={company}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Link to="/company">
                        <Button type="primary">Back to Companies</Button>
                    </Link>
                </Form.Item>
                <Form.Item label="Business Name" name="business_name">
                    <Input />
                </Form.Item>

                <Form.Item label="Buzzword" name="buzzword">
                    <Input />
                </Form.Item>

                <Form.Item label="Catch Phrase" name="catch_phrase">
                    <Input />
                </Form.Item>

                <Form.Item label="Address" name="full_address">
                    <Input />
                </Form.Item>

                <Form.Item label="Industry" name="industry">
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
