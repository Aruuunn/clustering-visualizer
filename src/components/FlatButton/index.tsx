import React, { ReactElement } from 'react';
import { Button, withStyles, useMediaQuery, ButtonProps } from '@material-ui/core';

export const FlatButton = withStyles({
    root: {
        backgroundColor: 'white',
        color: 'black',
    },
})(Button);

const FlatButtonComponent = (props: ButtonProps): ReactElement => {
    const lg = useMediaQuery('(min-width:1380px)');

    return <FlatButton {...{ ...props, size: lg ? 'medium' : 'small', variant: 'contained' }} />;
};
export default FlatButtonComponent;
