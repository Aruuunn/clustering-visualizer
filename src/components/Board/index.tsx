import * as React from "react";
import KMeans from "../algorithms/KMeans";
import { connect, ConnectedProps } from "react-redux";
import GlobalActionTypes from "../../store/types/global.types";
import { Node } from "../../store/reducers/global";
import { Fab, Grow, Slide  } from "@material-ui/core";
import LearnIcon from "../../assets/learn.svg";
import LearnMode from '../LearnMode';
import Gradients from '../../common/Gradients';

const mapStateToProps = (state: any) => ({ global: state.global ,userPreference:state.user});

const mapDispatchToProps = {
  setCoordinates: (coordinates: Node[]) => ({
    type: GlobalActionTypes.SET_COORDINATES_OF_NODES,
    payload: coordinates,
  }),
  updateCoordinates: (node: Node) => ({
    type: GlobalActionTypes.UPDATE_COORDINATES,
    payload: node,
  }),
  setLearnMode: (mode: boolean) => ({
    type: GlobalActionTypes.SET_LEARN_MODE,
    payload: mode,
  }),
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
  componentDidUpdate(){
    this.state.bg.current.addEventListener('touchmove', (e:any) => e.preventDefault())
  }

  handleMove = (event: any, id: number) => {
    event.persist();
    const currentNode = event.target;
    let X = 0,
      Y = 0;

    const handleMove = (event: any) => {
      X = event.clientX - this.state.bg.current.getBoundingClientRect().left;
      Y = event.clientY - this.state.bg.current.getBoundingClientRect().top;
      currentNode.setAttribute("cx", X);
      currentNode.setAttribute("cy", Y);
      this.props.updateCoordinates({ id, coordinates: [X, Y] });
    };

    const removeListeners = () => {
      this.state.bg.current.removeEventListener("pointermove", handleMove);
      this.state.bg.current.removeEventListener("pointerup", removeListeners);
    };

    this.state.bg.current.addEventListener("pointermove", handleMove);

    this.state.bg.current.addEventListener("pointerup", removeListeners);
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
      { coordinates: [X, Y], id: this.props.global.coordinatesOfNodes.length },
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
            
          </defs>
          <Gradients/> 

          <rect width="100%" height="100%" style={{ fill: "url(#Deep-Space)" }} />

          {this.props.global.coordinatesOfNodes.map((o: Node) => (
            <g
              key={o.id}
              onPointerDown={(e: React.PointerEvent<SVGSVGElement>) =>
                !this.props.global.start ? this.handleMove(e, o.id) : null
              }
             
              
            >
              <circle
                cx={o.coordinates[0]}
                cy={o.coordinates[1]}
                r={this.props.userPreference.sizeOfPoint || 9}
                style={{ fill: "white" }}
                stroke="grey"
                strokeWidth='0.5'
                
              />
            </g>
          ))}
          <KMeans />
        </svg>
    
        <Grow in={!this.props.global.learnMode &&  this.props.global.algorithm!==null}>
          <Fab
            aria-label="Learn Mode"
            style={{ position: "absolute", right: "20px", bottom: "20px" }}
            onClick={() => this.props.setLearnMode(true)}
            color="secondary"
          >
            <img src={LearnIcon} alt="learn mode" />
          </Fab>
        </Grow> 
        <Slide in={this.props.global.learnMode} direction="left" >
          <LearnMode />
        </Slide>
      </div>
    );
  } 
}

export default connector(Board);
