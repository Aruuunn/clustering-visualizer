import React, { ReactElement, useState } from 'react';
import { Backdrop, Paper, Grid, useTheme, useMediaQuery } from '@material-ui/core';

import Pages from './Pages';
import { BlueButton, FlatButton } from '../../components';

const Tutorial = (props: { setTutorialComplete: () => void }): ReactElement => {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Backdrop open={true} style={{ zIndex: 10000 }}>
            <Grid
                component={Paper}
                container
                direction="column"
                justify="space-between"
                variant="outlined"
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '600px',
                    height: '100%',
                    padding: '15px',
                    margin: '10px',
                    overflowY: 'auto',
                    position: 'relative',
                    paddingBottom: '50px',
                }}
            >
                <Grid container justify="flex-end" style={{ width: '100%' }}>
                    {page}/8
                </Grid>
                <div style={{ width: '100%', flexGrow: 1 }}>
                    <Pages page={page} />
                </div>

                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    style={{
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingLeft: xs ? 0 : '20px',
                        paddingRight: xs ? 0 : '20px',
                        paddingBottom: xs ? 0 : '5px',
                    }}
                >
                    {page !== 8 ? (
                        <FlatButton
                            variant="contained"
                            style={{ margin: '5px' }}
                            onClick={() => props.setTutorialComplete()}
                        >
                            SKIP
                        </FlatButton>
                    ) : (
                        <div />
                    )}
                    <div>
                        {page !== 1 ? (
                            <FlatButton
                                variant="contained"
                                style={{ margin: '5px' }}
                                onClick={() => setPage((page) => page - 1)}
                            >
                                Previous
                            </FlatButton>
                        ) : null}
                        {page !== 8 ? (
                            <BlueButton
                                style={{ margin: '5px' }}
                                variant="contained"
                                onClick={() => setPage((page) => page + 1)}
                            >
                                Next
                            </BlueButton>
                        ) : null}
                        {page === 8 ? (
                            <BlueButton
                                style={{ margin: '5px' }}
                                variant="contained"
                                onClick={() => props.setTutorialComplete()}
                            >
                                Finish
                            </BlueButton>
                        ) : null}
                    </div>
                </Grid>
            </Grid>
        </Backdrop>
    );
};

export default Tutorial;
