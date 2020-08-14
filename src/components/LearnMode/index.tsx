import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import KMEANS from "./components/KMEANS";

interface Props {}
interface State {}

class LearnMode extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Paper
        style={{
          position: "fixed",
          right: "10px",
          top: "80px",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "80vh",
          padding: "20px",
          overflow: "auto",
          opacity: "0.95",
        }}
      >
        <KMEANS />
      </Paper>
    );
  }
}

export default LearnMode;
