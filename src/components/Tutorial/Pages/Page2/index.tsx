import React from 'react';
import { Typography, Grid, CircularProgress, DialogTitle, DialogContent } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import clustersImage from '../../../../assets/clusters.png';
import ClusterProgressiveImage from '../../../../assets/clusters-min.jpg';

export const Page2 = () => {
    return [
        <DialogTitle key={0}>
            {' '}
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                What is Clustering?
            </Typography>
        </DialogTitle>,

        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography variant="body1" style={{ fontWeight: 'normal' }}>
                    Cluster analysis or clustering is the task of grouping a set of objects in such a way that objects
                    in the same group (called a cluster) are more similar (in some sense) to each other than to those in
                    other groups (clusters). Clustering Algorithms are widely used in lot of different domains.
                </Typography>

                <ProgressiveImage src={clustersImage} placeholder={ClusterProgressiveImage}>
                    {(src: string, loading: boolean) => (
                        <div style={{ position: 'relative', width: '100%', height: 'auto', marginTop: '10px' }}>
                            <img
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    opacity: loading ? 0.8 : 1,
                                    transition: 'all 1.5s ease',
                                    filter: loading ? 'blur(8px)' : 'none',
                                }}
                                src={src}
                                alt="clusters"
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
