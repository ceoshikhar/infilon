import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const Landing: React.FC = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100w',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Link to="/company">
                <Button type="primary">Show Companies</Button>
            </Link>
        </div>
    );
};
