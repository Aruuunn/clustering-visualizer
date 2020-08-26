import React from 'react';
import { Typography, Grid, Link } from '@material-ui/core';

export const Page8 = () => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ width: '100%', height: '100%', padding: '10px' }}
        >
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Finish
            </Typography>
            <Typography variant="h6" style={{ marginTop: '50px', width: '100%' }}>
                You have been introduced to the core features of the application. Hope you enjoy using it!
            </Typography>
            <Typography variant="body1" style={{ marginTop: '30px', width: '100%' }}>
                You can find the source code of this application{' '}
                <Link color="secondary" href="https://github.com/ArunMurugan78/clustering-visualizer">
                    Here
                </Link>
            </Typography>
        </Grid>
    );
};

export default Page8;
