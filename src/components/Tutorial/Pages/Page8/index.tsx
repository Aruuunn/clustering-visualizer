import React from 'react';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import Image from '../../../../assets/create-cluster-mode.gif';
import ImageMin from '../../../../assets/create-cluster-mode-progressive.jpg';

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
                Create Cluster Mode
            </Typography>
            <Typography variant="body1" style={{ marginTop: '50px', width: '100%', fontWeight: 'normal' }}>
                Create Clusters with ease using <strong>Create Cluster Mode</strong>.
            </Typography>
            {/* */}
            <ProgressiveImage src={Image} placeholder={ImageMin}>
                {(src: string, loading: boolean) => (
                    <div
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            position: 'relative',
                        }}
                    >
                        <img
                            src={src}
                            style={{
                                width: '100%',
                                height: 'auto',
                                opacity: loading ? 0.8 : 1,
                                transition: 'all 2s ease',
                                filter: loading ? 'blur(8px)' : 'none',
                            }}
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

export default Page8;
