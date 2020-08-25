import React from 'react';
import { Typography, Grid, Link } from '@material-ui/core';

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
                What is Clustering?
            </Typography>
            <Typography variant="h5" style={{ marginTop: '50px' }}>
                Cluster analysis or clustering is the task of grouping a set of objects in such a way that objects in
                the same group (called a cluster) are more similar (in some sense) to each other than to those in other
                groups (clusters). Clustering Algorithms are widely used in lot of different domains.
                <Link
                    color="secondary"
                    href="https://en.wikipedia.org/wiki/Cluster_analysis"
                    style={{ marginLeft: '10px' }}
                >
                    More
                </Link>
            </Typography>
            <div
                style={{
                    width: '100%',
                    marginTop: '10px',
                    flexGrow: 1,
                    backgroundRepeat: 'no-repeat',
                    background:
                        'url(https://res.cloudinary.com/practicaldev/image/fetch/s--AUQiJx3F--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/hlhc90vqrotab8il9wa0.png)',
                    backgroundSize: 'cover',
                }}
            ></div>
            <Typography gutterBottom>
                <Link
                    href="https://dev.to/nexttech/k-means-clustering-with-scikit-learn-14kk"
                    style={{ color: 'white' }}
                >
                    photo source
                </Link>
            </Typography>
        </Grid>
    );
};

export default Page2;
