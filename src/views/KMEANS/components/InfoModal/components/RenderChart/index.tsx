import React, { ReactElement } from 'react';
import { Grid, TableContainer, TableBody, Paper, Table, TableCell, TableRow, useMediaQuery } from '@material-ui/core';
import BarChart from '../BarChart';
import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';
//import LinearDistributionChart from '../../../../../../components/LinearDistributionChart';

import TabsComponent from '../TabsComponent';

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

function RenderChart(props: Props): ReactElement {
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

    const below650px = useMediaQuery('(max-height:660px)');

    const ChartComponent: ReactElement = (
        <BarChart variance={variance} width={5} height={5} options={options} data={data} />
    );

    const TableComponent = (
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
    );

    return (
        <Grid
            container
            alignItems="flex-start"
            direction="column"
            justify="space-around"
            style={{ width: '100%', height: '100%', overflow: 'hidden', paddingTop: '50px' }}
        >
            {below650px ? (
                <TabsComponent item1={TableComponent} item2={ChartComponent} />
            ) : (
                [<div key={0}>{TableComponent}</div>, <div key={1}>{ChartComponent}</div>]
            )}
            {children}
        </Grid>
    );
}

export default RenderChart;
