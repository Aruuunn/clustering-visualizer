import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { GlobalActionTypes, MeanShiftActionTypes, RootState } from '../../../../reduxStore';
import { calculateSquaredDistance, getRandomColor } from '../../../../utils';
import { Node } from '../../../../reduxStore/reducers/global';

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
                colors.push(getRandomColor(this.props.global.coordinatesOfNodes[i].id));
            }
        }

        this.setState({ centroids, colors }, () => (callback ? callback() : null));
    };

    renderCentroids = (centroids: number[][]) => {
        this.props.setRender([]);
        for (let i = 0; i < centroids.length; i++) {
            this.props.addToRender(
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
                    <circle
                        cx={centroids[i][0]}
                        cy={centroids[i][1]}
                        r={this.props.userPreferences.sizeOfPoint}
                        fill={this.state.colors[i]}
                    />
                </g>,
            );
        }
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

    handleStart = async () => {
        let loss = 1e9;

        let centroids: number[][] = this.state.centroids;

        const allCentroids: number[][][] = [this.state.centroids];

        this.renderPath = [];
        this.renderCentroids(this.state.centroids);
        while (Math.floor(loss) > 0) {
            await new Promise((done) => setTimeout(done, this.props.global.speed));
            const newCentroids = this.calculateCentroids(centroids);
            loss = this.calculateLoss(centroids, newCentroids);
            allCentroids.push(newCentroids);
            this.renderPath = [];
            for (let i = 0; i < centroids.length; i++) {
                let points = '';
                for (let j = 0; j < allCentroids.length; j++) {
                    points += `${allCentroids[j][i][0]} ${allCentroids[j][i][1]},`;
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
        this.props.endVisualisation();
        this.setState({ start: false });
    };

    componentDidUpdate() {
        if (this.props.global.start) {
            if (!this.state.start) {
                this.setState({ start: true }, () => this.generateCentroids(this.handleStart));
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
