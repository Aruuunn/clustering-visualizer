import * as React from "react";
import KMeans from "../algorithms/KMeans";
import { connect, ConnectedProps } from "react-redux";
import GlobalActionTypes from "../../store/types/global.types";

const mapStateToProps = (state: any) => ({ global: state.global });

const mapDispatchToProps = {
  setCoordinates: (coordinates: number[][]) => ({
    type: GlobalActionTypes.SET_COORDINATES_OF_NODES,
    payload: coordinates,
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
      [X, Y],
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
              <path d="M2,2 L2,11 L10,6 L2,2" fill="white"/>
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
            (o: number[], i: number) => (
              <g key={i}>
                <circle
                  cx={o[0]}
                  cy={o[1]}
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
