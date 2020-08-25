import React, { ReactElement, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    useMediaQuery,
    Paper,
    Grid,
    IconButton,
    SvgIcon,
    Zoom,
    Typography,
    useTheme,
    CircularProgress,
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
    const xs = !useMediaQuery('(min-width:330px)');
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

    const handleSwipeLeft = () => {
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

    const handleSwipeRight = () => {
        if (
            props.kmeans.info &&
            props.kmeans.mode === KMEANSMode.MultipleIteration &&
            page !== 0 &&
            mode !== Mode.RESULT
        ) {
            setPage((s) => s - 1);
        }
    };

    const handleSwipeDown = () => {
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
            <Zoom in={open}>
                <Swipeable
                    onSwipedRight={() => handleSwipeRight()}
                    onSwipedLeft={() => handleSwipeLeft()}
                    onSwipedDown={() => handleSwipeDown()}
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
                            width: xs ? '90vw' : '300px',
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            alignItems="center"
                            style={{ margin: 0, padding: '10px', height: '85vh' }}
                        >
                            <IconButton
                                style={{ position: 'absolute', top: 7, right: 7 }}
                                onClick={() => setOpen((s) => !s)}
                            >
                                <SvgIcon fontSize="small">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="black"
                                        width="24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                            fill="white"
                                        />
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
                                                Click the Iteration number <em>below</em> to see the statistics for that
                                                iteration.
                                            </Typography>
                                        </div>

                                        <SvgIcon
                                            style={{
                                                maxWidth: 150,
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001">
                                                <path
                                                    d="M502.691 237.592H369.557c-4.273 0-7.971-2.941-8.962-7.098-9.34-39.149-40.285-69.997-79.487-79.198-4.173-.98-7.132-4.684-7.132-8.97V9.242c0-5.496 4.775-9.748 10.24-9.17 58.153 6.163 112.04 31.784 153.981 73.714 41.822 41.833 67.426 95.566 73.663 153.553.587 5.47-3.668 10.253-9.169 10.253z"
                                                    fill="#fff"
                                                />
                                                <path
                                                    d="M273.976 142.327v-27.398c64.094 7.919 114.929 58.629 123.045 122.665h-27.463c-4.273 0-7.971-2.941-8.962-7.098-9.34-39.149-40.285-69.997-79.487-79.198-4.174-.98-7.133-4.685-7.133-8.971z"
                                                    fill="#fff"
                                                />
                                                <path
                                                    d="M511.949 282.405c-5.128 49.126-24.143 95.221-55.135 133.648-3.454 4.281-9.844 4.657-13.733.767l-74.535-74.535-19.612-19.612c-3.035-3.035-3.549-7.747-1.294-11.399a106.135 106.135 0 0013.134-31.921c.968-4.194 4.678-7.177 8.982-7.177H502.78c5.491-.001 9.74 4.767 9.169 10.229z"
                                                    fill="gray"
                                                />
                                                <path
                                                    d="M397.192 272.175c-3.055 26.225-13.269 50.26-28.646 70.11l-19.612-19.612c-3.035-3.035-3.549-7.747-1.294-11.399a106.135 106.135 0 0013.134-31.921c.968-4.194 4.678-7.177 8.982-7.177h27.436z"
                                                    fill="gray"
                                                />
                                                <path
                                                    d="M418.671 441.32c3.884 3.884 3.517 10.261-.75 13.718-45.519 36.882-101.83 56.943-161.237 56.943-68.554 0-133.015-26.709-181.501-75.182C26.971 388.588.302 324.58.002 256.46c-.301-68.411 26.807-134.3 75.182-182.674C117.118 31.852 171.012 6.231 229.173.072c5.457-.577 10.219 3.686 10.219 9.173v133.082c0 4.294-2.971 7.994-7.152 8.976-47.164 11.08-82.383 53.492-82.383 103.996 0 58.894 47.92 106.825 106.825 106.825 20.711 0 40.058-5.931 56.447-16.173 3.655-2.284 8.392-1.778 11.439 1.269l94.103 94.1z"
                                                    fill="#ffbf00"
                                                />
                                                <path
                                                    d="M324.571 347.22l19.653 19.653c-24.131 19.06-54.632 30.448-87.785 30.455-78.517.017-141.564-62.84-141.772-141.356-.194-72.693 54.342-132.695 124.728-141.113v27.467c0 4.294-2.971 7.994-7.151 8.976-47.164 11.08-82.383 53.492-82.383 103.996 0 58.894 47.92 106.825 106.825 106.825 20.711 0 40.058-5.931 56.447-16.173 3.654-2.283 8.39-1.777 11.438 1.27z"
                                                    fill="#ffbf00"
                                                />
                                            </svg>
                                        </SvgIcon>

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
