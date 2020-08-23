import React, { Component, SyntheticEvent, ReactElement } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Grid, Hidden, SvgIcon } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';

import logo from '../../assets/logo.svg';
import { AlgorithmNames } from '../../common/algorithms.enum';
import GlobalActionTypes from '../../reduxStore/types/Global.types';
import AlgorithmActionTypes from '../../reduxStore/types/KMEANS.algorithm.types';
import Speed from '../../common/speed.enum';
import menuIcon from '../../assets/menu.svg';
import BlueButton from '../../components/BlueButton';
import { RootState } from '../../reduxStore';
import Drawer from '../Drawer';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// define types of Props and State
interface State {
    anchor1: (EventTarget & Element) | null;
    anchor2: (EventTarget & Element) | null;
    isDrawerOpen: boolean;
}

// define mapStateToProps and mapDispatchToProps
const mapStateToProps = (state: RootState) => ({ global: state.global, kmeans: state.kmeans });

const mapDispatchToProps = {
    changeAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),
    reset: () => ({ type: GlobalActionTypes.RESET }),
    startVisualization: () => ({ type: GlobalActionTypes.START_VISUALIZATION }),
    resetAlgorithmData: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
    setSpeed: (speed: Speed) => ({
        type: GlobalActionTypes.SET_SPEED,
        payload: speed,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    children?: ReactElement | ReactElement[];
    drawerChildren?: ReactElement | ReactElement[];
    disabled?: () => boolean;
} & RouteComponentProps;

// NavBar
class NavBar extends Component<Props, State> {
    state = {
        anchor1: null,
        anchor2: null,
        isDrawerOpen: false,
    };

    handleSpeeMenu = (event: SyntheticEvent) => {
        this.setState({ anchor2: event.currentTarget });
    };
    handleAlgorithmMenu = (event: SyntheticEvent) => {
        this.setState({ anchor1: event.currentTarget });
    };

    handleSpeeMenuClose = (speed: Speed | null) => {
        this.setState({ anchor2: null });
        if (speed !== null)
            switch (speed) {
                case Speed.slow:
                    this.props.setSpeed(Speed.slow);
                    break;
                case Speed.average:
                    this.props.setSpeed(Speed.average);
                    break;
                case Speed.fast:
                    this.props.setSpeed(Speed.fast);
                    break;
                case Speed.faster:
                    this.props.setSpeed(Speed.faster);
                    break;
            }
    };

    handleAlgorithmClose = (algo: AlgorithmNames | null) => {
        this.setState({ anchor1: null });
        if (algo !== null)
            switch (algo) {
                case AlgorithmNames.KMEANS:
                    this.props.changeAlgorithm(algo);
                    break;
            }
    };

    isDisabled = (): boolean => {
        const { global } = this.props;

        if (
            global.algorithm === null ||
            global.coordinatesOfNodes.length < 5 ||
            global.start ||
            (this.props.disabled !== undefined ? this.props.disabled() : false)
        ) {
            return true;
        }

        return false;
    };

    render() {
        return (
            <AppBar elevation={0} className="appbar" color="transparent" style={{ color: 'white' }}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid container alignItems="center" item xs={9} md={2} lg={4}>
                            <Hidden smDown>
                                <Grid
                                    container
                                    alignItems="flex-start"
                                    style={{
                                        height: '48px',
                                        width: 'auto',
                                        marginRight: '20px',
                                        padding: '10px',
                                    }}
                                    onClick={() => this.setState({ isDrawerOpen: true })}
                                >
                                    <img src={menuIcon} alt="menu" style={{ height: '36px', width: 'auto' }} />
                                </Grid>
                            </Hidden>
                            <Hidden only={['sm', 'xs']}>
                                <img src={logo} alt="logo" style={{ height: '48px', width: 'auto' }} />
                            </Hidden>
                            <Hidden only={['md']}>
                                <Typography variant="h5" style={{ flexGrow: 1 }}>
                                    Clustering Visualizer
                                </Typography>
                            </Hidden>
                        </Grid>
                        <Hidden only={['md', 'lg', 'xl']}>
                            <Grid
                                container
                                alignItems="center"
                                justify="flex-end"
                                item
                                style={{ height: '48px', width: 'auto' }}
                                onClick={() => this.setState({ isDrawerOpen: true })}
                                xs={3}
                            >
                                <img src={menuIcon} alt="menu" style={{ height: '36px', width: 'auto' }} />
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid container alignItems="center" justify="flex-end" item xs={12} md={10} lg={8}>
                                {this.props.children}

                                <Button
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    // size="small"
                                    onClick={this.handleAlgorithmMenu}
                                    startIcon={
                                        <SvgIcon>
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                        </SvgIcon>
                                    }
                                    variant="contained"
                                    style={{ marginRight: '20px' }}
                                >
                                    {this.props.global.algorithm === null
                                        ? 'Select Algorithm'
                                        : this.props.global.algorithm}
                                </Button>

                                <Button
                                    variant="contained"
                                    // size="small"
                                    aria-haspopup="true"
                                    onClick={this.handleSpeeMenu}
                                    style={{ marginRight: '20px' }}
                                    startIcon={
                                        <SvgIcon>
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                        </SvgIcon>
                                    }
                                >
                                    {this.props.global.speed === null
                                        ? 'Select Speed'
                                        : this.props.global.speed === Speed.slow
                                        ? 'Slow'
                                        : this.props.global.speed === Speed.average
                                        ? 'Average'
                                        : this.props.global.speed === Speed.fast
                                        ? 'Fast'
                                        : 'Faster'}
                                </Button>

                                <BlueButton
                                    variant="contained"
                                    // size="small"
                                    onClick={() => {
                                        this.props.startVisualization();
                                    }}
                                    disabled={this.isDisabled()}
                                >
                                    Start
                                </BlueButton>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Toolbar>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchor1}
                    keepMounted
                    open={this.state.anchor1 !== null}
                    style={{ zIndex: 10000 }}
                    onClose={() => this.handleAlgorithmClose(null)}
                >
                    <MenuItem
                        onClick={() => {
                            this.handleAlgorithmClose(AlgorithmNames.KMEANS);
                            this.props.history.push('/kmeans');
                        }}
                    >
                        K Means
                    </MenuItem>
                </Menu>
                <Menu
                    id="menu-speed"
                    anchorEl={this.state.anchor2}
                    keepMounted
                    style={{ zIndex: 10000 }}
                    open={this.state.anchor2 !== null}
                    onClose={() => this.handleSpeeMenuClose(null)}
                >
                    <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.slow)}>Slow</MenuItem>
                    <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.average)}>Average</MenuItem>
                    <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.fast)}>Fast</MenuItem>
                    <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.faster)}>Faster</MenuItem>
                </Menu>
                <Drawer
                    isDisabled={this.isDisabled}
                    handleSpeeMenu={this.handleSpeeMenu}
                    handleAlgorithmMenu={this.handleAlgorithmMenu}
                    open={this.state.isDrawerOpen}
                    onOpen={() => this.setState({ isDrawerOpen: true })}
                    onClose={() => this.setState({ isDrawerOpen: false })}
                >
                    {this.props.drawerChildren}
                </Drawer>
            </AppBar>
        );
    }
}

export default withRouter(connector(NavBar));
