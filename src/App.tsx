import React, { ReactElement, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import ErrorBoundary from './components/ErrorBoundary';

import Loading from './components/Loading';
import { RootState, UserPreferencesActionTypes } from './reduxStore';

const Home = lazy(() => import('./views/Home'));
const KMEANSView = lazy(() => import('./views/KMEANS'));
const Tutorial = lazy(() => import('./components/Tutorial'));
const DBSCANView = lazy(() => import('./views/DBSCAN'));
const MeanShift = lazy(() => import('./views/MeanShift'));
const HierarchicalView = lazy(() => import('./views/Hierarchical'));


const mapStateToProps = (state: RootState) => ({
    userPreferences: state.userPreferences,
});

const mapDispatchToProps = {
    setTutorialComplete: () => ({ type: UserPreferencesActionTypes.FINISH_TUTORIAL }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function App(props: Props): ReactElement {
    return (
        <ErrorBoundary>
            {' '}
            <Suspense fallback={<Loading />}>
                {' '}
                <Switch>
                    <Route path="/kmeans" component={KMEANSView} />
                    <Route path="/dbscan" component={DBSCANView} />
                    <Route path="/mean-shift" component={MeanShift} />
                    <Route path="/hierarchical" component={HierarchicalView}/>
                    <Route exact path="/" component={Home} />
                </Switch>
                {props.userPreferences.tutorialComplete === false ? (
                    <Tutorial setTutorialComplete={props.setTutorialComplete} />
                ) : null}
            </Suspense>
        </ErrorBoundary>
    );
}

export default connector(App);
