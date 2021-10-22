import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

import { Company } from '@/store/companySlice';

interface Props {
    dataSource: Company[];
}

export const CompanyTable: React.FC<Props> = ({ dataSource }: Props) => {
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');

    // https://ant.design/components/table/#components-table-demo-custom-filter-panel
    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    autoFocus
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : '',
        render: (text: string) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (
        selectedKeys: string[],
        confirm: () => void,
        dataIndex: string
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Business Name',
            dataIndex: 'business_name',
            key: 'business_name',
            ...getColumnSearchProps('business_name'),
        },
        {
            title: 'Buzzword',
            dataIndex: 'buzzword',
            key: 'buzzword',
            ...getColumnSearchProps('buzzword'),
        },
        {
            title: 'Catch Phrase',
            dataIndex: 'catch_phrase',
            key: 'catch_phrase',
            ...getColumnSearchProps('catch_phrase'),
        },
        {
            title: 'Address',
            dataIndex: 'full_address',
            key: 'full_address',
            ...getColumnSearchProps('full_address'),
        },
        {
            title: 'Industry',
            dataIndex: 'industry',
            key: 'industry',
            ...getColumnSearchProps('industry'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Company) => (
                <Space size="middle">
                    <Link to={`/company/${record.id}`}>Edit</Link>
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
        />
    );
};
