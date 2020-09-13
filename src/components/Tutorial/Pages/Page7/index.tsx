import React from 'react';
import { Typography, DialogTitle, CircularProgress, DialogContent, Grid } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import fab from '../../../../assets/fab.gif';
import fabMin from '../../../../assets/fab-progressive.jpg';

export const Page7 = () => {
    return [
        <DialogTitle key={0}>
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Floating Action Buttons
            </Typography>
        </DialogTitle>,

        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography variant="body1" style={{ width: '100%', fontWeight: 'normal' }}>
                    Floating Action Buttons contains special options such as Create Cluster Mode. You can drag them and
                    place wherever you want them to be!
                </Typography>
                {/* */}
                <ProgressiveImage src={fab} placeholder={fabMin}>
                    {(src: string, loading: boolean) => (
                        <div
                            style={{
                                width: '100%',
                                marginTop: '20px',
                                flexGrow: 1,

                                position: 'relative',
                            }}
                        >
                            <img
                                src={src}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    filter: loading ? 'blur(8px)' : 'none',
                                    opacity: loading ? 0.8 : 1,
                                    transition: 'all 1.5s ease',
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
            </div>
        </DialogContent>,
    ];
};

export default Page7;
