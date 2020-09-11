import React, { Component, SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Grid, Typography, SvgIcon, Menu, MenuItem } from '@material-ui/core';

import AlgorithmNames from '../../../../common/algorithms.enum';
import { CommonNavBar, Slider, FlatButton } from '../../../../components';
import {
    GlobalActionTypes,
    RootState,
    HierarchicalActionTypes,
    HierarchicalClusteringType,
} from '../../../../reduxStore';

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
    setType: (type: HierarchicalClusteringType) => ({ type: HierarchicalActionTypes.SET_TYPE, payload: type }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type State = {
    anchor: null | EventTarget;
};

class NavBar extends Component<Props, State> {
    state = {
        anchor: null,
    };

    openMenu = (e: SyntheticEvent) => {
        this.setState({ anchor: e.currentTarget });
    };

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
                                <Typography variant="button">
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
                        </Grid>,
                        <FlatButton
                            key={1}
                            aria-haspopup="true"
                            disabled={this.props.global.start}
                            onClick={this.openMenu}
                            style={{ marginRight: '20px' }}
                            startIcon={
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                </SvgIcon>
                            }
                        >
                            {this.props.hierarchical.type}
                        </FlatButton>,
                    ]}
                </CommonNavBar>
                <Menu
                    open={this.state.anchor !== null}
                    onClose={() => this.setState({ anchor: null })}
                    anchorEl={this.state.anchor}
                >
                    <MenuItem
                        onClick={() => {
                            this.props.setType(HierarchicalClusteringType.AGGLOMERATIVE);
                            this.setState({ anchor: null });
                        }}
                    >
                        AGGLOMERATIVE
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            this.props.setType(HierarchicalClusteringType.DIVISIVE);
                            this.setState({ anchor: null });
                        }}
                    >
                        DIVISIVE
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default connector(NavBar);
