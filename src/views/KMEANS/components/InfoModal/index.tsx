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

import barChartIcon from '../../../../assets/bar_chart-24px.svg';
import { RootState } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';
import PieChartIcon from '../../../../assets/pie-chart.svg';
import ResultIcon from '../../../../assets/result.svg';
import Chart from './components/Chart';
import BlueFab from '../../../../components/BlueFab';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function InfoModal(props: Props): ReactElement {
    const theme = useTheme();
    const xs = !useMediaQuery('(min-width:310px)');
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(0);

    const info = props.kmeans.info;

    if (
        props.kmeans.info === null ||
        (props.kmeans.currentIteration === null && props.kmeans.mode === KMEANSMode.MultipleIteration)
    ) {
        return <div />;
    }

    //To preload the image
    const InfoImage = <img src={barChartIcon} alt="statistics" />;
    const ResultImage = <img src={ResultIcon} alt="statistics" />;

    if (!open) {
        return (
            <Grow in={!open}>
                <div>
                    {' '}
                    <BlueFab
                        disabled={info === null}
                        onClick={() => setOpen((s) => !s)}
                        style={{ position: 'fixed', bottom: sm ? '30vh' : 20, right: 20 }}
                    >
                        {ResultImage}
                    </BlueFab>
                    <Fab
                        disabled={info === null}
                        color="secondary"
                        onClick={() => setOpen((s) => !s)}
                        style={{ position: 'fixed', bottom: sm ? '45vh' : 20, right: 20 }}
                    >
                        {InfoImage}
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
                            right: 20,
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

                        {props.kmeans.mode === KMEANSMode.SingleIteration ? (
                            <Chart iteration={null} variance={info as Variance} />
                        ) : page !== 0 ? (
                            <Chart iteration={page} variance={(info as DetailedInfo).variances[page - 1]}>
                                <Grid alignItems="center" justify="center" container key={3} style={{ width: '100%' }}>
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
                            </Chart>
                        ) : (
                            <Grid
                                container
                                alignItems="center"
                                direction="column"
                                justify="space-around"
                                style={{ width: '100%', height: '100%' }}
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
                        )}
                    </Paper>
                </Swipeable>
            </Grow>
        </div>
    );
}

export default connector(InfoModal);
