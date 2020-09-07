import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import AlgorithmNames from '../../../../common/algorithms.enum';
import { CommonNavBar } from '../../../../components';
import { GlobalActionTypes, RootState } from '../../../../reduxStore';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    algorithm: state.algorithm,
});

const mapDispatchToProps = {
    setAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type State = any;

class NavBar extends Component<Props, State> {
    state = {};

    componentDidMount() {
        if (this.props.global.algorithm !== AlgorithmNames.HIERARCHICAL_CLUSTERING)
            this.props.setAlgorithm(AlgorithmNames.HIERARCHICAL_CLUSTERING);
    }
    componentDidUpdate() {
        if (this.props.global.algorithm !== AlgorithmNames.HIERARCHICAL_CLUSTERING)
            this.props.setAlgorithm(AlgorithmNames.HIERARCHICAL_CLUSTERING);
    }

    render() {
        return (
            <div>
                <CommonNavBar/>
            </div>
        );
    }
}

export default connector(NavBar);
