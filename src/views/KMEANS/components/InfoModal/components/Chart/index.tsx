import React, { ReactElement } from 'react';
import {
    Typography,
    Grid,
    TableContainer,
    TableBody,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableRow,
} from '@material-ui/core';
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
    const { variance, children } = props;

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
            style={{ width: '100%', height: '100%', overflow: 'hidden', paddingTop: '50px' }}
        >
            {/* {variance ? (
                <div style={{ paddingTop: '50px' }}>
                    {' '}
                    {props.iteration ? (
                        <Typography style={{ width: '100%' }} variant="body1" align="center">
                            Iteration - {props.iteration}
                        </Typography>
                    ) : null}{' '}
                    <Typography align="left" variant="h6" style={{ marginTop: '10px', width: '100%' }}>
                        Total within-Cluster Variance : <b>{variance.total.toFixed(1)}</b>
                    </Typography>
                    <Typography align="left" variant="h6" style={{ marginTop: '20px', width: '100%' }}>
                        Silhouette Score : <b>{variance.silhouetteScore.toFixed(2)}</b>
                    </Typography>
                </div>
            ) : null} */}
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableBody>
                        {props.iteration ? (
                            <TableRow>
                                <TableCell align="left">
                                    <strong>Iteration</strong>
                                </TableCell>
                                <TableCell align="left">{props.iteration}</TableCell>
                            </TableRow>
                        ) : null}
                        {variance ? (
                            <TableRow>
                                <TableCell align="left">
                                    <strong>Total within-Cluster Variance</strong>
                                </TableCell>
                                <TableCell align="left">{variance.total.toFixed(1)}</TableCell>
                            </TableRow>
                        ) : null}
                        {variance ? (
                            <TableRow>
                                <TableCell align="left">
                                    <strong>Silhouette Score</strong>
                                </TableCell>
                                <TableCell align="left">{variance.silhouetteScore.toFixed(2)}</TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Doughnut variance={variance} width={5} height={5} options={options} data={data} />
            {children}
        </Grid>
    );
}

export default Chart;
