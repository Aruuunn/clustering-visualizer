import React, { ReactElement } from 'react';
import { Grid, TableContainer, TableBody, Paper, Table, TableCell, TableRow, useMediaQuery } from '@material-ui/core';
import BarChart from '../BarChart';
import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';
import LinearDistributionChart from '../../../../../../components/LinearDistributionChart';

interface Props {
    variance: Variance | null;
    children?: ReactElement | ReactElement[];
    iteration: number | null;
}

export const options = {
    legend: {
        display: false,
        labels: {
            fontColor: 'white',
        },
    },
    title: {
        display: true,
        text: 'Variance Distribution',
        fontColor: '#ffff',
    },
    responsive: true,
    maintainAspectRatio: false,
};

function ChartComponent(props: Props): ReactElement {
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

    const below705px = useMediaQuery('(max-height:200)');

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            justify="space-around"
            style={{ width: '100%', height: '100%', overflow: 'hidden', paddingTop: '50px' }}
        >
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
            {!below705px ? (
                <BarChart variance={variance} width={5} height={5} options={options} data={data} />
            ) : (
                <LinearDistributionChart
                    height={10}
                    data={variance?.variances.map((o) => o / variance.total)}
                    colors={variance?.colors}
                    labels={variance?.labels}
                />
            )}
            {children}
        </Grid>
    );
}

export default ChartComponent;
