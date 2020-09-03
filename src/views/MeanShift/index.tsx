import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { NavBar, RenderVisualization, AlgorithmInfoModal } from './components';
import { Board } from '../../components';
import { RootState, UserPreferencesActionTypes } from '../../reduxStore';
import AlgorithmNames from '../../common/algorithms.enum';

const mapStateToProps = (state: RootState) => ({
    userPreferences: state.userPreferences,
});

const mapDispatchToProps = {
    setNeverShowAlgorithmInfoModal: () => ({
        type: UserPreferencesActionTypes.SET_NEVER_SHOW_AGAIN_ALGO,
        payload: AlgorithmNames.MEAN_SHIFT,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const MeanShift = (props: Props) => {
    return (
        <div>
            <NavBar />
            <Board component={<RenderVisualization />} />
            {props.userPreferences.showAlgorithmModal['MEAN SHIFT'] ? (
                <AlgorithmInfoModal setNeverShowAlgorithmModal={props.setNeverShowAlgorithmInfoModal} />
            ) : null}
        </div>
    );
};

export default connector(MeanShift);
