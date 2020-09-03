import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import AlgorithmNames from '../../../../common/algorithms.enum';
import { Slider } from '../../../../components';
import { CommonNavBar } from '../../../../components';
import { GlobalActionTypes, RootState, MeanShiftActionTypes } from '../../../../reduxStore';

const mapStateToProps = (state: RootState) => ({ global: state.global, meanShift: state.meanShift });

const mapDispatchToProps = {
    setAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),

    setKernelRadius: (radius: number) => ({ type: MeanShiftActionTypes.SET_WINDOW_SIZE, payload: radius }),
    setShowGuideCircle: (s: boolean) => ({ type: MeanShiftActionTypes.SET_SHOW_GUIDE_CIRCLE, payload: s }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type State = any;

class NavBar extends Component<Props, State> {
    state = {};

    componentDidMount() {
        if (this.props.global.algorithm !== AlgorithmNames.MEAN_SHIFT)
            this.props.setAlgorithm(AlgorithmNames.MEAN_SHIFT);
    }
    componentDidUpdate() {
        if (this.props.global.algorithm !== AlgorithmNames.MEAN_SHIFT)
            this.props.setAlgorithm(AlgorithmNames.MEAN_SHIFT);
    }

    render() {
        return (
            <div>
                <CommonNavBar
                    isSliderDisabled={this.props.meanShift.render.length !== 0}
                    //  disabled={() => this.props.dbscan.minPts <= 1 && this.props.dbscan.eps <= 10}
                    drawerChildren={[
                        <Grid container justify="center" alignItems="center" key={1}>
                            <Grid
                                container
                                direction="column"
                                style={{
                                    width: '100%',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: '10px',
                                    maxWidth: '500px',
                                }}
                            >
                                <Typography>Window Radius: {this.props.meanShift.windowSize}</Typography>
                                <Slider
                                    //disabled={this.props.global.start}

                                    valueLabelDisplay="auto"
                                    color="secondary"
                                    min={20}
                                    max={100}
                                    value={this.props.meanShift.windowSize}
                                    onChange={(e, val) => this.props.setKernelRadius(val as number)}
                                />
                            </Grid>
                        </Grid>,
                    ]}
                >
                    {[
                        <Grid
                            key={1}
                            container
                            onPointerUp={() => this.props.setShowGuideCircle(false)}
                            direction="column"
                            style={{ maxWidth: '150px', marginLeft: '10px', marginRight: '20px' }}
                        >
                            <Typography>Window Radius: {this.props.meanShift.windowSize}</Typography>
                            <Slider
                                onPointerDown={() => this.props.setShowGuideCircle(true)}
                                onBlur={() => this.props.setShowGuideCircle(false)}
                                // disabled={this.props.global.start}
                                valueLabelDisplay="auto"
                                color="secondary"
                                min={50}
                                max={300}
                                value={this.props.meanShift.windowSize}
                                onChange={(e, val) => this.props.setKernelRadius(val as number)}
                            />
                        </Grid>,
                    ]}
                </CommonNavBar>
            </div>
        );
    }
}

export default connector(NavBar);
