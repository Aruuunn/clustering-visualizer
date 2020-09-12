import React from 'react';
import { Typography, Grid } from '@material-ui/core';

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
                Parameters
            </Typography>
            <Typography variant="body1" style={{ marginTop: '50px', width: '100%', fontWeight: 'normal' }}>
                Each Algorithm has it&apos;s own parameters and modes. You will find information about the parameters
                and modes for the corresponding Algorithms after selecting the algorithm. After tweaking the parameters
                as per your will, you can press &quot;START&quot;!
            </Typography>
        </Grid>
    );
};

export default Page2;
