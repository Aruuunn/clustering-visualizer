import React from 'react';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import createDataPoints from '../../../../assets/create-data-points-min.gif';
import createDataPointsProgressive from '../../../../assets/create-data-points-min.jpg';

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
            <ProgressiveImage src={createDataPoints} placeholder={createDataPointsProgressive}>
                {(src: string, loading: boolean) => (
                    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                        <img
                            style={{
                                width: '100%',
                                height: 'auto',
                                marginTop: '20px',
                                opacity: loading ? 0.5 : 1,
                                transition: 'opacity 1.5s ease',
                            }}
                            src={src}
                            alt="an image"
                        />
                        {loading ? (
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                            >
                                <CircularProgress style={{ color: 'white' }} />
                            </Grid>
                        ) : null}
                    </div>
                )}
            </ProgressiveImage>
        </Grid>
    );
};

export default Page2;
