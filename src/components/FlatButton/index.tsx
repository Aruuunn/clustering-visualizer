import { Button, withStyles } from '@material-ui/core';

export const BlueButton = withStyles({
    root: {
        // borderRadius: '0%',
        // -webkitox-shadow: inset 0 -2px #d3d3d3;
        boxShadow: 'inset 0 -4px 	#B8B8B8',
    },
})(Button);

export default BlueButton;
