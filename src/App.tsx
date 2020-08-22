import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { KMEANSView } from './views';
import Home from './views/Home';

function App(): ReactElement {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Switch>
                <Route path="/kmeans" component={KMEANSView} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
