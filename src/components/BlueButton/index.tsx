import { Button, withStyles } from '@material-ui/core';

export const BlueButton = withStyles({
    root: {
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
            backgroundColor: '#4791db',
            position: 'relative',
            top: '1px',
            boxShadow: 'inset 0 -3px #1034A6',
        },
        boxShadow: 'inset 0 -5px #1034A6',
    },
})(Button);

export default BlueButton;
