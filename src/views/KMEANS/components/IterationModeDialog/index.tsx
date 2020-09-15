import React, { ReactElement, useState } from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemText, Typography, TextField, Grid } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';

import BlueButton from '../../../../components/BlueButton';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { RootState } from '../../../../reduxStore';
import KMEANSAlgorithmActionTypes from '../../../../reduxStore/types/KMEANS.algorithm.types';

const mapStateToProps = (state: RootState) => ({ global: state.global });
const mapDispatchToProps = {
    setMode: (mode: KMEANSMode) => ({ type: KMEANSAlgorithmActionTypes.SET_ITERATION_MODE, payload: mode }),
    setMaxIterations: (maxIter: number) => ({ type: KMEANSAlgorithmActionTypes.SET_MAX_ITERATIONS, payload: maxIter }),
    setInfoNull: () => ({ type: KMEANSAlgorithmActionTypes.SET_INFO, payload: null }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    onClose: () => void;
    open: boolean;
};

function IterationModeDialog(props: Props): ReactElement {
    const [state, setState] = useState(0);
    const [inputs, setInput] = useState({ input1: '', input2: '' });

    return (
        <Dialog maxWidth="sm" open={props.open} onClose={props.onClose}>
            {state === 0 ? (
                <div>
                    <DialogTitle>Iteration Mode for K Means Algorithm</DialogTitle>
                    <List>
                        <ListItem
                            button
                            onClick={() => {
                                props.setMode(KMEANSMode.SingleIteration);
                                props.setInfoNull();
                                props.onClose();
                            }}
                        >
                            <ListItemText primary="Run KMEANS Once" secondary={'Runs the K-Means algorithm once.'} />
                        </ListItem>
                        <ListItem button onClick={() => setState(1)}>
                            <ListItemText
                                primary="Run KMEANS Many times"
                                secondary="Runs the k-means algorithm multiple times and calculates variance for each result and gives the best result"
                            />
                        </ListItem>{' '}
                    </List>
                </div>
            ) : state === 1 ? (
                <Grid container justify="center" style={{ margin: '5px', padding: '20px', maxWidth: '300px' }}>
                    <DialogTitle>Number of Iterations</DialogTitle>
                    <Typography
                        variant="body2"
                        gutterBottom
                        style={{ marginTop: '10px', width: '100%', marginBottom: '20px' }}
                        align="center"
                    >
                        How many times do you want to run K-Means algorithm?
                    </Typography>
                    <form>
                        <TextField
                            color="secondary"
                            autoFocus
                            value={inputs.input1}
                            onChange={(e) => {
                                e.persist();
                                setInput((s) => ({ ...s, input1: e.target.value }));
                            }}
                            variant="outlined"
                            inputProps={{ min: 0 }}
                            type="number"
                            style={{ display: 'block' }}
                        />
                        <BlueButton
                            type="submit"
                            variant="contained"
                            style={{ marginTop: '10px' }}
                            onClick={() => {
                                props.setMaxIterations(parseInt(inputs.input1));
                                props.setMode(KMEANSMode.MultipleIteration);
                                props.setInfoNull();
                                props.onClose();
                            }}
                            disabled={inputs.input1.trim() === '' || parseInt(inputs.input1) < 2}
                        >
                            Save
                        </BlueButton>
                    </form>
                </Grid>
            ) : null}
        </Dialog>
    );
}

export default connector(IterationModeDialog);
