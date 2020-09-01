import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { GlobalActionTypes, MeanShiftActionTypes, RootState } from '../../../../reduxStore';
import { calculateSquaredDistance, getRandomColor } from '../../../../utils';

const mapStateToProps = (state: RootState) => ({
    userPreferences: state.userPreferences,
    global: state.global,
    meanShift: state.meanShift,
});

const mapDispatchToProps = {
    addToRender: (ele: React.ReactElement) => ({ type: MeanShiftActionTypes.ADD_TO_RENDER, payload: ele }),
    endVisualisation: () => ({ type: GlobalActionTypes.END_VISUALIZATION }),
    setRender: (ele: React.ReactElement[]) => ({ type: MeanShiftActionTypes.SET_RENDER, payload: ele }),
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
                    <g transform={`translate(${centroids[i][0] - 15},${centroids[i][1] - 15.5})`}>
                        <path
                            fill={this.state.colors[i]}
                            transform="scale(1.5)"
                            d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"
                        />
                    </g>
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
        let loss = 1e9;

        let centroids: number[][] = this.state.centroids;

        const allCentroids: number[][][] = [this.state.centroids];

        this.renderPath = [];
        this.renderCentroids(this.state.centroids);
        while (Math.floor(loss) > 0) {
            await new Promise((done) => setTimeout(done, this.props.global.speed * 3));
            const newCentroids = this.calculateCentroids(centroids);
            loss = this.calculateLoss(centroids, newCentroids);
            allCentroids.push(newCentroids);
            this.renderPath = [];
            for (let i = 0; i < centroids.length; i++) {
                let points = '';
                for (let j = 0; j < allCentroids.length; j++) {
                    points += `${allCentroids[j][i][0]} ${allCentroids[j][i][1]}${
                        j + 1 < allCentroids.length ? ',' : ''
                    }`;
                }
                this.renderPath.push(
                    <polyline
                        fill="none"
                        points={points}
                        key={this.renderPath.length}
                        stroke="yellow"
                        strokeWidth="4"
                        style={{ markerEnd: 'url(#arrow)' }}
                    />,
                );
            }
            this.renderCentroids(newCentroids);
            this.setState({ centroids: newCentroids });
            centroids = newCentroids;
        }

        centroids = this.removeDuplicates(centroids);
        this.renderCentroids(centroids);
        this.setState({ centroids });

        await new Promise((done) => setTimeout(done, this.props.global.speed * 3));
        const list: React.ReactElement[] = [];
        console.time('calc clusters');
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
                />,
            );
        }

        for (let i = 0; i < centroids.length; i++) {
            list.push(
                <g key={`c-${i}`}>
                    <g transform={`translate(${centroids[i][0] - 15},${centroids[i][1] - 15.5})`}>
                        <path
                            fill={'#FFBF00'}
                            transform="scale(1.5)"
                            d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"
                        />
                    </g>
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
                {this.props.global.start && this.props.meanShift.render.length !== 0 ? this.renderPath : null}
                {this.props.meanShift.render}
            </g>
        );
    }
}

export default connector(RenderVisualization);
