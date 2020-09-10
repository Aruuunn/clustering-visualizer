import React from 'react';
import { Typography, Grid } from '@material-ui/core';

export const Page3 = () => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ width: '100%', height: '100%', padding: '10px', overflow: 'auto' }}
        >
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Clustering Algorithms
            </Typography>
            <Typography variant="h6" style={{ marginTop: '50px' }}>
                There are a lot of clustering Algorithms. For Now <em>only</em> the algorithms given below are supported
                in this application.
            </Typography>
            <div style={{ width: '100%', marginTop: '20px', fontWeight: 'normal' }}>
                <ul>
                    <li>
                        {' '}
                        <Typography variant="h6">Kmeans</Typography>
                        <Typography variant="body1">
                            Kmeans is simple clustering algorithm. It is a Centroid based clustering algorithm. It uses
                            centroids to associate each point to a cluster.
                        </Typography>
                    </li>
                </ul>
            </div>
        </Grid>
    );
};

export default Page3;
