import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BlueButton } from '../../../../components';
import { Grid, Typography, Link } from '@material-ui/core';

type Props = {
    setNeverShowAlgorithmModal: () => void;
};

export default function AlgorithmInfoDialog(props: Props): React.ReactElement {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">K MEANS Algorithm</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                        <Typography variant="body1">
                            {' '}
                            Kmeans algorithm is an iterative algorithm that tries to partition the dataset into
                            <em> K pre-defined distinct non-overlapping subgroups (clusters) </em>
                            where each data point belongs to only one group. It tries to make the intra-cluster data
                            points as similar as possible while also keeping the clusters as different (far) as
                            possible. It assigns data points to a cluster such that the sum of the squared distance
                            between the data points and the cluster’s centroid (arithmetic mean of all the data points
                            that belong to that cluster) is at the minimum. The less variation we have within clusters,
                            the more homogeneous (similar) the data points are within the same cluster.
                        </Typography>
                        <br />
                        <Typography variant="h6">The way kmeans algorithm works is as follows:</Typography>
                        <ul>
                            <li> Specify number of clusters (K)</li>{' '}
                            <li>
                                {' '}
                                Initialize centroids by first shuffling the dataset and then randomly selecting K data
                                points for the centroids without replacement.
                            </li>{' '}
                            <li>
                                Keep iterating until there is no change to the centroids. i.e assignment of data points
                                to clusters isn’t changing.
                            </li>
                            <li>Compute the sum of the squared distance between data points and all centroids.</li>
                            <li> Assign each data point to the closest cluster (centroid).</li>
                            <li>
                                {' '}
                                Compute the centroids for the clusters by taking the average of the all data points that
                                belong to each cluster.
                            </li>
                        </ul>{' '}
                        <Typography variant="body2">
                            Credits -{' '}
                            <Link
                                style={{ color: 'white' }}
                                href="https://towardsdatascience.com/k-means-clustering-algorithm-applications-evaluation-methods-and-drawbacks-aa03e644b48a"
                            >
                                Medium/@ImadPhd
                            </Link>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid container justify="space-between" style={{ marginLeft: '10px', marginRight: '10px' }}>
                        <Button color="secondary" onClick={() => props.setNeverShowAlgorithmModal()}>
                            NEVER SHOW AGAIN
                        </Button>
                        <BlueButton onClick={handleClose}>CLOSE</BlueButton>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
}
