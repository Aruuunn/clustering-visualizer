import React, { ReactElement, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Doughnut } from 'react-chartjs-2';

import barChartIcon from '../../../../assets/bar_chart-24px.svg';
import { Fab, useMediaQuery, useTheme, Grow, Paper, Typography, Grid } from '@material-ui/core';
import { RootState } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum'

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function InfoModal(props: Props): ReactElement {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);

    if (props.kmeans.info === null) {
        return <div />;
    }

    const data = {
        datasets: [
            {
                data: props.kmeans.info ? (props.kmeans.info as Variance).variances : [],
                backgroundColor: props.kmeans.info ? (props.kmeans.info as Variance).colors : [],
                borderColor: 'transparent',
            },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: props.kmeans.info ? (props.kmeans.info as Variance).labels : [],
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

    return (
        <div>
            <Fab
                disabled={props.kmeans.info === null}
                color="secondary"
                onClick={() => setOpen((s) => !s)}
                style={{ position: 'fixed', bottom: sm ? 20 : 20, right: 20 }}
            >
                <img src={barChartIcon} />
            </Fab>
            <Grow in={open}>
                <Paper
                    component={Grid}
                    variant="outlined"
                    style={{
                        position: 'fixed',
                        right: 20,
                        top: '70px',
                        minWidth: '300px',
                        height: '70vh',
                        padding: '10px',
                    }}
                >
                    {props.kmeans.mode===KMEANSMode.SingleIteration?
                    <Grid
                        container
                        alignItems="center"
                        direction="column"
                        justify="space-around"
                        style={{ width: '100%', height: '100%' }}
                    >
                        <Typography variant="h6">
                            Total Variance -{' '}
                            {props.kmeans.info !== null ? (props.kmeans.info as Variance).total.toFixed(1) : null}
                        </Typography>

                        <Doughnut width={50} height={50} options={options} data={data} />
                    </Grid>:null}
                </Paper>
            </Grow>
        </div>
    );
}

export default connector(InfoModal);
