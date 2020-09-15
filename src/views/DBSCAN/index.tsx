import React from 'react';
import { Helmet } from 'react-helmet';

import { NavBar, RenderVisualization } from './components';
import { Board } from '../../components';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, UserPreferencesActionTypes } from '../../reduxStore';
import AlgorithmNames from '../../common/algorithms.enum';
import AlgorithmInfo from './components/AlgorithmInfoModal';

const mapStateToProps = (state: RootState) => ({
    userPreferences: state.userPreferences,
});

const mapDispatchToProps = {
    setNeverShowAlgorithmModal: () => ({
        type: UserPreferencesActionTypes.SET_NEVER_SHOW_AGAIN_ALGO,
        payload: AlgorithmNames.DBSCAN,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const DBSCAN = (props: Props) => {
    return (
        <div>
            <Helmet>
                <title>DBSCAN | Clustering Visualizer</title>
            </Helmet>
            {props.userPreferences.showAlgorithmModal.DBSCAN ? (
                <AlgorithmInfo setNeverShowAlgorithmModal={props.setNeverShowAlgorithmModal} />
            ) : null}
            <NavBar />
            <Board component={<RenderVisualization />} />
        </div>
    );
};

export default connector(DBSCAN);
