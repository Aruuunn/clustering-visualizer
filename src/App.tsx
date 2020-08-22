import React, { ReactElement, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import TabsComponent from './views/KMEANS/components/InfoModal/components/TabsComponent';

const Home = lazy(() => import('./views/Home'));

const KMEANSView = lazy(() => import('./views/KMEANS'));

function App(): ReactElement {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Suspense fallback={<div>loading...</div>}>
                {' '}
                <Switch>
                    <Route path="/kmeans" component={KMEANSView} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default App;
