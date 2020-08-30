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
                <DialogTitle id="scroll-dialog-title">DBSCAN Algorithm</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                        <Typography variant="body1">
                            {' '}
                            Density-based spatial clustering of applications with noise (DBSCAN) is a density based
                            clustering algorithm.The key idea is that for each point of a cluster, the neighborhood of a
                            given radius has to contain at least a minimum number of points.
                        </Typography>
                        <br />
                        <Typography variant="h6">Parameters of DBSCAN</Typography>
                        <ul>
                            <li>
                                {' '}
                                <strong>Epsilon (eps)</strong> : It defines the neighborhood around a data point i.e. if
                                the distance between two points is lower or equal to ‘eps’ then they are considered as
                                neighbors. If the eps value is chosen too small then large part of the data will be
                                considered as outliers. If it is chosen very large then the clusters will merge and
                                majority of the data points will be in the same clusters.
                            </li>{' '}
                            <li>
                                {' '}
                                <strong> Min Points</strong> :Minimum number of neighbors (data points) within eps
                                radius. Larger the dataset, the larger value of MinPts must be chosen. As a general
                                rule, the minimum MinPts can be derived from the number of dimensions D in the dataset
                                as, MinPts {'>='} D+1. The minimum value of MinPts must be chosen at least 3.
                            </li>{' '}
                        </ul>{' '}
                        <br />
                        <Typography variant="h6">The way DBSCAN algorithm works is as follows:</Typography>
                        <ul>
                            <li>
                                {' '}
                                Find all the neighbor points within eps and identify the core points or visited with
                                more than MinPts neighbors
                            </li>{' '}
                            <li>
                                {' '}
                                For each core point if it is not already assigned to a cluster, create a new cluster.
                            </li>{' '}
                            <li>
                                Find recursively all its density connected points and assign them to the same cluster as
                                the core point.
                            </li>
                            <li>
                                Find recursively all its density connected points and assign them to the same cluster as
                                the core point. A point a and b are said to be density connected if there exist a point
                                c which has a sufficient number of points in its neighbors and both the points a and b
                                are within the eps distance. This is a chaining process. So, if b is neighbor of c, c is
                                neighbor of d, d is neighbor of e, which in turn is neighbor of a implies that b is
                                neighbor of a.
                            </li>
                            <li>
                                Iterate through the remaining unvisited points in the dataset. Those points that do not
                                belong to any cluster are noise
                            </li>
                        </ul>
                        <Typography variant="body2">
                            Credits -{' '}
                            <Link
                                style={{ color: 'white' }}
                                href="https://www.geeksforgeeks.org/dbscan-clustering-in-ml-density-based-clustering/"
                            >
                                GeeksforGeeks/@Debomit Dey
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
