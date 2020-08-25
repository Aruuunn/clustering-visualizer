import React, { ReactElement, useState } from 'react';
import { Backdrop, Paper, Grid, Button } from '@material-ui/core';

import Pages from './pages';
import { BlueButton, FlatButton } from '../../components';

const Tutorial = (): ReactElement => {
    const [page, setPage] = useState(2);

    return (
        <Backdrop open={true}>
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
                    {page}/5
                </Grid>
                <div style={{ width: '100%', flexGrow: 1 }}>
                    <Pages page={page} />
                </div>

                <Grid container justify="space-between" style={{ width: '100%' }}>
                    <FlatButton variant="contained" style={{ margin: '10px' }}>
                        SKIP
                    </FlatButton>
                    <div>
                        <FlatButton
                            variant="contained"
                            style={{ margin: '10px' }}
                            onClick={() => setPage((page) => page - 1)}
                        >
                            Previous
                        </FlatButton>
                        <BlueButton variant="contained" onClick={() => setPage((page) => page + 1)}>
                            Next
                        </BlueButton>
                    </div>
                </Grid>
            </Grid>
        </Backdrop>
    );
};

export default Tutorial;
