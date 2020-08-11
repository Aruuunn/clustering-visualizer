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
import logo from "../../assets/logo.svg";
import { AlgorithmNames } from "../../common/algorithms.enum";

interface Props {
  state: {
    algorithm: AlgorithmNames | null;
    numberOfClusters:number
  };
  setState: Function;
  classes: any;
}

interface State {
  anchor: (EventTarget & Element) | null;
}

class NavBar extends Component<Props, State> {
  state = { anchor: null,};

  handleClick = (event: SyntheticEvent) => {
    this.setState({ anchor: event.currentTarget });
  };

  handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if( parseInt(e.target.value) >= 0 ){
      this.props.setState((s:any) => ({...s,numberOfClusters:parseInt(e.target.value)}))
    } else {
      this.props.setState((s:any) => ({...s,numberOfClusters:0}))
    }
  }


  handleClose = (algo: AlgorithmNames | null) => {
    this.setState({ anchor: null });
    if (algo !== null)
      this.props.setState((s: Props["state"]) => ({ ...s, algorithm: algo }));
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar elevation={0}>
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            style={{ height: "50px", width: "auto" }}
          />
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            Clustering Visualizer
          </Typography>
          {this.props.state.algorithm === AlgorithmNames.KMEANS ? (
            <InputBase
            placeholder="Number of Clusters"
            fullWidth
            color="secondary"
            value={this.props.state.numberOfClusters}
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
            onClick={this.handleClick}
            variant="contained"
            style={{ marginRight: "20px" }}
          >
            {this.props.state.algorithm === null
              ? "Select Algorithm"
              : this.props.state.algorithm}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchor}
            keepMounted
            open={this.state.anchor !== null}
            onClose={() => this.handleClose(null)}
          >
            <MenuItem onClick={() => this.handleClose(AlgorithmNames.KMEANS)}>
              K Means
            </MenuItem>
          </Menu>
          <Button
            variant="contained"
            disabled={this.props.state.algorithm === null}
          >
            Start
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
}))(NavBar);
