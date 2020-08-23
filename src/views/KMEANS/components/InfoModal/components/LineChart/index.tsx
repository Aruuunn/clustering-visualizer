import React, { useEffect, useState, ReactElement } from 'react';
import Chart from 'chart.js';
import { useTheme } from '@material-ui/core';

import { DetailedInfo } from '../../../../../../reduxStore/reducers/kmeans.algorithm';

interface Props {
    details: DetailedInfo;
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
        text: 'Silhouette Score vs Iteration',
        fontColor: '#ffff',
    },
    responsive: true,
    maintainAspectRatio: false,
};

const LineChart = (props: Props): ReactElement => {
    const { details } = props;
    const theme = useTheme();

    const data = {
        labels: details.variances.map((o, i) => i + 1),
        datasets: [
            {
                data: details.variances.map((o) => parseInt(o.silhouetteScore.toFixed(2))),
                borderColor: theme.palette.secondary.main,
                label: 'Silhouette Score vs Iteration',
                fill: false,
            },
        ],
    };
    Chart.defaults.global.defaultFontColor = '#D3D3D3';
    const [chart, setChart] = useState<Chart | null>(null);

    useEffect(() => {
        const ele = document.getElementById('linechart') as HTMLCanvasElement;
        if (!ele) {
            return;
        }

        const ctx = ele.getContext('2d');
        if (ctx) {
            if (!chart) {
                const newChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options,
                });
                setChart(newChart);
            } else {
                chart.data = data;
                chart.update();
            }
        }
    }, [props.details]);

    return (
        <div id="wrapper" style={{ position: 'relative', height: '40vh' }}>
            <canvas id="linechart"></canvas>{' '}
        </div>
    );
};

export default LineChart;
