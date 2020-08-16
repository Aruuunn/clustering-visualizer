import React, { ReactElement } from 'react'
import NavBar from '../../components/CommonNavBar'
import Board from '../../components/Board'


function Home(): ReactElement {
    return (
        <div>
            <NavBar/>
            <Board/>
        </div>
    )
}

export default Home;
