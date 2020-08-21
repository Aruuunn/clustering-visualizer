import React, { ReactElement } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';

interface Props {
    variance: Variance | null;
    children?: ReactElement | ReactElement[];
}

export const options = {
    legend: {
        display: true,
        labels: {
            fontColor: 'white',
        },
    },
    responsive: true,
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
                <Typography align="center" variant="h6" style={{ paddingTop: '50px', width: '100%' }}>
                    {`Total Variance - ${variance.total.toFixed(1)}`}
                </Typography>
            ) : null}
            <Doughnut width={50} height={50} options={options} data={data} />

            {children}
        </Grid>
    );
}

export default Chart;
