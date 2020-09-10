import React, { Component, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { GlobalActionTypes, RootState, AlgorithmActionTypes } from '../../../../reduxStore';
import { getRandomColor, calculateSquaredDistance } from '../../../../utils';
import Speed from '../../../../common/speed.enum';
import Logger from '../../../../common/logger';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    userPreference: state.userPreferences,
    algorithm: state.algorithm,
    hierarchical: state.hierarchical,
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

    calculateCentroids = (clusters: number[][][]) => {
        const centroids = [];

        for (const cluster of clusters) {
            let X = 0;
            let y = 0;

            if (cluster.length === 0) {
                //This is not supposed to happen!
                continue;
            }

            for (const point of cluster) {
                X += point[0];
                y += point[1];
            }

            X /= cluster.length;
            y /= cluster.length;

            centroids.push([X, y]);
        }

        return centroids;
    };

    handleStart = async () => {
        let centroids: number[][] = [];
        let colors: string[] = [];


        for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
            centroids.push(this.props.global.coordinatesOfNodes[i].coordinates);
            colors.push(getRandomColor(colors.length * 3));
        }

        let clusters: number[][][] = Array.from({length:centroids.length},(_,i) => [centroids[i]]);


        let render = [];

        for (let i = 0; i < centroids.length; i++) {
            for (let j = 0; j < clusters[i].length; j++) {
                render.push(
                    <g key={render.length}>
                        <circle
                            r={this.props.userPreference.sizeOfPoint}
                            cx={clusters[i][j][0]}
                            cy={clusters[i][j][1]}
                            fill={colors[i]}
                            stroke="black"
                            strokeWidth="0.25"
                        />
                    </g>,
                );
            }
        }

        while (centroids.length !== this.props.hierarchical.numberOfClusters) {
            let best = 1e9;
            const bestPair = [-1, -1];

            for (let i = 0; i < centroids.length; i++) {
                for (let j = i + 1; j < centroids.length; j++) {
                    const dist = Math.sqrt(calculateSquaredDistance(centroids[i], centroids[j]));

                    if (best > dist) {
                        best = dist;

                        bestPair[0] = i;
                        bestPair[1] = j;
                    }
                }
            }

            colors = colors.filter((o, i) => i !== bestPair[1]);
            clusters[bestPair[0]] = clusters[bestPair[0]].concat(clusters[bestPair[1]]);
            clusters = clusters.filter((o, i) => i !== bestPair[1]);

            const render: ReactElement[] = [];

            centroids = this.calculateCentroids(clusters);

            for (let i = 0; i < centroids.length; i++) {
                for (let j = 0; j < clusters[i].length; j++) {
                    render.push(
                        <g key={render.length}>
                            <circle
                                r={this.props.userPreference.sizeOfPoint}
                                cx={clusters[i][j][0]}
                                cy={clusters[i][j][1]}
                                fill={colors[i]}
                                stroke="black"
                                strokeWidth="0.25"
                            />
                        </g>,
                    );
                }
            }

            this.props.setRender(render);
            await new Promise((done) => setTimeout(done, this.props.global.speed));
        }

        this.props.endVisualization();
        this.setState({ start: false });
    };

    componentDidUpdate() {
        if (this.props.global.start && !this.state.start) {
            this.setState({ start: true }, () => this.handleStart());
        }
    }

    componentWillUnmount() {
        Logger.clear();
    }

    render() {
        return <g>{this.props.algorithm.render}</g>;
    }
}

export default connector(RenderVisualisation);
