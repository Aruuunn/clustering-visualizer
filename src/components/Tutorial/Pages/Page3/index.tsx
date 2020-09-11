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
                        <Typography component="span" variant="h6">Kmeans</Typography>
                    </li>
                    <li>
                        {' '}
                        <Typography component="span"  variant="h6">DBSCAN</Typography>
                    </li>
                    <li>
                        {' '}
                        <Typography component="span"  variant="h6">Mean Shift</Typography>
                    </li>
                    <li>
                        {' '}
                        <Typography component="span"  variant="h6">Agglomerative Hierarchical Clustering</Typography>
                    </li>
                </ul>
            </div>
        </Grid>
    );
};

export default Page3;
