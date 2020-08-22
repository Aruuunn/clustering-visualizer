import React, { ReactElement } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Doughnut from '../DoughnutChart';
import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';

interface Props {
    variance: Variance | null;
    children?: ReactElement | ReactElement[];
    iteration: number | null;
}

export const options = {
    legend: {
        display: true,
        labels: {
            fontColor: 'white',
        },
    },
    responsive: true,
    events: [],
    cutoutPercentage: 60,
};

function Chart(props: Props): ReactElement {
    const { variance, children, ...rest } = props;

    const data = {
        datasets: [
            {
                data: (variance ? variance.variances : []) || [],
                backgroundColor: (variance ? variance.colors : []) || [],
                borderColor: 'transparent',
            },
        ],
        labels: (variance ? variance.labels : []) || [],
    };

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            justify="space-around"
            style={{ width: '100%', height: '100%' }}
            {...rest}
        >
            {variance ? (
                <div style={{ paddingTop: '50px' }}>
                    {' '}
                    {props.iteration ? (
                        <Typography style={{ width: '100%' }} variant="body1" align="center">
                            Iteration - {props.iteration}
                        </Typography>
                    ) : null}{' '}
                    <Typography align="center" variant="h6" style={{ marginTop: '10px', width: '100%' }}>
                        {`Total Variance - ${variance.total.toFixed(1)}`}
                    </Typography>
                </div>
            ) : null}
            <Doughnut variance={variance} width={50} height={50} options={options} data={data} />

            {children}
        </Grid>
    );
}

export default Chart;
