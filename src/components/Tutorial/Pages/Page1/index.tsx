import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import Logo from '../../../../assets/logo.svg';

export const Page1 = () => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ width: '100%', height: '100%', padding: '10px' }}
        >
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Welcome to Clustering Algorithm Visualizer!
            </Typography>
            <Typography variant="body1" style={{ marginTop: '50px', fontWeight: 'normal' }}>
                This short tutorial will walk you through all the core features of this application.
            </Typography>
            <img
                src={Logo}
                alt="logo"
                style={{ maxWidth: '250px', width: '100%', height: 'auto', display: 'inline-block', margin: 'auto' }}
            />
        </Grid>
    );
};

export default Page1;
