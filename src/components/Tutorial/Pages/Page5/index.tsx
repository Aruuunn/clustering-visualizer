import React from 'react';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import selectAlgorithm from '../../../../assets/select-algorithm-min.gif';
import selectAlgorithmMin from '../../../../assets/change-algorithm.jpg';

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
            <Typography variant="h6" style={{ marginTop: '50px', width: '100%', fontWeight: 'normal' }}>
                Select the Algorithm you want to visualize!
            </Typography>

            <ProgressiveImage src={selectAlgorithm} placeholder={selectAlgorithmMin}>
                {(src: string, loading: boolean) => (
                    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                        {' '}
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
