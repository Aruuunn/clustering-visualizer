import React, { ReactElement, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

import Loading from './components/Loading';

const Home = lazy(() => import('./views/Home'));
const KMEANSView = lazy(() => import('./views/KMEANS'));

function App(): ReactElement {
    return (
        <div style={{ minHeight: '100vh', overflow: 'auto' }}>
            <ErrorBoundary>
                {' '}
                <Suspense fallback={<Loading />}>
                    {' '}
                    <Switch>
                        <Route path="/kmeans" component={KMEANSView} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}

export default App;
