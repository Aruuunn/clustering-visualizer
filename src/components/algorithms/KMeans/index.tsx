import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import distance from "../../../utils/distance";
import { AlgorithmActionTypes } from "../../../store/types/algorithm.types";
import GlobalActionTypes from "../../../store/types/global.types";
import {colors} from "../../../utils/getRandomColor";


const mapStateToProps = (state: {
  global: {
    coordinatesOfNodes: number[][];
    start: boolean;
    numberOfClusters: number;
  };
  algo: {
    render: any[];
  };
}) => ({ global: state.global, algo: state.algo });

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
  resetAlgoData:() => ({type:AlgorithmActionTypes.RESET_DATA}),
  reduceData:(numberOfNodes:number) => ({type:AlgorithmActionTypes.REDUCE_DATA,payload:numberOfNodes}),
  endVisualization:() => ({type:GlobalActionTypes.END_VISUALIZATION})
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

interface State {
  centroids: number[][]; 
  started: boolean;
}



class KMeans extends Component<Props, State> {
  state = {
    centroids: [],
    started: false,
  };

  handleStep = async () => {
    if (
      !this.props.global.start ||
      this.state.centroids.length === 0 
    ) {
      console.log("CANNOT START VISUALIZATION");
      return;
    }

    for (let i = 0; i < this.props.global.coordinatesOfNodes.length; i++) {
      const currentNode = this.props.global.coordinatesOfNodes[i];

      let min = distance(currentNode, this.state.centroids[0]);
      let pos = 0;

      for (let j = 0; j < this.state.centroids.length; j++) {
        this.props.addToRender(
          <g>
            <circle
              r="10"
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
      await new Promise((done) => setTimeout(() => done(), 10));
      this.props.popRender();
      let dist = distance(currentNode, this.state.centroids[j]);
      if (dist < min) {
        min = dist;
        pos = j;
      }

      }

      await new Promise((done) => setTimeout(() => done(), 10));

    

     this.props.addToRender( <g>
      <line
        stroke={colors(pos)}
        strokeWidth="1.5"
        x1={currentNode[0]}
        y1={currentNode[1]}
        x2={this.state.centroids[pos][0]}
        y2={this.state.centroids[pos][1]}
      />
      <circle
        cx={currentNode[0]}
        cy={currentNode[1]}
        r="9"
        style={{ fill: colors(pos) }}
        stroke={colors(pos)}
        strokeWidth="1"
      />
    </g>);

      await new Promise((done) => setTimeout(() => done(), 10));
    }

    this.props.endVisualization();
    this.setState({started:false});
    
  };

  render() {


    if (this.props.global.start) {

    const { global } = this.props;

    if (!this.state.started) {
      let centroids: number[][] = [];
      let set = new Set();

      for (let i = 0; i < global.numberOfClusters; i++) {
        
        let idx =  Math.floor(Math.random() * global.coordinatesOfNodes.length - 1);

        while(set.has(idx)){
           idx =  Math.floor(Math.random() * global.coordinatesOfNodes.length - 1);
        }

        set.add(idx);
        

        centroids.push(
          global.coordinatesOfNodes[
           idx
          ]
        );
      }
     

      
     
      this.setState((s) => ({
        started: true,
        centroids
      }),() => this.handleStep());

      
      
      return <g/>;
    
    }

   

    


  }

    return (
      <g>
        {this.props.algo.render}
        {this.props.algo.render.length && this.state.centroids.map((o: number[], i: number) => (
          <g key={i}>
            <circle cx={o[0]} cy={o[1]} r="9" style={{ fill: colors(i) }} />
          </g>
        ))}
      </g>
    );
  } 
}

export default connector(KMeans);
