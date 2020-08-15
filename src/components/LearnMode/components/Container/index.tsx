import React, { ReactElement } from 'react'

import { Paper , useMediaQuery , useTheme} from "@material-ui/core";


interface Props {
    children:ReactElement
}

function Container(props: Props): ReactElement {

    const theme = useTheme();

    const  sm =useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Paper   style={{
            position: "fixed",
            right: "10px",
            top: "80px",
            maxWidth:( sm ? "80vw" : "500px"),
            width: "100%",
            maxHeight: (sm ? "85vh" : "80vh"),
            height:'100%',
            padding: "20px",
            overflow: "auto",
            opacity: "0.95",
          }}>
          {props.children}  
        </Paper>
    )
}

export default Container
