import React, { Component, SyntheticEvent, ReactElement } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem, Grid, Hidden, SvgIcon, Divider } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import { AlgorithmNames } from '../../common/algorithms.enum';
import GlobalActionTypes from '../../reduxStore/types/Global.types';
import { AlgorithmActionTypes } from '../../reduxStore/types/algorithm.types';
import Speed from '../../common/speed.enum';
import BlueButton from '../../components/BlueButton';
import { RootState } from '../../reduxStore';
import Drawer from '../Drawer';
import FlatButton from '../../components/FlatButton';
import RedButton from '../../components/RedButton';

// define types of Props and State
interface State {
    anchor1: (EventTarget & Element) | null;
    anchor2: (EventTarget & Element) | null;
    isDrawerOpen: boolean;
}

// define mapStateToProps and mapDispatchToProps
const mapStateToProps = (state: RootState) => ({ global: state.global, algorithm: state.algorithm });

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
    resume: () => ({ type: GlobalActionTypes.SET_FREEZE_STATUS, payload: false }),
    pause: () => ({ type: GlobalActionTypes.SET_FREEZE_STATUS, payload: true }),
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

    algorithmName = () => {
        switch (this.props.global.algorithm) {
            case AlgorithmNames.HIERARCHICAL_CLUSTERING:
                return 'HIERARCHICAL';

            case AlgorithmNames.MEAN_SHIFT:
                return 'MEAN SHIFT';

            default:
                return this.props.global.algorithm;
        }
    };

    handleSpeeMenu = (event: SyntheticEvent) => {
        this.setState({ anchor2: event.currentTarget });
    };
    handleAlgorithmMenu = (event: SyntheticEvent) => {
        this.setState({ anchor1: event.currentTarget });
    };

    handleSpeeMenuClose = (speed: Speed | null) => {
        this.setState({ anchor2: null });
        if (speed !== null) this.props.setSpeed(speed);
    };

    handleAlgorithmMenuClose = (algo: AlgorithmNames | null) => {
        this.setState({ anchor1: null });
        if (algo !== null) this.props.changeAlgorithm(algo);
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
            <AppBar elevation={0} className="appbar" color="transparent" style={{ color: 'white', minHeight: '80px' }}>
                <Toolbar>
                    <Grid container alignItems="center" style={{ height: '100%', position: 'relative', top: '8px' }}>
                        <Grid container alignItems="center" item xs={9} md={2} xl={3}>
                            <Hidden smDown>
                                <Grid
                                    container
                                    alignItems="center"
                                    style={{
                                        height: '48px',
                                        width: 'auto',
                                        marginRight: '20px',
                                        padding: '10px',
                                    }}
                                    onClick={() => this.setState({ isDrawerOpen: true })}
                                >
                                    <SvgIcon style={{ height: '36px', width: 'auto' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#fff" width="24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                                        </svg>
                                    </SvgIcon>
                                </Grid>
                            </Hidden>
                            <Hidden only={['sm', 'xs']}>
                                <img src={logo} alt="logo" style={{ height: '48px', width: 'auto' }} />
                            </Hidden>
                            <Hidden only={['md', 'lg']}>
                                <Typography variant="h5">Clustering Visualizer</Typography>
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
                                <SvgIcon style={{ height: '36px', width: 'auto' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#fff" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                                    </svg>
                                </SvgIcon>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid container alignItems="center" justify="flex-end" item xs={12} md={10} xl={9}>
                                {this.props.children}

                                <FlatButton
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    size="small"
                                    disabled={this.props.global.start}
                                    onClick={this.handleAlgorithmMenu}
                                    startIcon={
                                        <SvgIcon>
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                        </SvgIcon>
                                    }
                                    variant="contained"
                                    style={{ marginRight: '20px', borderRadius: 'none' }}
                                >
                                    {this.props.global.algorithm === null ? 'Select Algorithm' : this.algorithmName()}
                                </FlatButton>

                                <FlatButton
                                    variant="contained"
                                    size="small"
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
                                </FlatButton>

                                <Hidden only={['sm', 'md']}>
                                    <FlatButton
                                        style={{ marginRight: '20px' }}
                                        onClick={() => this.props.resetAlgorithmData()}
                                        disabled={this.props.algorithm.render.length === 0 || this.props.global.start}
                                        startIcon={
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                >
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                </svg>
                                            </SvgIcon>
                                        }
                                    >
                                        CLEAR
                                    </FlatButton>
                                </Hidden>

                                <Hidden only={['sm', 'md']}>
                                    <RedButton
                                        onClick={() => {
                                            this.props.resetAlgorithmData();
                                            this.props.reset();
                                        }}
                                        style={{ marginRight: '20px' }}
                                        disabled={
                                            this.props.global.start || this.props.global.coordinatesOfNodes.length === 0
                                        }
                                        startIcon={
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                >
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                                </svg>
                                            </SvgIcon>
                                        }
                                    >
                                        CLEAR ALL
                                    </RedButton>
                                </Hidden>

                                {!this.props.global.start ? (
                                    <BlueButton
                                        variant="contained"
                                        size="small"
                                        onClick={() => {
                                            this.props.startVisualization();
                                        }}
                                        disabled={this.isDisabled()}
                                        autoFocus
                                    >
                                        Start
                                    </BlueButton>
                                ) : this.props.global.froze ? (
                                    <BlueButton
                                        variant="contained"
                                        size="small"
                                        onClick={() => {
                                            this.props.resume();
                                        }}
                                        startIcon={
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                >
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </SvgIcon>
                                        }
                                        autoFocus
                                    >
                                        Resume
                                    </BlueButton>
                                ) : (
                                    <BlueButton
                                        autoFocus
                                        variant="contained"
                                        size="small"
                                        onClick={() => {
                                            this.props.pause();
                                        }}
                                        startIcon={
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                >
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                </svg>
                                            </SvgIcon>
                                        }
                                    >
                                        Pause
                                    </BlueButton>
                                )}
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
                    onClose={() => this.handleAlgorithmMenuClose(null)}
                >
                    {' '}
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}
                    >
                        <img src={logo} alt="logo" style={{ height: '30px', width: 'auto' }} />{' '}
                        <Typography variant="h6" align="center" style={{ marginLeft: '10px' }}>
                            Select Algorithm
                        </Typography>
                    </Grid>
                    <Divider />
                    <MenuItem
                        onClick={() => {
                            this.handleAlgorithmMenuClose(AlgorithmNames.DBSCAN);
                            this.props.history.push('/dbscan');
                        }}
                    >
                        DBSCAN
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            this.handleAlgorithmMenuClose(AlgorithmNames.MEAN_SHIFT);
                            this.props.history.push('/mean-shift');
                        }}
                    >
                        MEAN SHIFT
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            this.handleAlgorithmMenuClose(AlgorithmNames.KMEANS);
                            this.props.history.push('/kmeans');
                        }}
                    >
                        K MEANS
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            this.handleAlgorithmMenuClose(AlgorithmNames.KMEANS);
                            this.props.history.push('/hierarchical');
                        }}
                    >
                        HIERARCHICAL CLUSTERING
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
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}
                    >
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" />
                            </svg>
                        </SvgIcon>{' '}
                        <Typography variant="h6" align="center" style={{ marginLeft: '10px' }}>
                            Change Speed
                        </Typography>
                    </Grid>
                    <Divider />
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
