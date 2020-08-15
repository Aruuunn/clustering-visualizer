import React, { ReactElement, ChangeEvent, useState } from "react";
import {
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
  Grid,
  Button,
  makeStyles,
  fade,
  InputBase,
  Divider,
  Slider,
  Typography,
} from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";

import { AlgorithmNames } from "../../common/algorithms.enum";
import GlobalActionTypes from "../../store/types/global.types";
import UserDataActionTypes from "../../store/types/userData.types";
import AlgorithmActionTypes from "../../store/types/algorithm.types";
import Speed from "../../common/speed.enum";

const mapStateToProps = (state: any) => ({
  global: state.global,
  userPreference: state.user,
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
  resetAlgorithmData: () => ({ type: AlgorithmActionTypes.RESET_DATA }),
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
};

const useStyles = makeStyles((theme) => ({
  input: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon

    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function Drawer(props: Props): ReactElement {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (parseInt(e.target.value) >= 0) {
      props.changeNumberOfClusters(parseInt(e.target.value));
    } else {
      props.changeNumberOfClusters(0);
    }
  };

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
            <Grid container justify="center" alignItems="center">
              {props.global.algorithm === AlgorithmNames.KMEANS ? (
                <InputBase
                  placeholder="Number of Clusters"
                  style={{
                    width: "100%",
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: "10px",
                    maxWidth: "500px",
                  }}
                  fullWidth
                  color="secondary"
                  value={
                    props.global.numberOfClusters === 0
                      ? ""
                      : props.global.numberOfClusters
                  }
                  onChange={handleInputChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  className={classes.input}
                  type="number"
                />
              ) : null}
            </Grid>
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
                disabled={props.isDisabled()}
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
              <Button
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
              </Button>
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
             onClick={() => props.resetAlgorithmData()}
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
            onClick={() => {props.clearPoints();props.resetAlgorithmData()}}
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
