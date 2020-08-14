import React, { ReactElement } from 'react'
import { SwipeableDrawer , useMediaQuery, useTheme } from '@material-ui/core'

interface Props {
    open:boolean;
    onOpen: () => void;
    onClose:() => void;
}

function Drawer(props: Props): ReactElement {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <div>
            <SwipeableDrawer anchor={sm ? "bottom" : "left"} {...props}>
            hello
            </SwipeableDrawer>
        </div>
    )
}

export default Drawer
