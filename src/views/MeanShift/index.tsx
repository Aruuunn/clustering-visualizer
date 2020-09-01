import React from 'react';

import { NavBar, RenderVisualization } from './components';
import { Board } from '../../components';

const MeanShift = () => {
    return (
        <div>
            <NavBar />
            <Board component={<RenderVisualization />} />
        </div>
    );
};

export default MeanShift;
