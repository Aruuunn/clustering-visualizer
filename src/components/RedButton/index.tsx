import React, { ReactElement } from 'react';
import { Button, withStyles, useMediaQuery, ButtonProps } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

export const RedButton = withStyles((theme) => ({
    root: {
        backgroundColor: red[500],
        color: 'white',
        '&:hover': {
            backgroundColor: red[300],
        },
        '&:active': {
            backgroundColor: red[300],
        },
    },
}))(Button);

export const RedButtonComponent = (props: ButtonProps): ReactElement => {
    const lg = useMediaQuery('(min-width:1380px)');

    return <RedButton {...{ ...props, size: lg ? 'medium' : 'small', variant: 'contained' }} />;
};

export default RedButtonComponent;
