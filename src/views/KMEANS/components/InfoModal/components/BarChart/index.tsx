import React, { ReactElement, useEffect, useState } from 'react';
import Chart from 'chart.js';

import { Variance } from '../../../../../../reduxStore/reducers/kmeans.algorithm';

interface Props {
    data: Chart.ChartData;
    options: Chart.ChartOptions;
    width: number;
    height: number;
    variance: Variance | null;
}

function BarChart(props: Props): ReactElement {
    const { data, options } = props;
    Chart.defaults.global.defaultFontColor = '#D3D3D3';
    const [chart, setChart] = useState<Chart | null>(null);

    useEffect(() => {
        const ele = document.getElementById('myChart') as HTMLCanvasElement;
        if (!ele) {
            return;
        }

        const ctx = ele.getContext('2d');
        if (ctx) {
            if (!chart) {
                const newChart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: options,
                });
                setChart(newChart);
            } else {
                chart.data = data;
                chart.update();
            }
        }
    }, [props.variance]);

    return (
        <div id="wrapper" style={{ position: 'relative', height: '30vh' }}>
            <canvas id="myChart"></canvas>{' '}
        </div>
    );
}

export default BarChart;
