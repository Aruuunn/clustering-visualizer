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
                <DialogTitle id="scroll-dialog-title">Mean Shift</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                        <Typography variant="body1">
                            Mean shift clustering is a sliding-window-based algorithm that attempts to find dense areas
                            of data points. It is a centroid-based algorithm meaning that the goal is to locate the
                            center points of each group/class, which works by updating candidates for center points to
                            be the mean of the points within the sliding-window. These candidate windows are then
                            filtered in a post-processing stage to eliminate near-duplicates, forming the final set of
                            center points and their corresponding groups.
                        </Typography>
                        <br />
                        <Typography variant="h6">The way Mean Shift algorithm works is as follows:</Typography>
                        <ul>
                            <li>
                                {' '}
                                To explain mean-shift we will consider a set of points in two-dimensional space like the
                                above illustration. We begin with a circular sliding window centered at a point C
                                (randomly selected) and having radius r as the kernel. Mean shift is a hill-climbing
                                algorithm that involves shifting this kernel iteratively to a higher density region on
                                each step until convergence.
                            </li>{' '}
                            <li>
                                At every iteration, the sliding window is shifted towards regions of higher density by
                                shifting the center point to the mean of the points within the window (hence the name).
                                The density within the sliding window is proportional to the number of points inside it.
                                Naturally, by shifting to the mean of the points in the window it will gradually move
                                towards areas of higher point density.
                            </li>{' '}
                            <li>
                                We continue shifting the sliding window according to the mean until there is no
                                direction at which a shift can accommodate more points inside the kernel. Check out the
                                graphic above; we keep moving the circle until we no longer are increasing the density
                                (i.e number of points in the window).
                            </li>
                            <li>
                                This process of steps 1 to 3 is done with many sliding windows until all points lie
                                within a window. When multiple sliding windows overlap the window containing the most
                                points is preserved. The data points are then clustered according to the sliding window
                                in which they reside.
                            </li>
                        </ul>
                        <Typography variant="body2">
                            Credits -{' '}
                            <Link
                                style={{ color: 'white' }}
                                href="https://towardsdatascience.com/the-5-clustering-algorithms-data-scientists-need-to-know-a36d136ef68"
                            >
                                Medium/@George Seif
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
