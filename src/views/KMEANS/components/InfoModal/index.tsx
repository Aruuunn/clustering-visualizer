import React, { ReactElement, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Fab, useMediaQuery, Paper, Typography, Grid, IconButton, SvgIcon, Grow } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import barChartIcon from '../../../../assets/bar_chart-24px.svg';
import { RootState } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function InfoModal(props: Props): ReactElement {
    const xs = !useMediaQuery('(min-width:310px)');

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(1);

    const info = props.kmeans.info;
    if (
        info === null ||
        (props.kmeans.currentIteration === null && props.kmeans.mode === KMEANSMode.MultipleIteration)
    ) {
        return <div />;
    }

    if (!open) {
        return (
            <Grow in={!open}>
                <Fab
                    disabled={info === null}
                    color="secondary"
                    onClick={() => setOpen((s) => !s)}
                    style={{ position: 'fixed', bottom: 20, right: 20 }}
                >
                    <img src={barChartIcon} />
                </Fab>
            </Grow>
        );
    }

    const data = {
        datasets: [
            {
                data:
                    props.kmeans.mode === KMEANSMode.SingleIteration
                        ? (info as Variance).variances
                        : (info as DetailedInfo).variances[page - 1].variances || [],
                backgroundColor:
                    props.kmeans.mode === KMEANSMode.SingleIteration
                        ? (info as Variance).colors
                        : (info as DetailedInfo).variances[page - 1].colors || [],
                borderColor: 'transparent',
            },
        ],
        labels:
            props.kmeans.mode === KMEANSMode.SingleIteration
                ? (info as Variance).labels
                : (info as DetailedInfo).variances[page - 1].labels || [],
    };

    const options = {
        legend: {
            display: true,
            labels: {
                fontColor: 'white',
            },
        },
        responsive: true,
    };

    console.log(page,'INFO', info,{data});

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
                        <Grid
                            container
                            alignItems="center"
                            direction="column"
                            justify="space-around"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Typography variant="h6" style={{ paddingTop: '50px' }}>
                                Total Variance - {info !== null ? (info as Variance).total.toFixed(1) : null}
                            </Typography>

                            <Doughnut width={50} height={50} options={options} data={data} />
                        </Grid>
                    ) : (
                        <Grid
                            container
                            alignItems="center"
                            direction="column"
                            justify="space-around"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Typography variant="h6" style={{ paddingTop: '50px' }}>
                                Total Variance -{' '}
                                {info !== null ? (info as DetailedInfo).variances[page - 1].total.toFixed(1) : null}
                            </Typography>

                            <Doughnut width={50} height={50} options={options} data={data} />
                            <Pagination
                                defaultPage={page}
                                count={(info as DetailedInfo).render.length || 0}
                                page={page}
                                onChange={(e, val) => {
                                    e.persist();
                                    setPage(val);
                                }}
                                color="secondary"
                            />
                        </Grid>
                    )}
                </Paper>
            </Grow>
        </div>
    );
}

export default connector(InfoModal);
