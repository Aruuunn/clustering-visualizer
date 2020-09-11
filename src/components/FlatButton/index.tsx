import React, { ReactElement } from 'react';
import { Button, withStyles, useTheme, useMediaQuery, ButtonProps } from '@material-ui/core';

export const FlatButton = withStyles({
    root: {
        backgroundColor: 'white',
        color: 'black',
    },
})(Button);

const FlatButtonComponent = (props: ButtonProps): ReactElement => {
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));

    return <FlatButton {...{ ...props, size: lg || xl ? 'medium' : 'small',variant:"contained" }} />;
};
export default FlatButtonComponent;
