import React from 'react';
import { Typography, Grid, CircularProgress, DialogTitle, DialogContent } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import createDataPoints from '../../../../assets/points.gif';
import createDataPointsProgressive from '../../../../assets/points-progressive.jpg';

export const Page2 = () => {
    return [
        <DialogTitle key={0}>
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Get Started
            </Typography>
        </DialogTitle>,
        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography key={1} variant="body1" style={{ width: '100%', fontWeight: 'normal' }}>
                    Start by clicking the blank space to create data points!
                </Typography>
                <ProgressiveImage src={createDataPoints} placeholder={createDataPointsProgressive}>
                    {(src: string, loading: boolean) => (
                        <div style={{ position: 'relative', width: '100%', height: 'auto', marginTop: '10px' }}>
                            <img
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    marginTop: '20px',
                                    opacity: loading ? 0.5 : 1,
                                    transition: 'all 1.5s ease',
                                    filter: loading ? 'blur(8px)' : 'none',
                                }}
                                src={src}
                                alt="create points"
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
            </div>
        </DialogContent>,
    ];
};

export default Page2;
