import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Loader } from '@/features/loader';

const Landing = lazy(() => import('@/features/landing'));
const Company = lazy(() => import('@/features/company'));
const CompanyEdit = lazy(() => import('@/features/company-edit'));

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/company" exact component={Company} />
                    <Route path="/company/:id" component={CompanyEdit} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
