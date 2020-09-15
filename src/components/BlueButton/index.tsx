import React, { ReactElement } from 'react';
import { Button, withStyles, useMediaQuery, ButtonProps } from '@material-ui/core';

export const BlueButton = withStyles({
    root: {
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
            backgroundColor: '#4791db',
        },
        '&:active': {
            backgroundColor: '#4791db',
        },
    },
})(Button);

export const BlueButtonComponent = (props: ButtonProps): ReactElement => {
    const lg = useMediaQuery('(min-width:1380px)');

    return <BlueButton {...{ ...props, size: lg ? 'medium' : 'small' }} />;
};

export default BlueButtonComponent;
