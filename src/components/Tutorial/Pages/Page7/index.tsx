import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import fab from '../../../../assets/fab.gif';

export const Page7 = () => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ width: '100%', height: '100%', padding: '10px' }}
        >
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Floating Action Buttons
            </Typography>
            <Typography variant="h6" style={{ marginTop: '50px', width: '100%' }}>
                Floating Action Buttons contains special options such as Statistics. You can drag them and place
                wherever you want them to be!
            </Typography>
            <div
                style={{
                    width: '100%',
                    marginTop: '10px',
                    flexGrow: 1,
                    backgroundRepeat: 'no-repeat',
                    background: `url(${fab})`,
                    backgroundSize: 'cover',
                }}
            ></div>
        </Grid>
    );
};

export default Page7;
