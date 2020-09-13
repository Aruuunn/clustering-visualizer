import React, { Component, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { GlobalActionTypes, RootState, AlgorithmActionTypes, HierarchicalClusteringType } from '../../../../reduxStore';
import { getRandomColor, calculateSquaredDistance, calculateVariance } from '../../../../utils';
import Speed from '../../../../common/speed.enum';
import freeze from '../../../../common/freeze';

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
    }

    renderClusters = (centroids: number[][], colors: string[], clusters: number[][][]) => {
        const render = [];

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
    };

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

    handleAgglomerativeStart = async () => {
        let centroids: number[][] = [];
        let colors: string[] = [];

        for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
            centroids.push(this.props.global.coordinatesOfNodes[i].coordinates);
            colors.push(getRandomColor(colors.length * 3 + Date.now()));
        }

        let clusters: number[][][] = Array.from({ length: centroids.length }, (_, i) => [centroids[i]]);

        this.renderClusters(centroids, colors, clusters);

        while (centroids.length !== this.props.hierarchical.numberOfClusters) {
            await new Promise(freeze);
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

            centroids = this.calculateCentroids(clusters);

            this.renderClusters(centroids, colors, clusters);

            await new Promise((done) => setTimeout(done, this.props.global.speed));
        }

        this.props.endVisualization();
        this.setState({ start: false });
    };

    splitCluster = (cluster: number[][]) => {
        if (cluster.length <= 1) {
            return { clusters: [cluster], varianceDiff: 0 };
        }

        let loss = 1e9;
        let clusters: number[][][] = [];
        let centroids: number[][] = [];

        const idx1 = Math.floor(Math.random() * cluster.length);

        let idx2 = Math.floor(Math.random() * cluster.length);

        while (idx2 === idx1) {
            idx2 = Math.floor(Math.random() * cluster.length);
        }
        centroids = [cluster[idx1], cluster[idx2]];

        while (Math.floor(loss) > 0) {
            clusters = Array.from({ length: 2 }, () => new Array(0));

            for (let i = 0; i < cluster.length; i++) {
                const currentNode = cluster[i];

                let min = calculateSquaredDistance(currentNode, centroids[0]);

                let pos = 0;

                for (let j = 0; j < 2; j++) {
                    const dist = calculateSquaredDistance(currentNode, centroids[j]);
                    if (dist < min) {
                        min = dist;
                        pos = j;
                    }
                }

                if (clusters[pos]) {
                    clusters[pos].push(currentNode);
                }
            }

            const oldCentroids = centroids;

            centroids = this.calculateCentroids(clusters);

            loss = oldCentroids.reduce(
                (t, o, idx) => t + Math.sqrt(calculateSquaredDistance(oldCentroids[idx], centroids[idx])),
                0,
            );
        }

        return {
            clusters,
            varianceDiff:
                calculateVariance(cluster) - (calculateVariance(clusters[0]) - calculateVariance(clusters[1])),
        };
    };

    handleDivisiveStart = async () => {
        let clusters = [this.props.global.coordinatesOfNodes.map((o) => o.coordinates)];
        let iter = 0;

        let colors = [getRandomColor(Date.now())];

        let centroids = this.calculateCentroids(clusters);

        this.renderClusters(centroids, colors, clusters);

        while (centroids.length < this.props.hierarchical.numberOfClusters) {
            await new Promise((done) => setTimeout(done, this.props.global.speed * 4));

            let bestSplit = 0;
            let bestVarianceDiff = 1e-9;
            let newClusters: number[][][] = [];

            for (let i = 0; i < clusters.length; i++) {
                const result = this.splitCluster(clusters[i]);

                if (result.varianceDiff > bestVarianceDiff) {
                    bestVarianceDiff = result.varianceDiff;
                    bestSplit = i;
                    newClusters = result.clusters;
                }
            }

            colors = colors.filter((_, i) => i !== bestSplit);

            clusters = clusters.filter((_, i) => i !== bestSplit);

            clusters = clusters.concat(newClusters);

            centroids = this.calculateCentroids(clusters);

            colors = centroids.map((_, i) =>
                colors[i] === undefined ? getRandomColor(Date.now() + i + iter) : colors[i],
            );

            this.renderClusters(centroids, colors, clusters);
            iter += 1;
        }
        this.props.endVisualization();
        this.setState({ start: false });
    };

    componentDidUpdate() {
        if (this.props.global.start && !this.state.start) {
            this.setState({ start: true }, () =>
                this.props.hierarchical.type === HierarchicalClusteringType.AGGLOMERATIVE
                    ? this.handleAgglomerativeStart()
                    : this.handleDivisiveStart(),
            );
        }
    }

    render() {
        return <g>{this.props.algorithm.render}</g>;
    }
}

export default connector(RenderVisualisation);
