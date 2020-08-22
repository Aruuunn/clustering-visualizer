import React, { Component, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import distance from '../../../../utils/distance';
import calculateVariance from '../../../../utils/variance';
import { KMEANSAlgorithmActionTypes } from '../../../../reduxStore/types/KMEANS.algorithm.types';
import GlobalActionTypes from '../../../../reduxStore/types/Global.types';
import { getColor } from '../../../../utils/getRandomColor';
import { RootState } from '../../../../reduxStore/reducers';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { Variance, DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';
import { calculateSilhouetteScore } from '../../../../utils/silhouetteScore';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

const mapDispatchToProps = {
    addToRender: (data: ReactElement) => ({
        type: KMEANSAlgorithmActionTypes.ADD_TO_RENDER,
        payload: data,
    }),
    popRender: () => ({ type: KMEANSAlgorithmActionTypes.POP_RENDER }),
    setRender: (data: ReactElement[]) => ({
        type: KMEANSAlgorithmActionTypes.SET_RENDER,
        payload: data,
    }),
    resetAlgoData: () => ({ type: KMEANSAlgorithmActionTypes.RESET_DATA }),
    reduceData: (numberOfNodes: number) => ({
        type: KMEANSAlgorithmActionTypes.REDUCE_DATA,
        payload: numberOfNodes,
    }),
    endVisualization: () => ({ type: GlobalActionTypes.END_VISUALIZATION }),
    setNumberOfClusters: (numberOfClusters: number) => ({
        type: KMEANSAlgorithmActionTypes.SET_NUMBER_OF_CLUSTERS,
        payload: numberOfClusters,
    }),
    setInfo: (info: Variance | DetailedInfo | null) => ({ type: KMEANSAlgorithmActionTypes.SET_INFO, payload: info }),

    setCurrentIteration: (iter: number) => ({ type: KMEANSAlgorithmActionTypes.SET_CURRENT_ITERATION, payload: iter }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

interface State {
    centroids: number[][];
    started: boolean;
}

class KMeans extends Component<Props, State> {
    state = {
        centroids: [],
        started: false,
    };

    renderCentroids: ReactElement[] = [];
    colors: string[] = [];
    numberOfClusters = 0;

    randomlyInitializeCentroids(updateColor = false, callback: () => void): void {
        const centroids: number[][] = [];
        const { global } = this.props;

        const set = new Set();

        for (let i = 0; i < this.numberOfClusters; i++) {
            let idx = Math.floor(Math.random() * global.coordinatesOfNodes.length - 1);

            while (set.has(idx) || !global.coordinatesOfNodes[idx]) {
                idx = Math.floor(Math.random() * global.coordinatesOfNodes.length - 1);
            }

            set.add(idx);

            centroids.push(global.coordinatesOfNodes[idx].coordinates);
        }

        if (updateColor) {
            this.colors = [];

            for (let iter = 0; iter < this.numberOfClusters; iter++) {
                this.colors.push(getColor(iter));
            }
        }

        this.renderCentroids = [];

        for (let iter = 0; iter < centroids.length; iter++) {
            this.renderCentroids.push(
                <g key={`c-${iter}`}>
                    <rect
                        x={centroids[iter][0] - 10}
                        y={centroids[iter][1] - 10}
                        width={20 + 10 * (iter + 1).toString().length}
                        height="20"
                        style={{ fill: this.colors[iter] }}
                        stroke="black"
                        strokeWidth="0.25"
                    />
                    <text x={centroids[iter][0] - 5} y={centroids[iter][1] + 5} style={{ fill: 'black' }}>
                        C{iter + 1}
                    </text>
                </g>,
            );
        }

        this.setState(
            () => ({
                centroids,
            }),
            callback,
        );
    }

    calculateNewCentroids = (clusters: number[][][]) => {
        const centroids: number[][] = Array.from({ length: this.numberOfClusters }, () => new Array(2).fill(0));

        for (let iter = 0; iter < this.numberOfClusters; iter++) {
            const cluster = clusters[iter];
            if (!cluster.length) {
                continue;
            }

            let X = 0;
            let Y = 0;

            for (let i = 0; i < cluster.length; i++) {
                X += cluster[i][0];
                Y += cluster[i][1];
            }

            X = X / cluster.length;
            Y = Y / cluster.length;

            centroids[iter][0] = X;
            centroids[iter][1] = Y;
        }

        let loss = 0;
        for (let iter = 0; iter < this.numberOfClusters; iter++) {
            loss +=
                Math.abs(this.state.centroids[iter][0] - centroids[iter][0]) +
                Math.abs(this.state.centroids[iter][1] - centroids[iter][1]);
        }

        return { centroids, loss };
    };

    calculateVarianceOfClusters = (clusters: number[][][]) => {
        const variance: Variance = { total: 0, colors: [], labels: [], variances: [], silhouetteScore: -1 };

        for (let iter = 0; iter < this.numberOfClusters; iter++) {
            const cluster = clusters[iter];

            const temp = calculateVariance(cluster);

            variance.total += temp;
            variance.colors.push(this.colors[iter]);
            variance.variances.push(temp);
            variance.labels.push(`C${iter + 1}`);
        }
        variance.silhouetteScore = calculateSilhouetteScore(clusters, this.state.centroids);

        return variance;
    };

    handleSingleIteration = async (): Promise<Variance> => {
        let loss = 1000;
        let clusters: number[][][] = [];

        while (Math.floor(loss) > 0) {
            this.props.resetAlgoData();

            clusters = Array.from({ length: this.numberOfClusters }, () => new Array(0));

            for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
                const currentNode = this.props.global.coordinatesOfNodes[i].coordinates;

                let min = distance(currentNode, this.state.centroids[0]);

                let pos = 0;

                for (let j = 0; j < this.numberOfClusters; j++) {
                    this.props.addToRender(
                        <g key={`a-${this.props.kmeans.render.length}`}>
                            <circle
                                r={this.props.userPreference.sizeOfPoint + 1}
                                cx={currentNode[0]}
                                cy={currentNode[1]}
                                style={{ fill: 'yellow' }}
                            />
                            <line
                                x1={this.state.centroids[j][0]}
                                y1={this.state.centroids[j][1]}
                                x2={currentNode[0]}
                                y2={currentNode[1]}
                                stroke="yellow"
                                strokeWidth="2.5"
                            />
                        </g>,
                    );

                    await new Promise((done) => setTimeout(() => done(), this.props.global.speed));
                    this.props.popRender();
                    const dist = distance(currentNode, this.state.centroids[j]);
                    if (dist < min) {
                        min = dist;
                        pos = j;
                    }
                }

                //console.log('Clusters', clusters, 'pos', pos, 'centroids', this.state.centroids);

                if (clusters.length !== this.numberOfClusters) {
                    clusters = Array.from({ length: this.numberOfClusters }, () => new Array(0));
                }
                if (clusters[pos]) {
                    clusters[pos].push(currentNode);
                }

                await new Promise((done) => setTimeout(() => done(), this.props.global.speed));

                this.props.addToRender(
                    <g key={`b-${this.props.kmeans.render.length}`}>
                        <line
                            stroke={this.colors[pos]}
                            strokeWidth="1.5"
                            x1={currentNode[0]}
                            y1={currentNode[1]}
                            x2={this.state.centroids[pos][0]}
                            y2={this.state.centroids[pos][1]}
                        />
                        <circle
                            cx={currentNode[0]}
                            cy={currentNode[1]}
                            r={this.props.userPreference.sizeOfPoint}
                            style={{ fill: this.colors[pos] }}
                            stroke={this.colors[pos]}
                            strokeWidth="1"
                        />
                    </g>,
                );

                await new Promise((done) => setTimeout(() => done(), this.props.global.speed));
            }

            const result = this.calculateNewCentroids(clusters);
            const temp = this.state.centroids;

            loss = result.loss;
            this.setState({ centroids: result.centroids });

            await new Promise((done) => setTimeout(() => done(), this.props.global.speed));

            this.renderCentroids = [];

            for (let iter = 0; iter < result.centroids.length; iter++) {
                this.renderCentroids.push(
                    <g key={`d-${iter}`}>
                        {Math.floor(
                            Math.abs(temp[iter][0] - result.centroids[iter][0]) +
                                Math.abs(temp[iter][1] - result.centroids[iter][1]),
                        ) > 0 ? (
                            <line
                                x1={temp[iter][0]}
                                y1={temp[iter][1]}
                                x2={result.centroids[iter][0]}
                                y2={result.centroids[iter][1]}
                                stroke="white"
                                strokeWidth="1"
                                strokeDasharray="4"
                                style={{ markerEnd: 'url(#markerArrow)' }}
                            />
                        ) : null}

                        <rect
                            x={result.centroids[iter][0] - 10}
                            y={result.centroids[iter][1] - 10}
                            width={20 + 10 * (iter + 1).toString().length}
                            height="20"
                            style={{ fill: this.colors[iter] }}
                            stroke="black"
                            strokeWidth="0.25"
                        />
                        <text
                            x={result.centroids[iter][0] - 5}
                            y={result.centroids[iter][1] + 5}
                            style={{ fill: 'black' }}
                        >
                            C{iter + 1}
                        </text>
                    </g>,
                );
            }
        }

        return this.calculateVarianceOfClusters(clusters);
    };

    handleStart = async () => {
        if (!this.props.global.start || this.state.centroids.length === 0) {
            console.log('CANNOT START VISUALIZATION');
            return;
        }

        this.props.setInfo(null);

        const totalIterations =
            this.props.kmeans.mode === KMEANSMode.SingleIteration ? 1 : this.props.kmeans.maxIterations;

        //will be used it the mode is multiple iterations
        let render: ReactElement[][] = [];
        let variances: Variance[] = [];
        let best = 0;

        for (let it = 0; it < totalIterations; it++) {
            this.props.setCurrentIteration(it);

            const variance = await this.handleSingleIteration();
            console.log('complted one iter', it + 1, variance);

            if (this.props.kmeans.mode === KMEANSMode.SingleIteration) {
                this.props.setInfo(variance);
            } else {
                render = [...render, [...this.props.kmeans.render]];
                variances = [...variances, { ...variance }];

                if (variances[best].total > variance.total) {
                    best = it;
                }

                console.log({ render, best, variances });
                this.props.setInfo({ render, best, variances });
            }

            if (it + 1 < totalIterations) {
                await new Promise((done) => this.randomlyInitializeCentroids(false, () => done()));
            }
        }

        this.props.endVisualization();
        this.setState({ started: false });
    };

    componentDidUpdate() {
        if (this.props.global.start) {
            if (!this.state.started) {
                this.numberOfClusters = this.props.kmeans.numberOfClusters;

                this.setState(
                    () => ({
                        started: true,
                    }),
                    () => this.randomlyInitializeCentroids(true, () => this.handleStart()),
                );
            }
        }
    }

    render() {
        return (
            <g>
                {this.props.kmeans.render}
                {this.props.kmeans.render.length && this.renderCentroids}
            </g>
        );
    }
}

export default connector(KMeans);
