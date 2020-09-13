import React, { ReactElement, useEffect } from 'react';
import NavBar from '../../components/CommonNavBar';
import Board from '../../components/Board';
import { GlobalActionTypes, RootState } from '../../reduxStore';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
});

const mapDispatchToProps = {
    setAlgorithmNull: () => ({ type: GlobalActionTypes.SET_ALGORITHM, payload: null }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function Home(props: Props): ReactElement {
    useEffect(() => {
        if (props.global.algorithm !== null) {
            props.setAlgorithmNull();
        }
    }, [props.global.algorithm]);
    return (
        <div>
            <NavBar />
            <Board />
        </div>
    );
}

export default connector(Home);
