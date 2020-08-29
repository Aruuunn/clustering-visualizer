import React, { ReactElement } from 'react';
import { Button, withStyles, useTheme, useMediaQuery, ButtonProps } from '@material-ui/core';

export const FlatButton = withStyles({
    root: {
        // borderRadius: '0%',
        // -webkitox-shadow: inset 0 -2px #d3d3d3;
        // boxShadow: 'inset 0 -5px 	#B8B8B8',
        // '&:hover': {
        //     boxShadow: 'inset 0 -3px 	#B8B8B8',
        //     position: 'relative',
        //     top: '1px',
        // },
        // '&:active': {
        //     boxShadow: 'inset 0 -1px 	#B8B8B8',
        //     position: 'relative',
        //     top: '2px',
        // },
        backgroundColor: 'white',
        color: 'black',
    },
})(Button);

const FlatButtonComponent = (props: ButtonProps): ReactElement => {
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    return <FlatButton {...{ ...props, size: lg ? 'medium' : 'small' }} />;
};
export default FlatButtonComponent;
