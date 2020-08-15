import React, { Component } from "react";
import { Paper } from "@material-ui/core";

import KMEANS from "./components/KMEANS";
import Container from "./components/Container";

interface Props {}
interface State {}

class LearnMode extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Container>
        <KMEANS />
      </Container>
    );
  }
}

export default LearnMode;
