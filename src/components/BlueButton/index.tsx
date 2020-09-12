import React, { ReactElement } from 'react';
import { Button, withStyles, useTheme, useMediaQuery, ButtonProps } from '@material-ui/core';

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
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));

    return <BlueButton {...{ ...props, size: lg ? 'medium' : 'small' }} />;
};

export default BlueButtonComponent;
