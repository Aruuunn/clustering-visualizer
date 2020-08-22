import React, { ReactElement } from 'react';
import { Grid, Tooltip, withStyles } from '@material-ui/core';

interface Props {
    data?: number[];
    colors?: string[];
    height?: number;
    labels?: string[];
}

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    arrow: {
        color: theme.palette.common.white,
    },
}))(Tooltip);

const LinearDistributionChart = (props: Props): ReactElement => {
    if (!props.colors || !props.data) {
        return <div />;
    }

    return (
        <Grid container style={{ height: props.height || 20, width: '100%', borderRadius: 10 }}>
            {props.data.map((o, i) => (
                <LightTooltip
                    placement="top"
                    arrow
                    title={`${props.labels ? props.labels[i] : ''}  ${(o * 100).toFixed(1)}%`}
                    key={i}
                >
                    <div
                        style={{
                            width: `${o * 100}%`,
                            height: props.height || 20,
                            backgroundColor: props.colors ? props.colors[i] : 'black',
                            borderColor: props.colors ? props.colors[i] : 'black',
                        }}
                    ></div>
                </LightTooltip>
            ))}
        </Grid>
    );
};

export default LinearDistributionChart;
