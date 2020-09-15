import React from 'react';
import { Typography, Grid, CircularProgress, DialogTitle, DialogContent } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import Image from '../../../../assets/del.gif';
import ImageMin from '../../../../assets/del-progressive.jpg';

export const Page8 = () => {
    return [
        <DialogTitle key={0}>
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Delete Mode
            </Typography>
        </DialogTitle>,

        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography variant="body1" style={{ width: '100%', fontWeight: 'normal' }}>
                    Delete Clusters with ease using <strong>Delete Cluster Mode</strong>.
                </Typography>
                {/* */}
                <ProgressiveImage src={Image} placeholder={ImageMin}>
                    {(src: string, loading: boolean) => (
                        <div
                            style={{
                                width: '100%',
                                marginTop: '20px',
                                position: 'relative',
                            }}
                        >
                            <img
                                src={src}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    opacity: loading ? 0.8 : 1,
                                    transition: 'all 1.5s ease',
                                    filter: loading ? 'blur(8px)' : 'none',
                                }}
                                alt="create cluster mode"
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

export default Page8;
