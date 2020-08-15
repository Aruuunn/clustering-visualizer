import React, { ReactElement, useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";

import { connect, ConnectedProps } from "react-redux";

import BlueButton from "../BlueButton";
import KMEANSMode from "../../common/kmeans.mode.enum";
import GlobalActionTypes from "../../store/types/global.types";

const mapStateToProps = (state: any) => ({ global: state.global });

const mapDispatchToProps = {
  setMode:(mode:KMEANSMode) => ({type:GlobalActionTypes.SET_ITERATION_MODE,payload:mode}),
  setMaxIterations:(maxIter:number) => ({type:GlobalActionTypes.SET_MAX_ITERATIONS,payload:maxIter})
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onClose:() => void;
  open:boolean;
};

function IterationModeDialog(props: Props): ReactElement {
  const [state, setState] = useState(0);
  const [inputs, setInput] = useState({ input1: "", input2: "" });

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {state === 0 ? (
        <div>
          <DialogTitle>Iteration Mode for K Means</DialogTitle>
          <List>
            <ListItem button onClick={() => {
              props.setMode(KMEANSMode.SingleIteration);
              props.onClose();
            }}>
              <ListItemText primary="Single Iteration" />
              <Divider />
            </ListItem>
            <ListItem button onClick={() => setState(1)}>
              <ListItemText primary="Multiple Iterations" />
            </ListItem>{" "}
            <ListItem button onClick={() => setState(2)}>
              <ListItemText primary="Find the best value for K (Recommended if you don't know value of K)" />
            </ListItem>
          </List>
        </div>
      ) : state === 1 ? (
        <div style={{ margin: "5px", padding: "10px" }}>
          <DialogTitle>Max Iterations</DialogTitle>
          <TextField
            color="secondary"
            value={inputs.input1}
            onChange={(e) => {
              e.persist();
              setInput((s) => ({ ...s, input1: e.target.value }));
            }}
            variant="outlined"
            inputProps={{ min: 0 }}
            type="number"
            style={{ display: "block" }}
          />
          <BlueButton
            variant="contained"
            style={{ marginTop: "5px" }}
            onClick={() => {
              props.setMaxIterations(parseInt(inputs.input1));
              props.setMode(KMEANSMode.MultipleIteration);
              props.onClose();
            }}
            disabled={
              inputs.input1.trim() === "" || parseInt(inputs.input1) < 2
            }
          >
            Save
          </BlueButton>
        </div>
      ) : (
        <Grid
          container
          justify="center"
          style={{ margin: "5px", padding: "10px" }}
        >
          <DialogTitle>What is the maximum value of K?</DialogTitle>
          <div>
            <TextField
              color="secondary"
              value={inputs.input2}
              onChange={(e) => {
                e.persist();
                setInput((s) => ({ ...s, input2: e.target.value }));
              }}
              variant="outlined"
              inputProps={{ min: 0 }}
              type="number"
              style={{ display: "block" }}
            />
            <BlueButton
              variant="contained"
              style={{ marginTop: "5px" }}
              onClick={() => {
                props.setMaxIterations(parseInt(inputs.input2));
                props.setMode(KMEANSMode.PlotKversusVariance);
                props.onClose();
              }}
              disabled={
                inputs.input2.trim() === "" || parseInt(inputs.input2) < 2
              }
            >
              Save
            </BlueButton>
          </div>
        </Grid>
      )}
    </Dialog>
  );
}

export default connector(IterationModeDialog);
