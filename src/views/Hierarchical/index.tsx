import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { NavBar, RenderVisualisation, AlgorithmInfoModal } from './components';
import { Board } from '../../components';
import { RootState, UserPreferencesActionTypes } from '../../reduxStore';
import AlgorithmNames from '../../common/algorithms.enum';

const { HIERARCHICAL_CLUSTERING_AGGLOMERATIVE } = AlgorithmNames;

const mapStateToProps = (state: RootState) => ({
    userPreference: state.userPreferences,
});

const mapDispatchToProps = {
    setNeverShowAlgorithmInfo: () => ({ type: UserPreferencesActionTypes.SET_NEVER_SHOW_AGAIN_ALGO }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const index = (props: Props) => {
    return (
        <div>
            <NavBar />
            <Board component={<RenderVisualisation />} />
            {props.userPreference.showAlgorithmModal[HIERARCHICAL_CLUSTERING_AGGLOMERATIVE] ? (
                <AlgorithmInfoModal setNeverShowAlgorithmModal={props.setNeverShowAlgorithmInfo} />
            ) : null}
        </div>
    );
};

export default connector(index);
