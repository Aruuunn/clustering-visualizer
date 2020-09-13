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

    return <FlatButton {...{ ...props, size: lg ? 'medium' : 'small', variant: 'contained' }} />;
};
export default FlatButtonComponent;
