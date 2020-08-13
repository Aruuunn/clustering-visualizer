import React, { ReactElement } from 'react'
import IndiaFlag from '../../assets/india-48.png';
import { Grid } from '@material-ui/core';

interface Props {
    
}

function Footer(props: Props): ReactElement {

    return (
        <Grid style={{position:'fixed',bottom:0,width:'100%',color:'white'}} container alignItems="center" justify="center">
           made with <span style={{marginLeft:'10px',marginRight:'10px',color:'red',fontSize:'24px'}}> &hearts; </span>   in <img src={IndiaFlag}  style={{height:'24px',width:'auto',marginLeft:'10px'}} alt="india"/>
        </Grid>
    )
}

export default Footer
