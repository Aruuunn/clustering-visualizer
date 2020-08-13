import React, { Component, SyntheticEvent, ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  InputBase,
  withStyles,
  fade,
} from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";

import logo from "../../assets/logo.svg";
import { AlgorithmNames } from "../../common/algorithms.enum";
import GlobalActionTypes from "../../store/types/global.types";
import AlgorithmActionTypes from '../../store/types/algorithm.types';
import './styles.css';
import Speed from "../../common/speed.enum";

// define types of Props and State

interface State {
  anchor1: (EventTarget & Element) | null;
  anchor2: (EventTarget & Element) | null;

}

// define mapStateToProps and mapDispatchToProps
const mapStateToProps = (state: any) => ({ global: state.global });

const mapDispatchToProps = {
  changeNumberOfClusters: (numberOfClusters:number) => ({type:GlobalActionTypes.SET_NUMBER_OF_CLUSTERS,payload:numberOfClusters}),
  changeAlgorithm:(algo:AlgorithmNames) => ({type:GlobalActionTypes.SET_ALGORITHM,payload:algo}),
  reset:() => ({type:GlobalActionTypes.RESET}),
  startVisualization:() => ({type:GlobalActionTypes.START_VISUALIZATION}),
  resetAlgorithmData:() => ({type:AlgorithmActionTypes.RESET_DATA}),
  setSpeed:(speed:Speed) => ({type:GlobalActionTypes.SET_SPEED,payload:speed})
};

const connector = connect(mapStateToProps, mapDispatchToProps);


type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  classes: any;
};



// NavBar
class NavBar extends Component<Props, State> {
  state = { anchor1: null,anchor2:null };

  handleSpeeMenu= (event: SyntheticEvent) => {
    this.setState({ anchor2: event.currentTarget });
  };
  handleAlgorithmMenu= (event: SyntheticEvent) => {
    this.setState({ anchor1: event.currentTarget });
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (parseInt(e.target.value) >= 0) {
      this.props.changeNumberOfClusters(parseInt(e.target.value));
    } else {
      this.props.changeNumberOfClusters(0);
    }
  };

  handleSpeeMenuClose = (speed:  Speed | null) => {
    this.setState({ anchor2:null });
    if (speed !== null)
      switch(speed){
    
      case Speed.slow:
        this.props.setSpeed(Speed.slow);
        break;
      case Speed.average:
        this.props.setSpeed(Speed.average);
        break;
      case Speed.fast:
        this.props.setSpeed(Speed.fast);
        break;
      case Speed.faster:
        this.props.setSpeed(Speed.faster);
      break;
      
      
      }
  };

  handleAlgorithmClose = (algo: AlgorithmNames| null) => {
    this.setState({ anchor1: null});
    if (algo !== null)
      switch(algo){
        case AlgorithmNames.KMEANS:
      this.props.changeAlgorithm(algo);
      break;
      
      
      
      }
  };



  isDisabled = ():boolean=> {
    
    const { global } = this.props;


    if(global.numberOfClusters <=1 || global.algorithm===null || global.coordinatesOfNodes.length < 5 || global.start){
      return true;
    }

    return false;
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar elevation={0} className="appbar">
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            style={{ height: "50px", width: "auto" }}
          />
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            Clustering Visualizer
          </Typography>
          {this.props.global.algorithm === AlgorithmNames.KMEANS ? (
            <InputBase
              placeholder="Number of Clusters"
              fullWidth
              color="secondary"
              value={this.props.global.numberOfClusters===0?"":this.props.global.numberOfClusters}
              onChange={this.handleInputChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              className={classes.input}
              type="number"
            />
          ) : null}

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={this.handleAlgorithmMenu}
            variant="contained"
            style={{ marginRight: "20px" }}
          >
            {this.props.global.algorithm === null
              ? "Select Algorithm"
              : this.props.global.algorithm}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchor1}
            keepMounted
            open={this.state.anchor1 !== null}
            onClose={() => this.handleAlgorithmClose(null)}
          >
            <MenuItem onClick={() => this.handleAlgorithmClose(AlgorithmNames.KMEANS)}>
              K Means
            </MenuItem>
          </Menu>
          <Button  variant="contained"
            aria-haspopup="true"
            onClick={this.handleSpeeMenu}
            style={{ marginRight: "20px" }}
            disabled={ this.isDisabled() }>
{this.props.global.speed === null
              ? "Select Speed"
              : this.props.global.speed===Speed.slow?"Slow":this.props.global.speed===Speed.average?"Average":this.props.global.speed===Speed.fast?"Fast":"Faster"}
          </Button>
          <Menu id="menu-speed"
            anchorEl={this.state.anchor2}
            keepMounted
            open={this.state.anchor2 !== null}
            onClose={() => this.handleSpeeMenuClose(null)}>
   <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.slow)}>
              Slow 
            </MenuItem>
            <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.average)}>
              Average 
            </MenuItem>
            <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.fast)}>
              Fast 
            </MenuItem>
            <MenuItem onClick={() => this.handleSpeeMenuClose(Speed.faster)}>
              Faster 
            </MenuItem>
          </Menu>
          <Button
            variant="contained"
            onClick={() => {this.props.startVisualization();}}
            disabled={ this.isDisabled() }
          >
            Start
          </Button>
          <Button style={{color:'white'}} onClick={() => {this.props.reset();this.props.resetAlgorithmData()}}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles((theme) => ({
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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))(connector(NavBar));
