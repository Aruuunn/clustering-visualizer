import React, { ReactElement, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    Fab,
    useMediaQuery,
    Paper,
    Grid,
    IconButton,
    SvgIcon,
    Zoom,
    Typography,
    useTheme,
    CircularProgress,
    Collapse,
} from '@material-ui/core';
import { Swipeable } from 'react-swipeable';
import Pagination from '@material-ui/lab/Pagination';

import { KMEANSAlgorithmActionTypes, RootState, UserPreferencesActionTypes } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';
import PieChartIcon from '../../../../assets/pie-chart.svg';
import RenderChart from './components/RenderChart';
import FloatingActionButtons from './components/FloatingActionButtons';
import Result from './components/Result';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

export enum Mode {
    RESULT,
    INFO,
}

const mapDispatchToProps = {
    setRender: (best: ReactElement[]) => ({ type: KMEANSAlgorithmActionTypes.SET_RENDER, payload: best }),
    setCoordinatesOfFab: (coor: number[]) => ({ type: UserPreferencesActionTypes.SET_FAB_COORDINATES, payload: coor }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function InfoModal(props: Props): ReactElement {
    const theme = useTheme();
    const xs = !useMediaQuery('(min-width:310px)');
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const [open, setOpen] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(true);
    const [mode, setMode] = useState<Mode>(Mode.INFO); //show either result or info
    const [page, setPage] = useState<number>(0);

    const defaultFabCoordiantes = { bottom: sm ? '60vh' : 20, right: 20 };
    const coordiantesOfFab = props.userPreference.coordinatesOfFab
        ? { top: props.userPreference.coordinatesOfFab[1], left: props.userPreference.coordinatesOfFab[0] }
        : defaultFabCoordiantes;

    const info = props.kmeans.info;

    if (
        props.kmeans.info === null ||
        (props.kmeans.currentIteration === null && props.kmeans.mode === KMEANSMode.MultipleIteration)
    ) {
        return <div />;
    }

    if (!open) {
        return (
            <FloatingActionButtons
                coordiantesOfFab={coordiantesOfFab}
                expand={expand}
                setExpand={setExpand}
                info={props.kmeans.info}
                mode={props.kmeans.mode}
                setCoordinatesOfFab={props.setCoordinatesOfFab}
                setOpen={setOpen}
                setMode={setMode}
                start={props.global.start}
            />
        );
    }

    const handleSwipeLeft = (e: any) => {
        if (
            props.kmeans.info &&
            props.kmeans.mode === KMEANSMode.MultipleIteration &&
            page < (props.kmeans.info as DetailedInfo).render.length &&
            mode !== Mode.RESULT
        ) {
            console.log('right swipe');
            setPage((s) => s + 1);
        }
    };

    const handleSwipeRight = (e: any) => {
        if (
            props.kmeans.info &&
            props.kmeans.mode === KMEANSMode.MultipleIteration &&
            page !== 0 &&
            mode !== Mode.RESULT
        ) {
            setPage((s) => s - 1);
        }
    };

    const handleSwipeDown = (e: any) => {
        if (mode !== Mode.RESULT) setOpen(false);
    };

    if (mode === Mode.RESULT) {
        return (
            <Result
                details={props.kmeans.info as DetailedInfo}
                setRender={() =>
                    props.setRender(
                        (props.kmeans.info as DetailedInfo).render[(props.kmeans.info as DetailedInfo).best],
                    )
                }
                onClose={() => setOpen((s) => !s)}
            />
        );
    }

    return (
        <div>
            <Zoom in={open} timeout={100}>
                <Swipeable
                    onSwipedRight={handleSwipeRight}
                    onSwipedLeft={handleSwipeLeft}
                    onSwipedDown={handleSwipeDown}
                    {...{ preventDefaultTouchmoveEvent: true, trackTouch: true }}
                    style={{ height: '100%', width: '100%' }}
                >
                    <Paper
                        component={Grid}
                        variant="outlined"
                        style={{
                            position: 'fixed',
                            right: xs ? 10 : 20,
                            top: '70px',
                            width: xs ? '80vw' : '300px',
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            alignItems="center"
                            style={{ margin: 0, padding: '10px', height: '90vh' }}
                        >
                            <IconButton
                                component={Grid}
                                container
                                onClick={() => setOpen((s) => !s)}
                                justify="center"
                                alignItems="center"
                                style={{
                                    height: 'auto',
                                    width: '100%',
                                    position: 'absolute',
                                    backgroundColor: 'grey',
                                    color: 'white',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    borderRadius: 0,
                                }}
                            >
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                    </svg>
                                </SvgIcon>
                            </IconButton>
                            {mode === Mode.INFO ? (
                                props.kmeans.mode === KMEANSMode.SingleIteration ? (
                                    <RenderChart iteration={null} variance={info as Variance} mode={mode} />
                                ) : page !== 0 ? (
                                    <RenderChart
                                        iteration={page}
                                        variance={(info as DetailedInfo).variances[page - 1]}
                                        mode={mode}
                                    >
                                        <Grid
                                            alignItems="center"
                                            justify="center"
                                            container
                                            key={3}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            {' '}
                                            <Pagination
                                                count={(info as DetailedInfo).render.length}
                                                page={page}
                                                onChange={(_, val) => {
                                                    setPage(val);
                                                }}
                                                color="secondary"
                                            />
                                            {props.global.start === true ? (
                                                <CircularProgress size={20} color="secondary" />
                                            ) : null}
                                        </Grid>
                                    </RenderChart>
                                ) : (
                                    <Grid
                                        container
                                        alignItems="center"
                                        direction="column"
                                        justify="space-around"
                                        style={{
                                            width: '100%',
                                            height: '90vh',
                                        }}
                                    >
                                        <div style={{ paddingTop: '60px' }}>
                                            <Typography
                                                variant="h4"
                                                align="center"
                                                style={{
                                                    width: '100%',
                                                    marginBottom: '20px',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                Statistics
                                            </Typography>
                                            <Typography variant="body1" align="center">
                                                Click the Iteration number to see the statistics for that iteration.
                                            </Typography>
                                        </div>

                                        <img
                                            src={PieChartIcon}
                                            style={{
                                                maxWidth: 150,
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                            alt="stats"
                                        />

                                        <Grid alignItems="center" justify="center" container style={{ width: '100%' }}>
                                            {' '}
                                            <Pagination
                                                count={(info as DetailedInfo).render.length}
                                                page={page}
                                                onChange={(_, val) => {
                                                    setPage(val);
                                                }}
                                                color="secondary"
                                            />
                                            {props.global.start === true ? (
                                                <CircularProgress size={20} color="secondary" />
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                )
                            ) : null}
                        </Grid>
                    </Paper>
                </Swipeable>
            </Zoom>
        </div>
    );
}

export default connector(InfoModal);
