import React from 'react';
import { Typography, Grid, DialogTitle, DialogContent } from '@material-ui/core';

import Logo from '../../../../assets/logo.svg';

export const Page1 = () => {
    return [
        <DialogTitle key={0}>
            <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                Welcome to Clustering Algorithm Visualizer!
            </Typography>
        </DialogTitle>,
        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography variant="body1">
                    This short tutorial will walk you through all the core features of this application.
                </Typography>

                <Grid container justify="center" alignItems="center">
                    <img
                        src={Logo}
                        alt="logo"
                        style={{
                            maxWidth: '250px',
                            width: '100%',
                            height: 'auto',
                            display: 'inline-block',
                            margin: 'auto',
                            transform: 'translate(0,50%)',
                        }}
                    />
                </Grid>
            </div>
        </DialogContent>,
    ];
};

export default Page1;
