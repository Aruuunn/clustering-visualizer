import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import distance from "../../../utils/distance";
import { AlgorithmActionTypes } from "../../../store/types/algorithm.types";
import GlobalActionTypes from "../../../store/types/global.types";
import { getColor } from "../../../utils/getRandomColor";
import Speed from "../../../common/speed.enum";
import {Node} from '../../../store/reducers/global';

const mapStateToProps = (state: {
  global: {
    coordinatesOfNodes: Node[];
    start: boolean;
    numberOfClusters: number;
    speed: Speed;
  },
  algo: {
    render: any[];
  },
  user: {
    sizeOfPoint:number;
  }
}) => ({ global: state.global, algo: state.algo ,userPreference: state.user});

const mapDispatchToProps = {
  addToRender: (data: any) => ({
    type: AlgorithmActionTypes.ADD_TO_RENDER,
    payload: data,
  }),
  popRender: () => ({ type: AlgorithmActionTypes.POP_RENDER }),
  setRender: (data: any) => ({
    type: AlgorithmActionTypes.SET_RENDER,
    payload: data,
  }),
  resetAlgoData: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
  reduceData: (numberOfNodes: number) => ({
    type: AlgorithmActionTypes.REDUCE_DATA,
    payload: numberOfNodes,
  }),
  endVisualization: () => ({ type: GlobalActionTypes.END_VISUALIZATION }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

interface State {
  centroids: number[][];
  started: boolean;
  colors: string[];
}

class KMeans extends Component<Props, State> {
  state = {
    centroids: [],
    started: false,
    colors: [],
  };

  calculateNewCentroids = (clusters: number[][][]) => {
    const centroids: number[][] = Array.from(
      { length: this.state.centroids.length },
      () => new Array(2).fill(0)
    );
    console.log("CLUSTERS", { clusters, centroids }, centroids[0][0]);

    for (let iter = 0; iter < clusters.length; iter++) {
      const cluster = clusters[iter];
      if (!cluster.length) {
        continue;
      }
      let X = 0,
        Y = 0;
      for (let i = 0; i < cluster.length; i++) {
        X += cluster[i][0];
        Y += cluster[i][1];
      }
      X = X / cluster.length;
      Y = Y / cluster.length;
      console.log({ X, Y });
      centroids[iter][0] = X;
      centroids[iter][1] = Y;
    }

    let loss = 0;
    for (let iter = 0; iter < this.state.centroids.length; iter++) {
      loss +=
        Math.abs(this.state.centroids[iter][0] - centroids[iter][0]) +
        Math.abs(this.state.centroids[iter][1] - centroids[iter][1]);
    }

    return { centroids, loss };
  };

  handleStart = async () => {
    if (!this.props.global.start || this.state.centroids.length === 0) {
      console.log("CANNOT START VISUALIZATION");
      return;
    }

    let loss = 1000,
      iter = 0;

    while (Math.floor(loss) > 0) {
      this.props.resetAlgoData();

      const clusters: number[][][] = Array.from(
        { length: this.state.centroids.length },
        () => new Array(0)
      );

      for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
        const currentNode = this.props.global.coordinatesOfNodes[i].coordinates;

        let min = distance(currentNode, this.state.centroids[0]);
        let pos = 0;

        for (let j = 0; j < this.state.centroids.length; j++) {
          this.props.addToRender(
            <g key={`a-${j}-${iter}`}>
              <circle
                r={this.props.userPreference.sizeOfPoint+1}
                cx={currentNode[0]}
                cy={currentNode[1]}
                style={{ fill: "yellow" }}
              />
              <line
                x1={this.state.centroids[j][0]}
                y1={this.state.centroids[j][1]}
                x2={currentNode[0]}
                y2={currentNode[1]}
                stroke="yellow"
                strokeWidth="2.5"
              />
            </g>
          );
          await new Promise((done) =>
            setTimeout(() => done(), this.props.global.speed)
          );
          this.props.popRender();
          let dist = distance(currentNode, this.state.centroids[j]);
          if (dist < min) {
            min = dist;
            pos = j;
          }
        }

        clusters[pos].push(currentNode);

        await new Promise((done) =>
          setTimeout(() => done(), this.props.global.speed)
        );

        this.props.addToRender(
          <g key={`b-${i}-${iter}`}>
            <line
              stroke={this.state.colors[pos]}
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
              style={{ fill: this.state.colors[pos] }}
              stroke={this.state.colors[pos]}
              strokeWidth="1"
            />
          </g>
        );

        await new Promise((done) =>
          setTimeout(() => done(), this.props.global.speed)
        );
      }
      let result = this.calculateNewCentroids(clusters);
      let temp = this.state.centroids;
      console.log("RESULT", result, result.centroids[0]);
      loss = result.loss;
      this.setState({ centroids: result.centroids });
      await new Promise((done) =>
        setTimeout(() => done(), this.props.global.speed)
      );
      iter += 1;

      this.renderCentroids = [];
      for (let iter = 0; iter < result.centroids.length; iter++) {
        this.renderCentroids.push(
          <g key={`d-${iter}`}>
            {Math.floor(
              Math.abs(temp[iter][0] - result.centroids[iter][0]) +
                Math.abs(temp[iter][1] - result.centroids[iter][1])
            ) > 0 ? (
              <line
                x1={temp[iter][0]}
                y1={temp[iter][1]}
                x2={result.centroids[iter][0]}
                y2={result.centroids[iter][1]}
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4"
                style={{ markerEnd: "url(#markerArrow)" }}
              />
            ) : null}

            <rect
              x={result.centroids[iter][0] - 10}
              y={result.centroids[iter][1] - 10}
              width={20 + 10 * (iter + 1).toString().length}
              height="20"
              style={{ fill: this.state.colors[iter] }}
              stroke="black"
              strokeWidth="0.25"
            />
            <text
              x={result.centroids[iter][0] - 5}
              y={result.centroids[iter][1] + 5}
              style={{ fill: "black" }}
            >
              C{iter + 1}
            </text>
          </g>
        );
      }
    }

    this.props.endVisualization();
    this.setState({ started: false });
  };

  renderCentroids: any[] = [];

  componentDidUpdate() {
    if (this.props.global.start) {
      const { global } = this.props;

      if (!this.state.started) {
        let centroids: number[][] = [];
        let set = new Set();

        for (let i = 0; i < global.numberOfClusters; i++) {
          let idx = Math.floor(
            Math.random() * global.coordinatesOfNodes.length - 1
          );

          while (set.has(idx) || !global.coordinatesOfNodes[idx]) {
            idx = Math.floor(
              Math.random() * global.coordinatesOfNodes.length - 1
            );
          }

          set.add(idx);

          centroids.push(global.coordinatesOfNodes[idx].coordinates);
        }

        let colors: string[] = [];

        for (let iter = 0; iter < this.props.global.numberOfClusters; iter++) {
          colors.push(getColor(iter));
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
                style={{ fill: colors[iter] }}
                stroke="black"
                strokeWidth="0.25"
              />
              <text
                x={centroids[iter][0] - 5}
                y={centroids[iter][1] + 5}
                style={{ fill: "black" }}
              >
                C{iter + 1}
              </text>
            </g>
          );
        }

        console.log({ centroids, colors });

        this.setState(
          (s) => ({
            started: true,
            centroids,
            colors,
          }),
          () => this.handleStart()
        );
      }
    }
  }

  render() {
    return (
      <g>
        {this.props.algo.render}
        {this.props.algo.render.length && this.renderCentroids}
      </g>
    );
  }
}

export default connector(KMeans);
