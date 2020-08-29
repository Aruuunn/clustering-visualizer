import { withStyles } from '@material-ui/core';
import React, { ChangeEvent, Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fade, InputBase, Grid } from '@material-ui/core';

import AlgorithmNames from '../../../../common/algorithms.enum';
import { CommonNavBar } from '../../../../components';
import { GlobalActionTypes, RootState, DBSCANAlgorithmActionTypes } from '../../../../reduxStore';

const mapStateToProps = (state: RootState) => ({ global: state.global, dbscan: state.dbscan });

const mapDispatchToProps = {
    setAlgorithm: (algo: AlgorithmNames) => ({
        type: GlobalActionTypes.SET_ALGORITHM,
        payload: algo,
    }),
    setMinPts: (minpts: number) => ({ type: DBSCANAlgorithmActionTypes.SET_MIN_POINTS, payload: minpts }),
    setEps: (eps: number) => ({ type: DBSCANAlgorithmActionTypes.SET_EPSILON, payload: eps }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    classes: any;
};

type State = any;

class NavBar extends Component<Props, State> {
    state = {};

    componentDidMount() {
        if (this.props.global.algorithm !== AlgorithmNames.DBSCAN) this.props.setAlgorithm(AlgorithmNames.DBSCAN);
    }
    componentDidUpdate() {
        if (this.props.global.algorithm !== AlgorithmNames.DBSCAN) this.props.setAlgorithm(AlgorithmNames.DBSCAN);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <CommonNavBar
                    isSliderDisabled={this.props.dbscan.render.length !== 0}
                    disabled={() => this.props.dbscan.minPts <= 1 && this.props.dbscan.eps <= 10}
                    drawerChildren={[
                        <Grid container justify="center" alignItems="center" key={0}>
                            <InputBase
                                placeholder="Min Points"
                                style={{
                                    width: '100%',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: '10px',
                                    maxWidth: '500px',
                                }}
                                inputProps={{ min: 0, type: 'number', disabled: this.props.global.start }}
                                fullWidth
                                color="secondary"
                                value={this.props.dbscan.minPts === 0 ? '' : this.props.dbscan.minPts}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.persist();
                                    this.props.setMinPts(parseInt(e.target.value));
                                }}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                className={classes.input}
                                type="number"
                            />
                        </Grid>,
                        <Grid container justify="center" alignItems="center" key={1}>
                            <InputBase
                                placeholder="Epsilon"
                                style={{
                                    width: '100%',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: '10px',
                                    maxWidth: '500px',
                                }}
                                inputProps={{ min: 0, type: 'number', disabled: this.props.global.start }}
                                fullWidth
                                color="secondary"
                                value={this.props.dbscan.eps === 0 ? '' : this.props.dbscan.eps}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.persist();
                                    this.props.setEps(parseInt(e.target.value));
                                }}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                className={classes.input}
                                type="number"
                            />
                        </Grid>,
                    ]}
                >
                    {[
                        <InputBase
                            key={0}
                            placeholder="Min Points"
                            style={{ maxWidth: '180px' }}
                            color="secondary"
                            value={this.props.dbscan.minPts === 0 ? '' : this.props.dbscan.minPts}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                e.persist();
                                this.props.setMinPts(parseInt(e.target.value));
                            }}
                            inputProps={{ min: 0, type: 'number', disabled: this.props.global.start }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            className={classes.input}
                            type="number"
                        />,
                        <InputBase
                            key={1}
                            placeholder="Epsilon"
                            style={{ maxWidth: '180px' }}
                            color="secondary"
                            value={this.props.dbscan.eps === 0 ? '' : this.props.dbscan.eps}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                e.persist();
                                this.props.setEps(parseInt(e.target.value));
                            }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ min: 0, type: 'number', disabled: this.props.global.start }}
                            className={classes.input}
                            type="number"
                        />,
                    ]}
                </CommonNavBar>
            </div>
        );
    }
}

export default withStyles((theme) => ({
    input: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },

    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(0.75, 1, 0.75, 1),
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(1.15, 1, 1.15, 1),
        },
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))(connector(NavBar));
