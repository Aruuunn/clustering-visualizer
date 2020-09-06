import React, { Component } from 'react';
import { ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SvgIcon, Grid, Typography } from '@material-ui/core';

import CommonNavBar from '../../../../components/CommonNavBar';
import { RootState, GlobalActionTypes, KMEANSAlgorithmActionTypes } from '../../../../reduxStore';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import AlgorithmNames from '../../../../common/algorithms.enum';
import IterationModeDialog from '../IterationModeDialog';
import { FlatButton, Slider } from '../../../../components';

interface State {
    anchor3: (EventTarget & Element) | null;
    isDrawerOpen: boolean;
    isIterationModeDialogOpen: boolean;
}

const mapStateToProps = (state: RootState) => ({ global: state.global, kmeans: state.kmeans });

const mapDispatchToProps = {
    changeNumberOfClusters: (numberOfClusters: number) => ({
        type: KMEANSAlgorithmActionTypes.SET_NUMBER_OF_CLUSTERS,
        payload: numberOfClusters,
    }),
    setAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

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
        if (this.props.global.algorithm !== AlgorithmNames.KMEANS) this.props.setAlgorithm(AlgorithmNames.KMEANS);
    }
    componentDidUpdate() {
        if (this.props.global.algorithm !== AlgorithmNames.KMEANS) this.props.setAlgorithm(AlgorithmNames.KMEANS);
    }

    disabled = () =>
        this.props.kmeans.numberOfClusters <= 1 ||
        this.props.kmeans.numberOfClusters >= this.props.global.coordinatesOfNodes.length;

    public render() {
        return (
            <div>
                <CommonNavBar
                    isSliderDisabled={this.props.global.start || this.props.kmeans.render.length !== 0}
                    disabled={this.disabled}
                    drawerChildren={[
                        <Grid container justify="center" alignItems="center" key={0}>
                            <Grid
                                container
                                direction="column"
                                style={{
                                    width: '100%',
                                    margin: '5px',
                                    maxWidth: '500px',
                                }}
                            >
                                <Typography variant="button">Number of Clusters: {this.props.kmeans.numberOfClusters}</Typography>
                                <Slider
                                    valueLabelDisplay="auto"
                                    color="secondary"
                                    min={2}
                                    max={20}
                                    value={this.props.kmeans.numberOfClusters}
                                    onChange={(e, val) =>
                                        this.props.global.start
                                            ? null
                                            : this.props.changeNumberOfClusters(val as number)
                                    }
                                />
                            </Grid>
                        </Grid>,
                        <Grid container justify="center" alignItems="center" key={1}>
                            <FlatButton
                                key={1}
                                variant="contained"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: '10px',
                                }}
                                disabled={this.props.global.start}
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
                            </FlatButton>
                        </Grid>,
                    ]}
                >
                    {[
                        <Grid
                            key={0}
                            container
                            direction="column"
                            alignItems="flex-end"
                            style={{ maxWidth: '200px', marginRight: '30px' }}
                        >
                            <Typography variant="button" style={{ width: '100%', position: 'relative', left: '-2px' }} align="left">
                                Number of Clusters: {this.props.kmeans.numberOfClusters}
                            </Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                color="secondary"
                                min={2}
                                max={20}
                                value={this.props.kmeans.numberOfClusters}
                                onChange={(e, val) =>
                                    this.props.global.start ? null : this.props.changeNumberOfClusters(val as number)
                                }
                            />
                        </Grid>,

                        <FlatButton
                            key={1}
                            size="small"
                            variant="contained"
                            disabled={this.props.global.start}
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
                        </FlatButton>,
                    ]}
                </CommonNavBar>
                {this.state.isIterationModeDialogOpen ? (
                    <IterationModeDialog
                        open={this.state.isIterationModeDialogOpen}
                        onClose={() => this.setState({ isIterationModeDialogOpen: false })}
                    />
                ) : null}
            </div>
        );
    }
}

export default connector(NavBar);
