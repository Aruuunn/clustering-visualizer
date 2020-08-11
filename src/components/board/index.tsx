import * as React from 'react';
import styles from './styles.module.css';
import { AlgorithmNames } from '../../common/algorithms.enum';
import KMeans from '../algorithms/KMeans';

export interface IBoardProps {
  algorithm:AlgorithmNames,
  numberOfClusters:number
}

export default class Board extends React.Component<IBoardProps ,any> {
  
  constructor(props:IBoardProps){
      super(props);
      this.state = {
          bg:React.createRef(),
          nodes:[],
          coordinates:[]
      }
  }
  handleClick = (event:React.MouseEvent<SVGSVGElement>) => {
    const target = event.target as SVGSVGElement;
    let nodeX = event.clientX - target.getBoundingClientRect().left;
    let nodeY = event.clientY - target.getBoundingClientRect().top;
    this.setState((s:any) => {
        return {...s,coordinates:[...s.coordinates, [nodeX , nodeY]],nodes:[...s.nodes,<g><circle stroke="black" strokeWidth="1.5" style={{fill:'white'}} cx={nodeX} cy={nodeY} r="6"/></g>]}
    })
  }


  public render() {
      
    return (
      <div>
        <svg width="100%" style={{height:'100vh'}} ref={this.state.bg} className={styles.bg} onClick={this.handleClick}>
   {this.state.nodes}
         <KMeans numberOfClusters={this.props.numberOfClusters} nodes={this.state.coordinates}/>
        </svg>
      </div>
    );
  }
}
