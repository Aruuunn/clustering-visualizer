import React, { ReactElement, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    Fab,
    useMediaQuery,
    Paper,
    Grid,
    IconButton,
    SvgIcon,
    Grow,
    Typography,
    useTheme,
    CircularProgress,
} from '@material-ui/core';
import { Swipeable } from 'react-swipeable';
import Pagination from '@material-ui/lab/Pagination';

import { RootState } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';
import PieChartIcon from '../../../../assets/pie-chart.svg';
import RenderChart from './components/RenderChart';
import BlueFab from '../../../../components/BlueFab';
import LineChart from './components/LineChart';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

export enum Mode {
    RESULT,
    INFO,
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function InfoModal(props: Props): ReactElement {
    const theme = useTheme();
    const xs = !useMediaQuery('(min-width:310px)');
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const [open, setOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<Mode>(Mode.INFO); //show either result or info

    const [page, setPage] = useState<number>(0);

    const info = props.kmeans.info;

    if (
        props.kmeans.info === null ||
        (props.kmeans.currentIteration === null && props.kmeans.mode === KMEANSMode.MultipleIteration)
    ) {
        return <div />;
    }

    //To preload the image

    if (!open) {
        return (
            <Grow in={!open}>
                <div>
                    {' '}
                    {props.kmeans.info !== null && props.global.start === false ? (
                        <BlueFab
                            disabled={info === null}
                            onClick={() => {
                                setOpen((s) => !s);
                                setMode(Mode.RESULT);
                            }}
                            style={{ position: 'fixed', bottom: sm ? '30vh' : 20, right: 20 }}
                        >
                            <SvgIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
                                        fill="white"
                                    />
                                </svg>
                            </SvgIcon>
                        </BlueFab>
                    ) : null}
                    <Fab
                        disabled={info === null}
                        color="secondary"
                        onClick={() => {
                            setOpen((s) => !s);
                            setMode(Mode.INFO);
                        }}
                        style={{ position: 'fixed', bottom: sm ? '45vh' : 20, right: 20 }}
                    >
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
                            </svg>
                        </SvgIcon>
                    </Fab>
                </div>
            </Grow>
        );
    }

    const handleSwipeLeft = (e: any) => {
        if (
            props.kmeans.info &&
            props.kmeans.mode === KMEANSMode.MultipleIteration &&
            page < (props.kmeans.info as DetailedInfo).render.length
        ) {
            console.log('right swipe');
            setPage((s) => s + 1);
        }
    };

    const handleSwipeRight = (e: any) => {
        if (props.kmeans.info && props.kmeans.mode === KMEANSMode.MultipleIteration && page !== 0) {
            setPage((s) => s - 1);
        }
    };

    const handleSwipeDown = (e: any) => {
        setOpen(false);
    };

    return (
        <div>
            <Grow in={open} timeout={100}>
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
                            height: '80vh',
                            padding: '10px',
                            overflow: 'auto',
                        }}
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
                                    style={{ width: '100%', height: '100%', overflow: 'auto' }}
                                >
                                    <div style={{ paddingTop: '60px' }}>
                                        <Typography
                                            variant="h4"
                                            align="center"
                                            style={{ width: '100%', marginBottom: '20px', fontWeight: 'bolder' }}
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
                        ) : (
                            <div>
                                <Typography variant="h6" style={{ paddingTop: '60px' }}>
                                    Clusters with Best Silhouette Score
                                </Typography>
                                <RenderChart
                                    mode={mode}
                                    iteration={(props.kmeans.info as DetailedInfo).best + 1}
                                    variance={
                                        (props.kmeans.info as DetailedInfo).variances[
                                            (props.kmeans.info as DetailedInfo).best
                                        ]
                                    }
                                />
                                <LineChart details={props.kmeans.info as DetailedInfo} />
                            </div>
                        )}
                    </Paper>
                </Swipeable>
            </Grow>
        </div>
    );
}

export default connector(InfoModal);
