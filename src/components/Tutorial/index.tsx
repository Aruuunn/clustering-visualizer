import React, { ReactElement, useState } from 'react';
import { Dialog, DialogActions, useTheme, useMediaQuery } from '@material-ui/core';

import Pages from './Pages';

import { BlueButton, FlatButton } from '../../components';

const Tutorial = (props: { setTutorialComplete: () => void }): ReactElement => {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            open={true}
            style={{ zIndex: 10000, backgroundColor: 'rgba(0,0,0,0.7)' }}
            scroll={'paper'}
            onClose={() => null}
        >
            {Pages({ page })}

            <DialogActions>
                {page !== 9 ? (
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
                    {page !== 9 ? (
                        <BlueButton
                            style={{ margin: '5px' }}
                            autoFocus
                            variant="contained"
                            onClick={() => setPage((page) => page + 1)}
                        >
                            Next
                        </BlueButton>
                    ) : null}
                    {page === 9 ? (
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
