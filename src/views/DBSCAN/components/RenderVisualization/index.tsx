import React, { Component, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import HashTable from '../../../../common/hashtable';
import { ShowCircleSize } from '../../../../components';
import { DBSCANAlgorithmActionTypes, GlobalActionTypes, RootState, AlgorithmActionTypes } from '../../../../reduxStore';
import { Node } from '../../../../reduxStore/reducers/global';
import { getRandomColor, calculateSquaredDistance } from '../../../../utils';
import Speed from '../../../../common/speed.enum';
import Logger from '../../../../common/logger';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    dbscan: state.dbscan,
    userPreference: state.userPreferences,
});
const mapDispatchToProps = {
    endVisualization: () => ({ type: GlobalActionTypes.END_VISUALIZATION }),
    addToRender: (ele: ReactElement) => ({ type: DBSCANAlgorithmActionTypes.ADD_TO_RENDER, payload: ele }),
    setRender: (ele: ReactElement[]) => ({ type: DBSCANAlgorithmActionTypes.SET_RENDER, payload: ele }),
    popRender: () => ({ type: DBSCANAlgorithmActionTypes.POP_RENDER }),
    setSpeed: (sp: Speed) => ({ type: GlobalActionTypes.SET_SPEED, payload: sp }),
    resetAlgoData: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
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

    renderCircles: ReactElement[] = [];
    data: HashTable<null | number> = {};

    componentDidMount() {
        this.props.setSpeed(Speed.faster);
        this.props.resetAlgoData();
        Logger.clear();
    }

    handleClustering = async (startNode: Node) => {
        let stack: Node[] = [startNode];
        let colors: string[] = [...this.state.colors];
        let colorAssigned = false;

        while (stack.length !== 0) {
            const node = stack[0];

            await new Promise((done) => setTimeout(done, 100));

            stack.shift();
            const list: Node[] = [];
            let total = 0;
            let notNew = 0;
            for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
                if (
                    node.id !== this.props.global.coordinatesOfNodes[i].id &&
                    Math.sqrt(
                        calculateSquaredDistance(node.coordinates, this.props.global.coordinatesOfNodes[i].coordinates),
                    ) <= this.props.dbscan.eps
                ) {
                    if (!this.data.hasOwnProperty(`${this.props.global.coordinatesOfNodes[i].id}`))
                        list.unshift(this.props.global.coordinatesOfNodes[i]);
                    else {
                        notNew += 1;
                    }

                    total += 1;
                }
            }
            if (notNew === total) {
                continue;
            }

            if (total + 1 >= this.props.dbscan.minPts) {
                stack = [...stack, ...list];
                if (colorAssigned === false) {
                    colorAssigned = true;
                    const color = getRandomColor(colors.length);
                    colors = [...colors, color];
                    this.setState((s) => ({ ...s, colors }));
                    this.data[`${node.id}`] = colors.length - 1;
                    this.props.addToRender(
                        <circle
                            key={`n-${node.id}`}
                            r={this.props.userPreference.sizeOfPoint}
                            cx={node.coordinates[0]}
                            cy={node.coordinates[1]}
                            fill={colors[colors.length - 1]}
                        />,
                    );
                }
                this.renderCircles = [
                    <circle
                        key={`c-${node.id}`}
                        r={this.props.dbscan.eps}
                        cx={node.coordinates[0]}
                        cy={node.coordinates[1]}
                        stroke={colors[colors.length - 1]}
                        strokeWidth="3"
                        fill="transparent"
                    />,
                ];

                this.props.addToRender(
                    <circle
                        key={`c -${node.id}`}
                        r={this.props.dbscan.eps}
                        cx={node.coordinates[0]}
                        cy={node.coordinates[1]}
                        stroke={colors[colors.length - 1]}
                        strokeWidth="3"
                        fill={colors[colors.length - 1]}
                        opacity="0.06"
                    />,
                );

                for (let i = 0; i < list.length; i++) {
                    this.data[`${list[i].id}`] = colors.length - 1;
                    this.props.addToRender(
                        <circle
                            key={`n-${list[i].id}`}
                            r={this.props.userPreference.sizeOfPoint}
                            cx={list[i].coordinates[0]}
                            cy={list[i].coordinates[1]}
                            fill={colors[colors.length - 1]}
                            stroke="black"
                            strokeWidth="0.5"
                        />,
                    );
                }
            }
            await new Promise((done) => setTimeout(done, this.props.global.speed));
        }

    };

    handleStart = async () => {

        if (!this.state.start) {
            return;
        }
        this.props.resetAlgoData();
        for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
            if (!this.data.hasOwnProperty(`${this.props.global.coordinatesOfNodes[i].id}`)) {
                await this.handleClustering(this.props.global.coordinatesOfNodes[i]);
            }
        }
        this.renderCircles = [];
        this.data = {};
        this.props.endVisualization();
        this.setState({ colors: [], start: false });
    };

    componentDidUpdate(prevProps: Props) {
        if (this.props.global.start && !this.state.start) {
            this.setState({ start: true }, () => this.handleStart());
        }
    }

    componentWillUnmount(){
        Logger.clear();
    }

    render() {
        return (
            <g>
                {this.props.global.start && this.renderCircles}

                {this.props.dbscan.render}
                {this.props.dbscan.showGuideCircle ? <ShowCircleSize radius={this.props.dbscan.eps} /> : null}
            </g>
        );
    }
}

export default connector(RenderVisualisation);
