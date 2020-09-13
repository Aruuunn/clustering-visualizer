import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { GlobalActionTypes, RootState, AlgorithmActionTypes } from '../../../../reduxStore';
import { calculateSquaredDistance, getRandomColor } from '../../../../utils';
import Speed from '../../../../common/speed.enum';
import { ShowCircleSize } from '../../../../components';
import freeze from '../../../../common/freeze';

const mapStateToProps = (state: RootState) => ({
    userPreferences: state.userPreferences,
    global: state.global,
    meanShift: state.meanShift,
    algorithm: state.algorithm,
});

const mapDispatchToProps = {
    addToRender: (ele: React.ReactElement) => ({ type: AlgorithmActionTypes.ADD_TO_RENDER, payload: ele }),
    endVisualisation: () => ({ type: GlobalActionTypes.END_VISUALIZATION }),
    setRender: (ele: React.ReactElement[]) => ({ type: AlgorithmActionTypes.SET_RENDER, payload: ele }),
    setSpeed: (sp: Speed) => ({ type: GlobalActionTypes.SET_SPEED, payload: sp }),
    resetAlgoData: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export type IRenderVisualizationProps = ConnectedProps<typeof connector>;

export interface IRenderVisualizationState {
    centroids: number[][];
    colors: string[];
    start: boolean;
}

class RenderVisualization extends React.Component<IRenderVisualizationProps, IRenderVisualizationState> {
    state = {
        centroids: [],
        start: false,
        colors: [],
    };

    renderPath: React.ReactElement[] = [];

    componentDidMount() {
        this.props.setSpeed(Speed.average);
        this.props.resetAlgoData();
    }

    generateCentroids = (callback?: () => void) => {
        const centroids: number[][] = [];
        const colors: string[] = [];

        for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
            let flag = false;

            for (let j = 0; j < centroids.length && !flag; j++) {
                if (
                    Math.sqrt(
                        calculateSquaredDistance(centroids[j], this.props.global.coordinatesOfNodes[i].coordinates),
                    ) <= this.props.meanShift.windowSize
                ) {
                    flag = true;
                }
            }
            if (flag === false) {
                centroids.push(this.props.global.coordinatesOfNodes[i].coordinates);
                colors.push(getRandomColor(colors.length));
            }
        }

        this.setState({ centroids, colors }, () => (callback ? callback() : null));
    };

    renderCentroids = (centroids: number[][]) => {
        const list: React.ReactElement[] = [];
        for (let i = 0; i < centroids.length; i++) {
            list.push(
                <g key={i}>
                    {' '}
                    <circle
                        cx={centroids[i][0]}
                        cy={centroids[i][1]}
                        r={this.props.meanShift.windowSize}
                        fill={this.state.colors[i]}
                        opacity="0.1"
                        stroke={this.state.colors[i]}
                        strokeWidth="3"
                    />
                    <rect
                        x={centroids[i][0] - 10}
                        y={centroids[i][1] - 10}
                        width={20 + 10 * (i + 1).toString().length}
                        height="20"
                        style={{ fill: this.state.colors[i] }}
                        stroke="black"
                        strokeWidth="0.25"
                    />
                    <text x={centroids[i][0] - 5} y={centroids[i][1] + 5} style={{ fill: 'black' }}>
                        C{i + 1}
                    </text>
                </g>,
            );
        }
        this.props.setRender(list);
        return list;
    };

    calculateCentroids = (centroids: number[][]) => {
        const newCentroids: number[][] = [];
        for (let i = 0; i < centroids.length; i++) {
            let total = 0;
            let X = 0;
            let y = 0;
            for (let j = 0; j < this.props.global.coordinatesOfNodes.length; j++) {
                if (
                    Math.sqrt(
                        calculateSquaredDistance(centroids[i], this.props.global.coordinatesOfNodes[j].coordinates),
                    ) < this.props.meanShift.windowSize
                ) {
                    total += 1;
                    X += this.props.global.coordinatesOfNodes[j].coordinates[0];
                    y += this.props.global.coordinatesOfNodes[j].coordinates[1];
                }
            }
            if (total !== 0) newCentroids.push([X / total, y / total]);
        }
        return newCentroids;
    };

    calculateLoss = (a: number[][], b: number[][]) => {
        let totalLoss = 0;
        if (a.length === 0 || a.length !== b.length) {
            return 0;
        }

        for (let i = 0; i < a.length; i++) {
            totalLoss += Math.sqrt(calculateSquaredDistance(a[i], b[i]));
        }
        return totalLoss;
    };

    removeDuplicates = (centroids: number[][]) => {
        const visited = new Set();
        for (let i = 0; i < centroids.length; i++) {
            if (visited.has(i)) {
                continue;
            }
            const indices: number[] = [];
            let X = centroids[i][0];
            let y = centroids[i][1];
            for (let j = i + 1; j < centroids.length; j++) {
                if (Math.sqrt(calculateSquaredDistance(centroids[i], centroids[j])) < 35) {
                    indices.push(j);
                    visited.add(j);
                    X += centroids[j][0];
                    y += centroids[j][1];
                }
            }
            X /= indices.length + 1;
            y /= indices.length + 1;
            centroids[i][0] = X;
            centroids[i][1] = y;
            for (let k = 0; k < indices.length; k++) {
                centroids[indices[k]][0] = X;
                centroids[indices[k]][1] = y;
            }
        }
        return centroids;
    };

    handleStart = async () => {
        this.props.resetAlgoData();

        let loss = 1e9;

        let centroids: number[][] = this.state.centroids;

        this.renderPath = [];
        this.renderCentroids(this.state.centroids);

        while (Math.floor(loss) > 0) {
            await new Promise(freeze);
            await new Promise((done) => setTimeout(done, this.props.global.speed * 3));
            const newCentroids = this.calculateCentroids(centroids);
            loss = this.calculateLoss(centroids, newCentroids);

            this.renderPath = [];

            for (let i = 0; i < centroids.length; i++) {
                this.renderPath.push(
                    <g key={i}>
                        <line
                            x1={centroids[i][0]}
                            y1={centroids[i][1]}
                            x2={newCentroids[i][0]}
                            y2={newCentroids[i][1]}
                            stroke="yellow"
                            strokeWidth="2"
                            style={{ markerEnd: 'url(#arrow)' }}
                        />
                    </g>,
                );
            }

            this.setState({ centroids: newCentroids });
            await new Promise(freeze);
            await new Promise((done) => setTimeout(done, this.props.global.speed));
            this.renderPath = [];
            this.renderCentroids(newCentroids);
            centroids = newCentroids;
        }

        centroids = this.removeDuplicates(centroids);
        this.renderCentroids(centroids);
        this.setState({ centroids });

        await new Promise((done) => setTimeout(done, this.props.global.speed * 3));
        const list: React.ReactElement[] = [];

        for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
            let min = 1e9;
            let pos = 0;
            for (let j = 0; j < centroids.length; j++) {
                const dist = Math.sqrt(
                    calculateSquaredDistance(centroids[j], this.props.global.coordinatesOfNodes[i].coordinates),
                );
                if (dist <= min) {
                    min = dist;
                    pos = j;
                }
            }
            list.push(
                <circle
                    key={this.props.global.coordinatesOfNodes[i].id}
                    fill={this.state.colors[pos]}
                    cx={this.props.global.coordinatesOfNodes[i].coordinates[0]}
                    cy={this.props.global.coordinatesOfNodes[i].coordinates[1]}
                    r={this.props.userPreferences.sizeOfPoint}
                    stroke="black"
                    strokeWidth="0.25"
                />,
            );
        }

        for (let i = 0; i < centroids.length; i++) {
            list.push(
                <g key={`c-${i}`}>
                    <rect
                        x={centroids[i][0] - 10}
                        y={centroids[i][1] - 10}
                        width={20 + 10 * (i + 1).toString().length}
                        height="20"
                        style={{ fill: this.state.colors[i] }}
                        stroke="black"
                        strokeWidth="0.25"
                    />
                    <text x={centroids[i][0] - 5} y={centroids[i][1] + 5} style={{ fill: 'black' }}>
                        C{i + 1}
                    </text>
                </g>,
            );
        }

        this.props.setRender(list);
        this.props.endVisualisation();
        this.setState({ start: false });
    };

    componentDidUpdate() {
        if (this.props.global.start) {
            if (!this.state.start) {
                this.setState({ start: true, colors: [], centroids: [] }, () => {
                    this.props.setRender([]);
                    this.renderPath = [];
                    this.generateCentroids(this.handleStart);
                });
            }
        }
    }

    public render() {
        return (
            <g>
                {this.props.global.start && this.props.algorithm.render.length !== 0 ? this.renderPath : null}
                {this.props.algorithm.render}
                {this.props.meanShift.showGuideCircle ? (
                    <ShowCircleSize radius={this.props.meanShift.windowSize} />
                ) : null}
            </g>
        );
    }
}

export default connector(RenderVisualization);
