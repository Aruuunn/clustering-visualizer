import { Button, withStyles } from '@material-ui/core';

export const BlueButton = withStyles({
    root: {
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
            backgroundColor: '#4791db',
        },
        boxShadow: 'inset 0 -4px #1034A6',
    },
})(Button);

export default BlueButton;
