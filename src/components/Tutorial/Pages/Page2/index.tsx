import React from 'react';
import { Typography, Grid, Link, useMediaQuery, useTheme } from '@material-ui/core';

import clustersImage from '../../../../assets/clusters.png';

export const Page2 = () => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ width: '100%', height: '100%', padding: '10px' }}
        >
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                What is Clustering?
            </Typography>
            <Typography variant="h6" style={{ marginTop: '50px' }}>
                Cluster analysis or clustering is the task of grouping a set of objects in such a way that objects in
                the same group (called a cluster) are more similar (in some sense) to each other than to those in other
                groups (clusters). Clustering Algorithms are widely used in lot of different domains.
            </Typography>
            {!xs ? (
                <div
                    style={{
                        width: '100%',
                        marginTop: '10px',
                        flexGrow: 1,
                        backgroundRepeat: 'no-repeat',
                        background: `url(${clustersImage})`,
                        backgroundSize: 'cover',
                    }}
                ></div>
            ) : null}
            {!xs ? (
                <Typography variant="caption" gutterBottom>
                    Clusters
                    <Link
                        target="_blank"
                        rel="no-referrer"
                        href="https://dev.to/nexttech/k-means-clustering-with-scikit-learn-14kk"
                        style={{ color: 'white', marginLeft: '10px' }}
                    >
                        @credits/Photo source
                    </Link>
                </Typography>
            ) : null}
        </Grid>
    );
};

export default Page2;
