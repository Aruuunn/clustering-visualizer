import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import createDataPoints from '../../../../assets/create-data-points-min.gif';

export const Page2 = () => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ width: '100%', height: '100%', padding: '10px' }}
        >
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Get Started
            </Typography>
            <Typography variant="h6" style={{ marginTop: '50px', width: '100%', fontWeight: 'normal' }}>
                Start by clicking the blank space for creating data points!
            </Typography>
            <img
                src={createDataPoints}
                style={{ width: '100%', height: 'auto', marginTop: '20px' }}
                alt="create data points"
            />
        </Grid>
    );
};

export default Page2;
