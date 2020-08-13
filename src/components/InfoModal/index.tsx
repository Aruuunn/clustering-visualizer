import React, { ReactElement } from 'react'
import { Backdrop, Card, CardContent ,Typography, CardMedia } from '@material-ui/core';
import ClusterImage from '../../images/info.png';
import CloseIcon from '../../images/close.svg';
interface Props {
    open:boolean;
    onClose:Function
}

function InfoModal(props: Props): ReactElement {
    return (
        <Backdrop open={props.open} style={{zIndex:100}}>
            <Card style={{maxWidth:700,width:'100%',backgroundColor:'white',color:'black',position:'relative'}}>
            <img src={CloseIcon} alt="close" style={{position:'absolute',top:0,right:0,backgroundColor:'black'}} onClick={() => props.onClose()}/>

                <CardMedia image={ClusterImage} style={{height:100}}/>
                <CardContent>
                    <Typography variant="h4">Clustering Algorithm Visualizer</Typography>
                </CardContent>
            </Card>
        </Backdrop>
    )
}

export default InfoModal;
