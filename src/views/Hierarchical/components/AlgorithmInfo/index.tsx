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
                <DialogTitle id="scroll-dialog-title">AGGLOMERATIVE HIERARCHICAL CLUSTERING</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                        <Typography variant="body1">
                            Hierarchical clustering, also known as hierarchical cluster analysis, is an algorithm that
                            groups similar objects into groups called clusters. The endpoint is a set of clusters, where
                            each cluster is distinct from each other cluster, and the objects within each cluster are
                            broadly similar to each other. There are two types of Hierarchical Clustering
                            <ul>
                                <li>Agglomerative</li>
                                <li>Devisive</li>
                            </ul>
                        </Typography>
                 
                        <Typography>
                            The Agglomerative Hierarchical Clustering is the most common type of hierarchical clustering
                            used to group objects in clusters based on their similarity. It’s also known as AGNES
                            (Agglomerative Nesting). It's a “bottom-up” approach: each observation starts in its own
                            cluster, and pairs of clusters are merged as one moves up the hierarchy.
                        </Typography>
                        <br />
                        <Typography variant="h6">The way Agglomerative Hierarchical Clustering works is as follows:</Typography>
                        <ul>
                            <li>
                            Make each data point a single-point cluster → forms N clusters
                            </li>{' '}
                            <li>
                            Take the two closest data points and make them one cluster → forms N-1 clusters
                            </li>{' '}
                            <li>
                            Take the two closest clusters and make them one cluster → Forms N-2 clusters.
                            </li>
                            <li>
                            Repeat step-3 until you are left with only the required number of clusters.
                            </li>
                        
                        </ul>
                        <Typography variant="body2">
                            Credits -{' '}
                            <Link
                                style={{ color: 'white' }}
                                href="https://www.kdnuggets.com/2019/09/hierarchical-clustering.html"
                            >
                                KDNuggets
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
