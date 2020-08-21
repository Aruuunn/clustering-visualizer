import React, { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";

import KMEANSMode from "../../common/kmeans.mode.enum";
import Board from "../../components/Board";
import RenderVisualization from "./components/RenderVisualization";
import NavBar from "./components/NavBar";
import { RootState } from "../../reduxStore";
import InfoModal from "./components/InfoModal";

const mapStateToProps = (state: RootState) => ({
  global: state.global,
  kmeans: state.kmeans,
  userPreference: state.userPreferences,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function KMEANS(props: Props): ReactElement {
  return (
    <div>
      <NavBar />
      <Board component={<RenderVisualization />} />
      {props.kmeans.info === null ||
      (props.kmeans.currentIteration === null &&
        props.kmeans.mode === KMEANSMode.MultipleIteration) ? null : (
        <InfoModal />
      )}
    </div>
  );
}

export default connector(KMEANS);
