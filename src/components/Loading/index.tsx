import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

import './styles.css';

const Loading = (): ReactElement => {
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.8)',
            }}
        >
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </Grid>
    );
};

export default Loading;
