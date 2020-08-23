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
    Divider,
} from '@material-ui/core';
import { Swipeable } from 'react-swipeable';
import Pagination from '@material-ui/lab/Pagination';
import Scrollbars from 'react-scrollbars-custom';

import { KMEANSAlgorithmActionTypes, RootState } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';
import PieChartIcon from '../../../../assets/pie-chart.svg';
import RenderChart from './components/RenderChart';
import BlueFab from '../../../../components/BlueFab';
import LineChart from './components/LineChart';
import BlueButton from '../../../../components/BlueButton';

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
                {props.kmeans.mode === KMEANSMode.SingleIteration ? (
                    <Fab
                        disabled={info === null}
                        color="secondary"
                        onClick={() => {
                            setOpen((s) => !s);
                            setMode(Mode.INFO);
                        }}
                        style={{
                            margin: '10px',
                            position: 'fixed',
                            bottom: sm ? '60vh' : 20,
                            right: 20,
                        }}
                    >
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
                            </svg>
                        </SvgIcon>
                    </Fab>
                ) : (
                    <div>
                        {expand ? (
                            <Grid
                                container
                                direction="column"
                                justify="space-between"
                                alignItems="center"
                                style={{
                                    position: 'fixed',
                                    bottom: sm ? '60vh' : 20,
                                    right: 20,
                                    width: 'auto',
                                }}
                            >
                                {props.kmeans.info !== null &&
                                props.global.start === false &&
                                props.kmeans.mode === KMEANSMode.MultipleIteration ? (
                                    <Grow in={true}>
                                        <BlueFab
                                            disabled={info === null}
                                            onClick={() => {
                                                setOpen((s) => !s);
                                                setMode(Mode.RESULT);
                                            }}
                                            style={{ margin: '10px' }}
                                        >
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                >
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                                </svg>
                                            </SvgIcon>
                                        </BlueFab>
                                    </Grow>
                                ) : null}
                                <Grow in={true}>
                                    <div>
                                        <Fab
                                            disabled={info === null}
                                            color="secondary"
                                            onClick={() => {
                                                setOpen((s) => !s);
                                                setMode(Mode.INFO);
                                            }}
                                            style={{ margin: '10px' }}
                                        >
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                >
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
                                                </svg>
                                            </SvgIcon>
                                        </Fab>
                                    </div>
                                </Grow>

                                <SvgIcon style={{ margin: '10px' }} fontSize="large" onClick={() => setExpand(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                        width="24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                            fill="white"
                                        />
                                    </svg>
                                </SvgIcon>
                            </Grid>
                        ) : (
                            <Grid
                                container
                                direction="column"
                                justify="space-between"
                                alignItems="center"
                                style={{
                                    position: 'fixed',
                                    bottom: sm ? '60vh' : 20,
                                    right: 20,
                                    width: 'auto',
                                }}
                            >
                                <Fab color="secondary" onClick={() => setExpand(true)}>
                                    <SvgIcon fontSize="large">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    </SvgIcon>
                                </Fab>
                            </Grid>
                        )}
                    </div>
                )}
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
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <Scrollbars
                            style={{
                                height: '90vh',
                                width: '100%',
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
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

                                            <Grid
                                                alignItems="center"
                                                justify="center"
                                                container
                                                style={{ width: '100%' }}
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
                                        </Grid>
                                    )
                                ) : (
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <Typography variant="h6" style={{ paddingTop: '60px', paddingBottom: '20px' }}>
                                            Clusters with The Best Silhouette Score
                                        </Typography>
                                        <Grid
                                            container
                                            justify="center"
                                            style={{ marginTop: '30px', marginBottom: '30px', width: '100%' }}
                                        >
                                            <BlueButton
                                                variant="contained"
                                                style={{ width: '100%' }}
                                                onClick={() =>
                                                    props.setRender(
                                                        (props.kmeans.info as DetailedInfo).render[
                                                            (props.kmeans.info as DetailedInfo).best
                                                        ],
                                                    )
                                                }
                                            >
                                                View the best result
                                            </BlueButton>
                                        </Grid>
                                        <Divider />
                                        <LineChart details={props.kmeans.info as DetailedInfo} />

                                        <RenderChart
                                            mode={mode}
                                            iteration={(props.kmeans.info as DetailedInfo).best + 1}
                                            variance={
                                                (props.kmeans.info as DetailedInfo).variances[
                                                    (props.kmeans.info as DetailedInfo).best
                                                ]
                                            }
                                        />
                                    </div>
                                )}
                            </Grid>
                        </Scrollbars>
                    </Paper>
                </Swipeable>
            </Grow>
        </div>
    );
}

export default connector(InfoModal);
