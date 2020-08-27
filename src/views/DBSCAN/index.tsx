import React from 'react';

import { NavBar, RenderVisualization } from './components';
import { Board } from '../../components';

const DBSCAN = () => {
    return (
        <div>
            <NavBar />
            <Board component={<RenderVisualization />} />
        </div>
    );
};

export default DBSCAN;
