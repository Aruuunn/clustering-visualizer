import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../../reduxStore';

const mapStateToProps = (state: RootState) => ({ global: state.global, dbscan: state.dbscan });
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;
type State = any;

class RenderVisualisation extends Component<Props, State> {
    state = {};

    render() {
        if (this.props.global.start === false) {
            return <g />;
        }
        return <g></g>;
    }
}

export default RenderVisualisation;
