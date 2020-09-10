import React from 'react'

import {NavBar,RenderVisualisation} from './components';
import {Board} from '../../components'

interface Props {
    
}

const index = (props: Props) => {
    return (
        <div>
            <NavBar/>
            <Board component={<RenderVisualisation/>}/>
        </div>
    )
}

export default index;
