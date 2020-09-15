import React, { ReactElement } from 'react';
import { SwipeableDrawer, useMediaQuery, useTheme, Grid, Divider, Typography, SvgIcon } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';

import RedButton from '../RedButton';
import { AlgorithmNames } from '../../common/algorithms.enum';
import GlobalActionTypes from '../../reduxStore/types/Global.types';
import UserDataActionTypes from '../../reduxStore/types/UserPreferences.types';
import AlgorithmActionTypes from '../../reduxStore/types/algorithm.types';
import Speed from '../../common/speed.enum';
import BlueButton from '../BlueButton';
import { RootState } from '../../reduxStore';
import FlatButton from '../../components/FlatButton';
import Slider from '../../components/Slider';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    userPreference: state.userPreferences,
    algorithm: state.algorithm,
});

const mapDispatchToProps = {
    changeAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),
    reset: () => ({ type: GlobalActionTypes.RESET }),
    startVisualization: () => ({ type: GlobalActionTypes.START_VISUALIZATION }),
    resetAlgorithmVisualization: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
    setSpeed: (speed: Speed) => ({
        type: GlobalActionTypes.SET_SPEED,
        payload: speed,
    }),
    setPointSize: (size: number | number[]) => ({
        type: UserDataActionTypes.SET_SIZE_OF_POINT,
        payload: size,
    }),
    clearPoints: () => ({ type: GlobalActionTypes.RESET }),
    resume: () => ({ type: GlobalActionTypes.SET_FREEZE_STATUS, payload: false }),
    pause: () => ({ type: GlobalActionTypes.SET_FREEZE_STATUS, payload: true }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    handleAlgorithmMenu: (event: React.SyntheticEvent<Element, Event>) => void;
    handleSpeeMenu: (event: React.SyntheticEvent<Element, Event>) => void;
    isDisabled: () => boolean;
    children?: ReactElement | ReactElement[];
};

function Drawer(props: Props): ReactElement {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const algorithmName = () => {
        switch (props.global.algorithm) {
            case AlgorithmNames.HIERARCHICAL_CLUSTERING:
                return 'HIERARCHICAL CLUSTERING';

            case AlgorithmNames.MEAN_SHIFT:
                return 'MEAN SHIFT';

            default:
                return props.global.algorithm;
        }
    };

    return (
        <div>
            <SwipeableDrawer anchor={sm ? 'bottom' : 'left'} {...props}>
                {sm ? (
                    <Grid container direction="column" justify="center" alignItems="center" style={{ padding: '10px' }}>
                        {' '}
                        {props.children}
                        <Grid container justify="center" alignItems="center">
                            <FlatButton
                                variant="contained"
                                onClick={props.handleAlgorithmMenu}
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: '10px',
                                }}
                                disabled={props.global.start}
                                startIcon={
                                    <SvgIcon>
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                    </SvgIcon>
                                }
                            >
                                {' '}
                                {props.global.algorithm === null ? 'Select Algorithm' : algorithmName()}
                            </FlatButton>
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                            <FlatButton
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: '10px',
                                }}
                                variant="contained"
                                aria-haspopup="true"
                                onClick={props.handleSpeeMenu}
                                startIcon={
                                    <SvgIcon>
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                    </SvgIcon>
                                }
                            >
                                {props.global.speed === null
                                    ? 'Select Speed'
                                    : props.global.speed === Speed.slow
                                    ? 'Slow'
                                    : props.global.speed === Speed.average
                                    ? 'Average'
                                    : props.global.speed === Speed.fast
                                    ? 'Fast'
                                    : 'Faster'}
                            </FlatButton>
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                            {!props.global.start ? (
                                <BlueButton
                                    variant="contained"
                                    style={{
                                        width: '100%',
                                        maxWidth: '500px',
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginTop: '10px',
                                    }}
                                    onClick={() => {
                                        props.startVisualization();
                                        props.onClose();
                                    }}
                                    disabled={props.isDisabled()}
                                    autoFocus
                                >
                                    Start
                                </BlueButton>
                            ) : props.global.froze ? (
                                <BlueButton
                                    variant="contained"
                                    style={{
                                        width: '100%',
                                        maxWidth: '500px',
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginTop: '10px',
                                    }}
                                    onClick={() => {
                                        props.resume();
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
                                    style={{
                                        width: '100%',
                                        maxWidth: '500px',
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginTop: '10px',
                                    }}
                                    onClick={() => {
                                        props.pause();
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
                        </Grid>{' '}
                    </Grid>
                ) : null}
                <Divider style={{ margin: '30px', opacity: sm ? 1 : 0 }} />
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{
                        padding: '10px',
                    }}
                >
                    <Grid
                        container
                        justify="center"
                        style={{
                            minWidth: sm ? '100px' : '300px',
                            maxWidth: '500px',
                            padding: '10px',
                        }}
                        alignItems="center"
                    >
                        <Typography variant="button" style={{ width: '100%' }}>
                            Point Size
                        </Typography>
                        <Slider
                            disabled={props.algorithm.render.length !== 0}
                            value={props.userPreference.sizeOfPoint}
                            onChange={(e, value) => props.setPointSize(value)}
                            color="secondary"
                            min={5}
                            max={15}
                            valueLabelDisplay="auto"
                            step={1}
                        />
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <FlatButton
                            onClick={() => props.resetAlgorithmVisualization()}
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                marginLeft: 0,
                                marginRight: 0,
                                marginTop: '10px',
                            }}
                            variant="contained"
                            disabled={props.algorithm.render.length === 0 || props.global.start}
                            startIcon={
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </SvgIcon>
                            }
                        >
                            {' '}
                            Clear Visualization
                        </FlatButton>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <RedButton
                            onClick={() => {
                                props.resetAlgorithmVisualization();
                                props.clearPoints();
                            }}
                            startIcon={
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </svg>
                                </SvgIcon>
                            }
                            disabled={props.global.start || props.global.coordinatesOfNodes.length === 0}
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                marginLeft: 0,
                                marginRight: 0,
                                marginTop: '10px',
                            }}
                            variant="contained"
                        >
                            {' '}
                            Clear Data Points
                        </RedButton>
                    </Grid>
                </Grid>
            </SwipeableDrawer>
        </div>
    );
}

export default connector(Drawer);
