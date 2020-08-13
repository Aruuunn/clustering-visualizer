import * as React from "react";
import KMeans from "../algorithms/KMeans";
import { connect, ConnectedProps } from "react-redux";
import GlobalActionTypes from "../../store/types/global.types";
import {Node} from '../../store/reducers/global';

const mapStateToProps = (state: any) => ({ global: state.global });

const mapDispatchToProps = {
  setCoordinates: (coordinates: Node[]) => ({
    type: GlobalActionTypes.SET_COORDINATES_OF_NODES,
    payload: coordinates,
  }),
  updateCoordinates:(node :Node) => ({type:GlobalActionTypes.UPDATE_COORDINATES,payload:node})
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IBoardProps = PropsFromRedux;

class Board extends React.Component<IBoardProps, any> {
  constructor(props: IBoardProps) {
    super(props);
    this.state = {
      bg: React.createRef(),
    };
  }

  handleMove = (event: any,id:number) => {

    event.persist();
    const currentNode = event.target;
    let X =0, Y =0;

    const handleMove = (event:any) => {
   
       X = event.clientX - this.state.bg.current.getBoundingClientRect().left;
       Y = event.clientY - this.state.bg.current.getBoundingClientRect().top;
      currentNode.setAttribute("cx", X);
      currentNode.setAttribute("cy", Y);  
      this.props.updateCoordinates({id,coordinates:[X,Y]});

    }

    const removeListeners = () => { 

      this.state.bg.current.removeEventListener('pointermove',handleMove);
      this.state.bg.current.removeEventListener('pointerup',removeListeners);
    }
  
    this.state.bg.current.addEventListener('pointermove', handleMove);


  this.state.bg.current.addEventListener('pointerup',removeListeners);
  
  
  };

  handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.persist();
    const target = event.target as SVGSVGElement;
    const X = event.clientX - target.getBoundingClientRect().left;
    const Y = event.clientY - target.getBoundingClientRect().top;

    if (X <= 20 || Y <= 20 || !X || !Y) {
      return;
    }

    this.props.setCoordinates([
      ...this.props.global.coordinatesOfNodes,
     { coordinates: [X, Y] ,id:this.props.global.coordinatesOfNodes.length},
    ]);
  };

  public render() {
    return (
      <div>
        <svg
          width="100%"
          height="100vh"
          ref={this.state.bg}
          onClick={this.handleClick}
        >
          <defs>
            <marker
              id="markerArrow"
              markerWidth="10"
              markerHeight="10"
              refX="23"
              refY="6"
              orient="auto"
            >
              <path d="M2,2 L2,11 L10,6 L2,2" fill="white" />
            </marker>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#434343", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(0,0,0)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" style={{ fill: "url(#grad1)" }} />

          {this.props.global.coordinatesOfNodes.map(
            (o: Node) => (
              <g key={o.id} onPointerDown={(e: React.PointerEvent<SVGSVGElement>) => !this.props.global.start ?this.handleMove(e,o.id):null}>
                <circle
                  cx={o.coordinates[0]}
                  cy={o.coordinates[1]}
                  r="9"
                  style={{ fill: "white" }}
                  stroke="black"
                  strokeWidth="1.5"
                />
              </g>
            )
          )}
          <KMeans />
        </svg>
      </div>
    );
  }
}

export default connector(Board);
