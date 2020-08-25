import React, { ReactElement } from 'react';
import { Grid, TableBody, Table, TableCell, TableRow, useMediaQuery } from '@material-ui/core';
import BarChart from '../BarChart';
import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';
import { Mode } from '../../index';
import TabsComponent from '../TabsComponent';

interface Props {
    variance: Variance | null;
    children?: ReactElement | ReactElement[];
    iteration: number | null;
    mode: Mode;
    key?: any;
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
        fontColor: '#d3d3d3',
        fontSize: 14,
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
    );

    return (
        <Grid
            container
            alignItems="flex-start"
            direction="column"
            justify="center"
            style={{ width: '100%', overflow: 'hidden', height: '100%' }}
        >
            {below650px || props.mode === Mode.RESULT ? (
                <TabsComponent mode={props.mode} item1={TableComponent} item2={ChartComponent} />
            ) : (
                [
                    <div key={0} style={{ margin: '10px' }}>
                        {TableComponent}
                    </div>,
                    <div style={{ margin: '10px' }} key={1}>
                        {ChartComponent}
                    </div>,
                ]
            )}
            {children}
        </Grid>
    );
}

export default RenderChart;
