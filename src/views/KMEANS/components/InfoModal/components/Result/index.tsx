import React from 'react';
import { Backdrop, Grid, Paper, Typography, useMediaQuery, SvgIcon, IconButton, Fade } from '@material-ui/core';

import { DetailedInfo } from '../../../../../../reduxStore/reducers/kmeans.algorithm';
import { Mode } from '../../../InfoModal';
import RenderChart from '../RenderChart';
import LineChart from '../LineChart';
import BlueButton from '../../../../../../components/BlueButton';

interface Props {
    details: DetailedInfo;
    setRender: () => void;
    onClose: () => void;
}

const Result = (props: Props): React.ReactElement => {
    const { details } = props;
    const sm = useMediaQuery('(max-width:965px)');

    return (
        <Fade in={true}>
            <Backdrop open={true} onClick={() => null} style={{ zIndex: 10000 }}>
                <Paper style={{ padding: sm ? '10px' : '25px', overflow: 'auto', position: 'relative' }}>
                    <IconButton
                        style={{ position: 'absolute', top: sm ? 30 : 20, right: sm ? 5 : 20 }}
                        onClick={() => props.onClose()}
                    >
                        <SvgIcon fontSize="small">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="black"
                                width="24"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                    fill="white"
                                />
                            </svg>
                        </SvgIcon>
                    </IconButton>
                    <Grid
                        container
                        justify="center"
                        alignItems="stretch"
                        style={{
                            padding: 'auto',
                            height: sm ? '95vh' : '60vh',
                            width: sm ? '95vw' : '70vw',
                            overflow: 'auto',
                        }}
                    >
                        <Grid
                            container
                            item
                            justify="center"
                            style={{ padding: '10px', overflow: 'auto' }}
                            xs={12}
                            md={6}
                            alignItems="flex-end"
                        >
                            <Grid container item xs={12} style={{ marginBottom: '20px' }}>
                                <Typography variant="h5" style={{ width: '100%', marginTop: '20px' }}>
                                    Clusters with the Best Silhouette Score
                                </Typography>
                                <BlueButton
                                    style={{ marginTop: '20px' }}
                                    onClick={() => {
                                        props.setRender();
                                        props.onClose();
                                    }}
                                >
                                    VIEW
                                </BlueButton>
                            </Grid>
                            <Grid container item xs={12}>
                                <LineChart details={details} />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            justify="center"
                            style={{
                                padding: sm ? 0 : '20px',
                                borderLeft: sm ? 'none' : 'solid #585858 1px',
                                overflow: 'auto',
                            }}
                            xs={12}
                            md={6}
                            alignItems="flex-start"
                        >
                            {' '}
                            <RenderChart
                                mode={Mode.RESULT}
                                iteration={details.best + 1}
                                variance={details.variances[details.best]}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Backdrop>
        </Fade>
    );
};

export default Result;
