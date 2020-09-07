import React, { Component, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';


import {  GlobalActionTypes, RootState, AlgorithmActionTypes } from '../../../../reduxStore';
import { Node } from '../../../../reduxStore/reducers/global';
import { getRandomColor, calculateSquaredDistance } from '../../../../utils';
import Speed from '../../../../common/speed.enum';
import Logger from '../../../../common/logger';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    userPreference: state.userPreferences,
    algorithm:state.algorithm
});

const mapDispatchToProps = {
    endVisualization: () => ({ type: GlobalActionTypes.END_VISUALIZATION }),
    addToRender: (ele: ReactElement) => ({ type: AlgorithmActionTypes.ADD_TO_RENDER, payload: ele }),
    setRender: (ele: ReactElement[]) => ({ type: AlgorithmActionTypes.SET_RENDER, payload: ele }),
    popRender: () => ({ type: AlgorithmActionTypes.POP_RENDER }),
    setSpeed: (sp: Speed) => ({ type: GlobalActionTypes.SET_SPEED, payload: sp }),
    resetAlgoData: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
    appendToRender: (ele: ReactElement[]) => ({ type: AlgorithmActionTypes.APPEND_TO_RENDER, payload: ele }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;
type State = {
    colors: string[];
    start: boolean;
};

class RenderVisualisation extends Component<Props, State> {
    state = { colors: [], start: false };

    componentDidMount() {
        this.props.setSpeed(Speed.faster);
        this.props.resetAlgoData();
        Logger.clear();
    }

   

    componentDidUpdate(prevProps: Props) {
        if (this.props.global.start && !this.state.start) {
            // this.setState({ start: true }, () => this.handleStart());
        }
    }

    componentWillUnmount() {
        Logger.clear();
    }

    render() {
        return (
            <g>


                {this.props.algorithm.render}

            </g>
        );
    }
}

export default connector(RenderVisualisation);
