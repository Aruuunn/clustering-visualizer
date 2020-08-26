import React, { ReactElement, useState } from 'react';
import { Backdrop, Paper, Grid } from '@material-ui/core';

import Pages from './Pages';
import { BlueButton, FlatButton } from '../../components';

const Tutorial = (props: { setTutorialComplete: () => void }): ReactElement => {
    const [page, setPage] = useState(1);

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
                }}
            >
                <Grid container justify="flex-end">
                    {page}/8
                </Grid>
                <div style={{ width: '100%', flexGrow: 1 }}>
                    <Pages page={page} />
                </div>

                <Grid container justify="space-between" alignItems="center" style={{ width: '100%' }}>
                    {page !== 8 ? (
                        <FlatButton
                            variant="contained"
                            style={{ margin: '10px' }}
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
                                style={{ margin: '10px' }}
                                onClick={() => setPage((page) => page - 1)}
                            >
                                Previous
                            </FlatButton>
                        ) : null}
                        {page !== 8 ? (
                            <BlueButton variant="contained" onClick={() => setPage((page) => page + 1)}>
                                Next
                            </BlueButton>
                        ) : null}
                        {page === 8 ? (
                            <BlueButton variant="contained" onClick={() => props.setTutorialComplete()}>
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
