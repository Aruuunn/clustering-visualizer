import React, { ReactElement } from 'react'
import Board from '../../components/Board';
import RenderVisualization from './components/RenderVisualization';
import NavBar from './components/NavBar';

function KMEANS(): ReactElement {
    return (
        <div>
            <NavBar/>
            <Board component={<RenderVisualization/>}/>
        </div>
    )
}

export default KMEANS;
