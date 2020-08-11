import * as React from "react";
import styles from "./styles.module.css";
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
    const target = event.target as SVGSVGElement;
    let nodeX = event.clientX - target.getBoundingClientRect().left;
    let nodeY = event.clientY - target.getBoundingClientRect().top;

    this.props.setCoordinates([
      ...this.props.global.coordinatesOfNodes,
      [nodeX, nodeY],
    ]);
  };

  public render() {
    return (
      <div>
        <svg
          width="100%"
          style={{ height: "100vh" }}
          ref={this.state.bg}
          className={styles.bg}
          onClick={this.handleClick}
        >
          {this.props.global.coordinatesOfNodes.map(
            (o: number[], i: number) => (
              <g key={i}>
                <circle
                  cx={o[0]}
                  cy={o[1]}
                  r="9"
                  style={{ fill: "white" }}
                  stroke="black"
                  strokeWidth="1"
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
