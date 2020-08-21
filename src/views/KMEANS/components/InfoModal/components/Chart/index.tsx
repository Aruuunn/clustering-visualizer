import React, { ReactElement } from 'react'
import {  Typography, Grid } from '@material-ui/core';
import {  Doughnut  } from 'react-chartjs-2';


import KMEANSMode from '../../../../../../common/kmeans.mode.enum';
import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';


interface Props {
  variance:Variance; 
  mode:KMEANSMode;
  children?:ReactElement;
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

    const { variance , mode ,children ,...rest } = props;

    const data = { 
        datasets: [
            {
                data:variance.variances || [],
                backgroundColor:variance.colors || [],
                borderColor: 'transparent' || [],
            },
        ],
        labels:variance.labels || [],
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
        <Typography variant="h6" style={{ paddingTop: '50px' }}>
            Total Variance - {variance.total.toFixed(1)}
        </Typography>

        <Doughnut width={50} height={50} options={options} data={data} />
        {children}
        </Grid>
    )
}

export default Chart;
