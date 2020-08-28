import React from 'react';
import { Button, withStyles, useTheme, useMediaQuery } from '@material-ui/core';

export const BlueButton = withStyles({
    root: {
        backgroundColor: '#1976d2',
        color: 'white',
        // boxShadow: 'inset 0 -5px #1034A6',

        '&:hover': {
            backgroundColor: '#4791db',
            // position: 'relative',
            // top: '1px',
            // boxShadow: 'inset 0 -3px #1034A6',
        },
        '&:active': {
            backgroundColor: '#4791db',
            // position: 'relative',
            // top: '2px',
            // boxShadow: 'inset 0 -1px #1034A6',
        },
    },
})(Button);

export const BlueButtonComponent = (props: any) => {
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    return <BlueButton {...{ ...props, size: lg ? 'medium' : 'small' }} />;
};

export default BlueButtonComponent;
