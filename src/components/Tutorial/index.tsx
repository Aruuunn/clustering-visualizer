import React, { ReactElement, useState } from 'react';
import { Dialog, DialogActions, Grid } from '@material-ui/core';

import Pages from './Pages';

import { BlueButton, FlatButton } from '../../components';

const Tutorial = (props: { setTutorialComplete: () => void }): ReactElement => {
    const [page, setPage] = useState(1);

    const MAX_PAGES = 10;

    return (
        <Dialog
            open={true}
            style={{ zIndex: 10000, backgroundColor: 'rgba(0,0,0,0.7)' }}
            scroll={'paper'}
            onClose={() => null}
        >
            <Grid container justify="flex-end" style={{ padding: '10px' }}>
                {page}/{MAX_PAGES}
            </Grid>
            {Pages({ page })}

            <DialogActions>
                {page !== MAX_PAGES ? (
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
                    {page !== MAX_PAGES ? (
                        <BlueButton
                            style={{ margin: '5px' }}
                            autoFocus
                            variant="contained"
                            onClick={() => setPage((page) => page + 1)}
                        >
                            Next
                        </BlueButton>
                    ) : null}
                    {page === MAX_PAGES ? (
                        <BlueButton
                            autoFocus
                            style={{ margin: '5px' }}
                            variant="contained"
                            onClick={() => props.setTutorialComplete()}
                        >
                            Finish
                        </BlueButton>
                    ) : null}
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default Tutorial;
