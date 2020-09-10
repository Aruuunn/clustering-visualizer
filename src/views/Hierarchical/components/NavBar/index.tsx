import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import AlgorithmNames from '../../../../common/algorithms.enum';
import { CommonNavBar, Slider } from '../../../../components';
import { GlobalActionTypes, RootState, HierarchicalActionTypes } from '../../../../reduxStore';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    algorithm: state.algorithm,
    hierarchical: state.hierarchical,
});

const mapDispatchToProps = {
    setAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),
    setNumberOfClusters: (num: number) => ({ type: HierarchicalActionTypes.SET_NUMBER_OF_CLUSTERS, payload: num }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type State = any;

class NavBar extends Component<Props, State> {
    state = {};

    componentDidMount() {
        if (this.props.global.algorithm !== AlgorithmNames.HIERARCHICAL_CLUSTERING)
            this.props.setAlgorithm(AlgorithmNames.HIERARCHICAL_CLUSTERING);
    }
    componentDidUpdate() {
        if (this.props.global.algorithm !== AlgorithmNames.HIERARCHICAL_CLUSTERING)
            this.props.setAlgorithm(AlgorithmNames.HIERARCHICAL_CLUSTERING);
    }

    render() {
        return (
            <div>
                <CommonNavBar
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
                            <Typography variant="button">Number of Clusters: {this.props.hierarchical.numberOfClusters}</Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                color="secondary"
                                min={2}
                                max={20}
                                value={this.props.hierarchical.numberOfClusters}
                                onChange={(e, val) =>
                                    this.props.global.start
                                        ? null
                                        : this.props.setNumberOfClusters(val as number)
                                }
                            />
                        </Grid>
                            </Grid>]}>
                    <Grid
                        key={0}
                        container
                        direction="column"
                        alignItems="flex-end"
                        style={{ maxWidth: '200px', marginRight: '30px' }}
                    >
                        <Typography
                            variant="button"
                            style={{ width: '100%', position: 'relative', left: '-2px' }}
                            align="left"
                        >
                            Number of Clusters: {this.props.hierarchical.numberOfClusters}
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            color="secondary"
                            min={2}
                            max={20}
                            value={this.props.hierarchical.numberOfClusters}
                            onChange={(e, val) =>
                                this.props.global.start ? null : this.props.setNumberOfClusters(val as number)
                            }
                        />
                    </Grid>
                </CommonNavBar>
            </div>
        );
    }
}

export default connector(NavBar);
