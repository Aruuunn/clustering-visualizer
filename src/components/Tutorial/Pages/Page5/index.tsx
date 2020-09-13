import React from 'react';
import { Typography, Grid, CircularProgress, DialogTitle, DialogContent } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import selectAlgorithm from '../../../../assets/select-algo.gif';
import selectAlgorithmMin from '../../../../assets/select-algo-progressive.jpg';

export const Page2 = () => {
    return [
        <DialogTitle key={0}>
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Algorithm Selection
            </Typography>
        </DialogTitle>,

        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography variant="body1" style={{ width: '100%', fontWeight: 'normal' }}>
                    Select the Algorithm you want to visualize!
                </Typography>

                <ProgressiveImage src={selectAlgorithm} placeholder={selectAlgorithmMin}>
                    {(src: string, loading: boolean) => (
                        <div style={{ position: 'relative', width: '100%', height: 'auto', marginTop: '20px' }}>
                            {' '}
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
                                alt="select algorithm"
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
