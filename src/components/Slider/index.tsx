import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import amber from '@material-ui/core/colors/amber';

export const PrettoSlider = withStyles({
    root: {
        height: 6,
        color: amber[600],
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -12,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 6,
        borderRadius: 4,
    },
    rail: {
        height: 6,
        borderRadius: 4,
    },
})(Slider);

export default PrettoSlider;
