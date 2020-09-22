import React, { useEffect, useState, ReactElement } from 'react';
import Chart from 'chart.js';
import { useTheme } from '@material-ui/core';

import HashTable from '../../../../common/hashtable';

interface Props {
    details: HashTable<number>;
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
        display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Sihouette Score',
                },
            },
        ],
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Clusters',
                },
            },
        ],
    },
};

const LineChart = (props: Props): ReactElement => {
    const { details, ...rest } = props;
    const theme = useTheme();

    const data = {
        labels: Object.keys(details),
        datasets: [
            {
                data: Object.keys(details).map((o) => details[o]),
                borderColor: theme.palette.secondary.main,
                label: 'Silhouette Score',
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
        <div
            {...rest}
            id="wrapper"
            style={{ position: 'relative', height: '40vh', margin: '10px', maxHeight: '500px', width: '100%' }}
        >
            <canvas id="linechart"></canvas>{' '}
        </div>
    );
};

export default LineChart;
