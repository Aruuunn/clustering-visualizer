import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMediaQuery, Paper, Grid, IconButton, SvgIcon } from '@material-ui/core';

import { RootState } from '../../../../reduxStore';
import KMEANSMode from '../../../../common/kmeans.mode.enum';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function Result(props: Props): ReactElement {
    if (
        props.global.start === true ||
        props.kmeans.info === null ||
        (props.kmeans.currentIteration === null && props.kmeans.mode === KMEANSMode.MultipleIteration)
    ) {
        return <div />;
    }

    return <div></div>;
}

export default connector(Result);
