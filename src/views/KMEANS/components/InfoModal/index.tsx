import React, { ReactElement, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Fab, useMediaQuery, Paper, Grid, IconButton, SvgIcon, Grow } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import barChartIcon from '../../../../assets/bar_chart-24px.svg';
import { RootState } from '../../../../reduxStore';
import { Variance } from '../../../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../../../common/kmeans.mode.enum';
import { DetailedInfo } from '../../../../reduxStore/reducers/kmeans.algorithm';
import Chart from './components/Chart';


const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});


const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;


function InfoModal(props: Props): ReactElement {

    const xs = !useMediaQuery('(min-width:310px)');

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(1);

    const info = props.kmeans.info;


    if (!open) {
        return (
            <Grow in={!open}>
                <Fab
                    disabled={info === null}
                    color="secondary"
                    onClick={() => setOpen((s) => !s)}
                    style={{ position: 'fixed', bottom: 20, right: 20 }}
                >
                    <img src={barChartIcon} alt="statistics" />
                </Fab>
            </Grow>
        );
    }


    return (
        <div>
            <Grow in={open} timeout={100}>
                <Paper
                    component={Grid}
                    variant="outlined"
                    style={{
                        position: 'fixed',
                        right: 20,
                        top: '70px',
                        width: xs ? '80vw' : '300px',
                        height: '80vh',
                        padding: '10px',
                    }}
                >
                    <IconButton
                        component={Grid}
                        container
                        onClick={() => setOpen((s) => !s)}
                        justify="center"
                        alignItems="center"
                        style={{
                            height: 'auto',
                            width: '100%',
                            position: 'absolute',
                            backgroundColor: 'grey',
                            color: 'white',
                            top: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                        }}
                    >
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                        </SvgIcon>
                    </IconButton>

                    {props.kmeans.mode === KMEANSMode.SingleIteration ? (
                        <Chart variance={(info as Variance)} mode={props.kmeans.mode}/>
                    ) : (
                      <Chart variance={(info as DetailedInfo).variances[page - 1]} mode={props.kmeans.mode} >
                             <Pagination
                                count={(info as DetailedInfo).render.length || 0}
                                defaultPage={1}
                                onChange={( _ , val) => {
                                    setPage(val);
                                }}
                                color="secondary"
                            />
                      </Chart>                    
                    )}
                </Paper>
            </Grow>
        </div>
    );
}

export default connector(InfoModal);
