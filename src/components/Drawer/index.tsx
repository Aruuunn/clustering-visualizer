import React, { ReactElement } from "react";
import {
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
  Grid,
  Button,
  Divider,
  Slider,
  Typography,
  SvgIcon
} from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";

import { AlgorithmNames } from "../../common/algorithms.enum";
import GlobalActionTypes from "../../reduxStore/types/Global.types";
import UserDataActionTypes from "../../reduxStore/types/UserPreferences.types";
import AlgorithmActionTypes from "../../reduxStore/types/KMEANS.algorithm.types";
import Speed from "../../common/speed.enum";
import BlueButton from "../../common/BlueButton";
import { RootState } from "../../reduxStore";
import { useHistory } from "react-router-dom";


const mapStateToProps = (state: RootState) => ({
  global: state.global,
  userPreference: state.userPreferences,
});

const mapDispatchToProps = {
  changeNumberOfClusters: (numberOfClusters: number) => ({
    type: GlobalActionTypes.SET_NUMBER_OF_CLUSTERS,
    payload: numberOfClusters,
  }),
  changeAlgorithm: (algo: AlgorithmNames) => ({
    type: GlobalActionTypes.SET_ALGORITHM,
    payload: algo,
  }),
  reset: () => ({ type: GlobalActionTypes.RESET }),
  startVisualization: () => ({ type: GlobalActionTypes.START_VISUALIZATION }),
  resetAlgorithmVisualization: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
  setSpeed: (speed: Speed) => ({
    type: GlobalActionTypes.SET_SPEED,
    payload: speed,
  }),
  setPointSize: (size: number | number[]) => ({
    type: UserDataActionTypes.SET_SIZE_OF_POINT,
    payload: size,
  }),
  clearPoints: () => ({ type: GlobalActionTypes.RESET }),
};


const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleAlgorithmMenu: (event: React.SyntheticEvent<Element, Event>) => void;
  handleSpeeMenu: (event: React.SyntheticEvent<Element, Event>) => void;
  isDisabled: () => boolean;
  children?:ReactElement| ReactElement[];
};



function Drawer(props: Props): ReactElement {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  return (
    <div>
      <SwipeableDrawer anchor={sm ? "bottom" : "left"} {...props}>
        {sm ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ padding: "10px" }}
          >
            {" "}
            {props.children}
            
            <Grid container justify="center" alignItems="center">
              <Button
                variant="contained"
                onClick={props.handleAlgorithmMenu}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: "10px",
                }}
                startIcon={   <SvgIcon>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </SvgIcon>}
              >
                {" "}
                {props.global.algorithm === null
                  ? "Select Algorithm"
                  : props.global.algorithm}
              </Button>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Button
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: "10px",
                }}
                variant="contained"
                aria-haspopup="true"
                onClick={props.handleSpeeMenu}
                startIcon={
                  <SvgIcon>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </SvgIcon>
                }
              >
                {props.global.speed === null
                  ? "Select Speed"
                  : props.global.speed === Speed.slow
                  ? "Slow"
                  : props.global.speed === Speed.average
                  ? "Average"
                  : props.global.speed === Speed.fast
                  ? "Fast"
                  : "Faster"}
              </Button>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <BlueButton
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: "10px",
                }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  props.startVisualization();
                  props.onClose();
                }}
                disabled={props.isDisabled()}
              >
                Start
              </BlueButton>
            </Grid>{" "}
          </Grid>
        ) : null}
        <Divider style={{ margin: "30px" }} />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{
            padding: "10px",
          }}
        >
          <Grid
            container
            justify="center"
            style={{
              minWidth: sm ? "100px" : "300px",
              maxWidth: "500px",
              padding: "10px",
            }}
            alignItems="center"
          >
            <Typography gutterBottom style={{ width: "100%" }}>
              Change size of the points
            </Typography>
            <Slider
              value={props.userPreference.sizeOfPoint}
              onChange={(e, value) => props.setPointSize(value)}
              color="secondary"
              min={5}
              max={15}
              marks
              valueLabelDisplay="auto"
              step={1}
            />
          </Grid>
          <Grid container justify="center" alignItems="center" >
            <Button
             onClick={() => props.resetAlgorithmVisualization()}
              style={{
                width: "100%",
                maxWidth: "500px",
                marginLeft: 0,
                marginRight: 0,
                marginTop: "10px",
              }}
              variant="contained"
            > Clear Visualization</Button>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Button
            onClick={() => {props.clearPoints();props.resetAlgorithmVisualization()}}
              style={{
                width: "100%",
                maxWidth: "500px",
                marginLeft: 0,
                marginRight: 0,
                marginTop: "10px",
              }}
              variant="contained"
            > Clear Data Points</Button>
          </Grid>
        </Grid>
      </SwipeableDrawer>
    </div>
  );
}

export default connector(Drawer);
