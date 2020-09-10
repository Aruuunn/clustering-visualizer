import { Fab, withStyles } from '@material-ui/core';

export const BlueFab = withStyles({
    root: {
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
            backgroundColor: '#4791db',
        },
    },
})(Fab);

export default BlueFab;
