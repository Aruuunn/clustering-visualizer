import React, { ReactElement } from 'react';
import NavBar from '../../components/CommonNavBar';
import Board from '../../components/Board';
import { RootState, UserPreferencesActionTypes } from '../../reduxStore';
import { connect, ConnectedProps } from 'react-redux';
import { Tutorial } from '../../components';

const mapStateToProps = (state: RootState) => ({
    userPreferences: state.userPreferences,
});

const mapDispatchToProps = {
    setTutorialComplete: () => ({ type: UserPreferencesActionTypes.FINISH_TUTORIAL }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function Home(props: Props): ReactElement {
    return (
        <div>
            <NavBar />
            <Board />
            {props.userPreferences.tutorialComplete === false ? (
                <Tutorial setTutorialComplete={props.setTutorialComplete} />
            ) : null}
        </div>
    );
}

export default connector(Home);
