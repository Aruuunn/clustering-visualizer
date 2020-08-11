import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import distance from "../../../utils/distance";

const mapStateToProps = (state: {
  global: {
    coordinatesOfNodes: number[][];
    start: boolean;
    numberOfClusters: number;
  };
}) => ({ global: state.global });

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

interface State {
  centroids: number[][];
}

const colors = ["red", "blue", "green", "yellow"];

class KMeans extends Component<Props, State> {
  state = {
    centroids: [],
  };

  render() {
    if (!this.props.global.start) {
      return <g />;
    }

    const { global } = this.props;

    if (this.state.centroids.length === 0) {
      let centroids: number[][] = [];

      for (let i = 0; i < global.numberOfClusters; i++) {
        centroids.push(
          global.coordinatesOfNodes[
           Math.floor(Math.random() * global.coordinatesOfNodes.length - 1)
          ]
        );
      }

      this.setState({ centroids });
      console.log({centroids});

      return <g/>;
    }

  

    return (
      <g>
        {global.coordinatesOfNodes.map((o: number[], i: number) => {

            let min = distance(o,this.state.centroids[0]);
            let pos = 0;

            for(let i=1;i<this.state.centroids.length;i++){
                let dist = distance(o,this.state.centroids[i]);
                if(dist<min){
                    min = dist;
                    pos = i;
                }
            }

          return (
              <g key={i}>
                  <line stroke={colors[pos]} x1={o[0]} y1={o[1]} x2={this.state.centroids[pos][0]} y2={this.state.centroids[pos][1]}/>
            <circle
              cx={o[0]}
              cy={o[1]}
              r="9"
              style={{ fill: min===0 ?colors[pos]:"white" }}
              stroke={colors[pos]}
              strokeWidth="1"
            /></g>
          );
        })}
      </g>
    );
  }
}

export default connector(KMeans);
