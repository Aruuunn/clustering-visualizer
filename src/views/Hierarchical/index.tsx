import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, ConnectedProps } from 'react-redux';

import { NavBar, RenderVisualisation, AlgorithmInfoModal } from './components';
import { Board } from '../../components';
import { RootState, UserPreferencesActionTypes } from '../../reduxStore';
import AlgorithmNames from '../../common/algorithms.enum';

const mapStateToProps = (state: RootState) => ({
    userPreference: state.userPreferences,
});

const mapDispatchToProps = {
    setNeverShowAlgorithmInfo: () => ({
        type: UserPreferencesActionTypes.SET_NEVER_SHOW_AGAIN_ALGO,
        payload: AlgorithmNames.HIERARCHICAL_CLUSTERING,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const index = (props: Props) => {
    return (
        <div>
            <Helmet>
                <title>Hierarchical Clustering | Clustering Visualizer</title>
            </Helmet>
            <NavBar />
            <Board component={<RenderVisualisation />} />
            {props.userPreference.showAlgorithmModal.HIERARCHICAL_CLUSTERING ? (
                <AlgorithmInfoModal setNeverShowAlgorithmModal={props.setNeverShowAlgorithmInfo} />
            ) : null}
        </div>
    );
};

export default connector(index);
