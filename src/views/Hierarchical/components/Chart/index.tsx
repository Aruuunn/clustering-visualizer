import React from 'react';
import { Backdrop, Grid, Paper, Typography, useMediaQuery, SvgIcon, IconButton, Fade } from '@material-ui/core';

import HashTable from '../../../../common/hashtable';
import LineChart from '../LineChart';

interface Props {
    details: HashTable<number> | null;
    onClose: () => void;
}

const Result = (props: Props): React.ReactElement => {
    const { details } = props;
    const sm = useMediaQuery('(max-width:965px)');

    if (!details) {
        return <div />;
    }

    return (
        <Fade in={true}>
            <Backdrop open={true} onClick={() => null} style={{ zIndex: 10000 }}>
                <Paper
                    style={{
                        padding: sm ? '10px' : '25px',
                        overflow: 'auto',
                        position: 'relative',
                    }}
                >
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
                    <div
                        style={{
                            padding: 'auto',
                            height: sm ? '95vh' : '60vh',
                            width: sm ? '95vw' : '70vw',
                            overflow: 'auto',
                        }}
                    >
                        <Typography variant="h5"> Silhouette Score vs Number of clusters</Typography>
                        {details !== null ? <LineChart details={details} /> : null}
                    </div>
                </Paper>
            </Backdrop>
        </Fade>
    );
};

export default Result;
