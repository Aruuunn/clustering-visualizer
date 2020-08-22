import React, { ReactElement, useEffect } from 'react';
import Chart from 'chart.js';
import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';

interface Props {
    data: Chart.ChartData;
    options: Chart.ChartOptions;
    width: number;
    height: number;
    variance: Variance | null;
}

function DoughnutChart(props: Props): ReactElement {
    const { data, options } = props;

    useEffect(() => {
        const ele = document.getElementById('myChart') as HTMLCanvasElement;
        if (!ele) {
            return;
        }

        const ctx = ele.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options,
            });
        }
    }, [props.variance]);

    return <canvas id="myChart" width={props.width} height={props.height}></canvas>;
}

export default DoughnutChart;
