import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface Props {
    data: number[];
    colors: string[];
    height?: number;
}

const LinearDistributionChart = (props: Props): ReactElement => {
    return (
        <Grid container style={{ height: props.height || 20, width: '100%', borderRadius: 10 }}>
            {props.data.map((o, i) => (
                <div
                    key={i}
                    style={{ width: `${o * 100}%`, height: props.height || 20, backgroundColor: props.colors[i] }}
                ></div>
            ))}
        </Grid>
    );
};

export default LinearDistributionChart;
