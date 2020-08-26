import React from 'react';
import { Typography, Grid, Link } from '@material-ui/core';

import selectAlgorithm from '../../../../assets/select-algorithm-min.gif';

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
                Algorithm Selection
            </Typography>
            <Typography variant="h6" style={{ marginTop: '50px', width: '100%' }}>
                Select the Algorithm you want to visualize!
            </Typography>
            <img
                src={selectAlgorithm}
                style={{ width: '100%', height: 'auto', marginTop: '20px' }}
                alt="create data points"
            />
        </Grid>
    );
};

export default Page2;
