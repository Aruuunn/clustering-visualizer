import React, { ReactElement } from 'react';
import Board from '../../components/Board';
import RenderVisualization from './components/RenderVisualization';
import NavBar from './components/NavBar';
import InfoModal from './components/InfoModal';

function KMEANS(): ReactElement {

    return (
        <div>
            <NavBar />

            <Board component={<RenderVisualization />} />
          
          <InfoModal/>
        </div>
    );
}

export default KMEANS;
