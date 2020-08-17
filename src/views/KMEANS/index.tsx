import React, { ReactElement, useState } from 'react';
import Board from '../../components/Board';
import RenderVisualization from './components/RenderVisualization';
import NavBar from './components/NavBar';
import barChartIcon from '../../assets/bar_chart-24px.svg';
import { Fab, useMediaQuery, useTheme, Grow, Paper } from '@material-ui/core';

function KMEANS(): ReactElement {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(true);

    return (
        <div>
            <NavBar />

            <Board component={<RenderVisualization />} />
            <Fab
                color="secondary"
                onClick={() => setOpen((s) => !s)}
                style={{ position: 'fixed', bottom: sm ? 20 : 20, right: 20 }}
            >
                <img src={barChartIcon} />
            </Fab>
            <Grow in={open}>
                <Paper
                    variant="outlined"
                    style={{ position: 'fixed', right: 20, top: '70px', minWidth: '300px', height: '70vh' }}
                ></Paper>
            </Grow>
        </div>
    );
}

export default KMEANS;
