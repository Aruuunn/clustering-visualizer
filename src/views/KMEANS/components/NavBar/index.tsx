import React, { Component } from 'react';
import { ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { InputBase, Button, SvgIcon, withStyles, fade, Grid } from '@material-ui/core';

import CommonNavBar from '../../../../components/CommonNavBar';
import { RootState, GlobalActionTypes } from '../../../../reduxStore';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import AlgorithmNames from '../../../../common/algorithms.enum';

interface State {
    anchor3: (EventTarget & Element) | null;
    isDrawerOpen: boolean;
    isIterationModeDialogOpen: boolean;
}

const mapStateToProps = (state: RootState) => ({ global: state.global, kmeans: state.kmeans });

const mapDispatchToProps = {
    changeNumberOfClusters: (numberOfClusters: number) => ({
        type: GlobalActionTypes.SET_NUMBER_OF_CLUSTERS,
        payload: numberOfClusters,
    }),
    setAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    classes: any;
};

class NavBar extends Component<Props, State> {
    state = { anchor3: null, isDrawerOpen: false, isIterationModeDialogOpen: false };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        if (parseInt(e.target.value) >= 0) {
            this.props.changeNumberOfClusters(parseInt(e.target.value));
        } else {
            this.props.changeNumberOfClusters(0);
        }
    };

    componentDidMount() {
        this.props.setAlgorithm(AlgorithmNames.KMEANS);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <CommonNavBar
                    drawerChildren={[
                        <Grid container justify="center" alignItems="center" key={0}>
                            <InputBase
                                placeholder="Number of Clusters"
                                style={{
                                    width: '100%',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: '10px',
                                    maxWidth: '500px',
                                }}
                                fullWidth
                                color="secondary"
                                value={
                                    this.props.global.numberOfClusters === 0 ? '' : this.props.global.numberOfClusters
                                }
                                onChange={this.handleInputChange}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                className={classes.input}
                                type="number"
                            />
                        </Grid>,
                    ]}
                >
                    {[
                        <InputBase
                            key={0}
                            placeholder="Number of Clusters"
                            style={{ maxWidth: '180px' }}
                            color="secondary"
                            value={this.props.global.numberOfClusters === 0 ? '' : this.props.global.numberOfClusters}
                            onChange={this.handleInputChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            className={classes.input}
                            type="number"
                        />,

                        <Button
                            key={1}
                            size="small"
                            variant="contained"
                            style={{ marginRight: '20px' }}
                            onClick={() => this.setState({ isIterationModeDialogOpen: true })}
                            startIcon={
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                </SvgIcon>
                            }
                        >
                            {this.props.kmeans.mode === KMEANSMode.SingleIteration
                                ? 'Single Iteration Mode'
                                : this.props.kmeans.mode === KMEANSMode.MultipleIteration
                                ? `Multiple Iterations - ${this.props.kmeans.maxIterations}`
                                : `Find best value of K - ${this.props.kmeans.maxIterations}`}
                        </Button>,
                    ]}
                </CommonNavBar>
            </div>
        );
    }
}

export default withStyles((theme) => ({
    input: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))(connector(NavBar));
