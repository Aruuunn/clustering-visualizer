import React, { ReactElement, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Fab, useMediaQuery, Paper, Grid, IconButton, SvgIcon, Grow, Typography, useTheme } from '@material-ui/core';
import { Swipeable } from 'react-swipeable';
import Pagination from '@material-ui/lab/Pagination';

import barChartIcon from '../../../../assets/bar_chart-24px.svg';
import { RootState } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';
import PieChartIcon from '../../../../assets/pie-chart.svg';
import Chart from './components/Chart';

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

    const below650px = !useMediaQuery('(min-height:620px)');

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(0);

    const info = props.kmeans.info;

    if (!open) {
        return (
            <Grow in={!open}>
                <Fab
                    disabled={info === null}
                    color="secondary"
                    onClick={() => setOpen((s) => !s)}
                    style={{ position: 'fixed', bottom: sm ? '45vh' : 20, right: 20 }}
                >
                    <img src={barChartIcon} alt="statistics" />
                </Fab>
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
                        <Swipeable
                            style={{ height: '100%', width: '100%' }}
                            onSwipedRight={handleSwipeRight}
                            onSwipedLeft={handleSwipeLeft}
                            onSwipedDown={handleSwipeDown}
                            {...{ preventDefaultTouchmoveEvent: true, trackTouch: true }}
                        >
                            <Chart variance={info as Variance} />
                        </Swipeable>
                    ) : page !== 0 ? (
                        <Swipeable
                            onSwipedRight={handleSwipeRight}
                            onSwipedLeft={handleSwipeLeft}
                            onSwipedDown={handleSwipeDown}
                            {...{ preventDefaultTouchmoveEvent: true, trackTouch: true }}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <Chart variance={(info as DetailedInfo).variances[page - 1]}>
                                <Pagination
                                    style={{ position: 'absolute', bottom: '10px' }}
                                    count={(info as DetailedInfo).render.length || 0}
                                    page={page}
                                    onChange={(_, val) => {
                                        setPage(val);
                                    }}
                                    color="secondary"
                                />
                            </Chart>
                        </Swipeable>
                    ) : (
                        <Swipeable
                            onSwipedRight={handleSwipeRight}
                            onSwipedLeft={handleSwipeLeft}
                            onSwipedDown={handleSwipeDown}
                            {...{ preventDefaultTouchmoveEvent: true, trackTouch: true }}
                            style={{ height: '100%', width: '100%' }}
                        >
                            {' '}
                            <Chart variance={null}>
                                {[
                                    <div key={0} style={{ padding: '10px', position: 'absolute', top: '80px' }}>
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
                                    </div>,
                                    <img
                                        src={PieChartIcon}
                                        style={{
                                            maxWidth: 150,
                                            width: '100%',
                                            height: 'auto',
                                            position: below650px ? 'absolute' : 'relative',
                                            top: '-50px',
                                            visibility: below650px ? 'hidden' : 'visible',
                                        }}
                                        key={1}
                                        alt="stats"
                                    />,
                                    <Pagination
                                        style={{ position: 'absolute', bottom: '10px' }}
                                        key={3}
                                        count={(info as DetailedInfo).render.length}
                                        page={page}
                                        onChange={(_, val) => {
                                            setPage(val);
                                        }}
                                        color="secondary"
                                    />,
                                ]}
                            </Chart>
                        </Swipeable>
                    )}
                </Paper>
            </Grow>
        </div>
    );
}

export default connector(InfoModal);
