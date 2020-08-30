import React, { ReactElement, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Zoom, Fab, SvgIcon } from '@material-ui/core';

import Board from '../../components/Board';
import { BlueFab } from '../../components';
import RenderVisualization from './components/RenderVisualization';
import NavBar from './components/NavBar';
import { KMEANSAlgorithmActionTypes, RootState, UserPreferencesActionTypes } from '../../reduxStore';
import InfoModal from './components/InfoModal';
import Result from './components/Result';
import { DetailedInfo } from '../../reduxStore/reducers/kmeans.algorithm';
import KMEANSMode from '../../common/kmeans.mode.enum';
import AlgorithmInfo from './components/AlgorithmInfo';
import AlgorithmNames from '../../common/algorithms.enum';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

const mapDispatchToProps = {
    setRender: (ele: ReactElement[]) => ({ type: KMEANSAlgorithmActionTypes.SET_RENDER, payload: ele }),
    setNeverShowAlgorithmModal: () => ({
        type: UserPreferencesActionTypes.SET_NEVER_SHOW_AGAIN_ALGO,
        payload: AlgorithmNames.KMEANS,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function KMEANS(props: Props): ReactElement {
    const [resultOpen, setResultOpen] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div>
            {props.userPreference.showAlgorithmModal.KMEANS ? (
                <AlgorithmInfo setNeverShowAlgorithmModal={props.setNeverShowAlgorithmModal} />
            ) : null}
            <NavBar />
            <Board
                component={<RenderVisualization />}
                fabChildren={[
                    props.kmeans.info !== null &&
                    props.global.start === false &&
                    props.kmeans.mode === KMEANSMode.MultipleIteration ? (
                        <Zoom
                            key={0}
                            in={
                                props.kmeans.info !== null &&
                                props.global.start === false &&
                                props.kmeans.mode === KMEANSMode.MultipleIteration
                            }
                        >
                            <BlueFab
                                disabled={props.kmeans.info === null}
                                onClick={() => {
                                    setOpen(false);
                                    setResultOpen(true);
                                }}
                                style={{ margin: '0px' }}
                            >
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                    </svg>
                                </SvgIcon>
                            </BlueFab>
                        </Zoom>
                    ) : null,
                    props.kmeans.info !== null && !open ? (
                        <Zoom in={props.kmeans.info !== null} key={1}>
                            <div>
                                <Fab
                                    disabled={props.kmeans.info === null}
                                    color="secondary"
                                    onClick={() => {
                                        setOpen(true);
                                        setResultOpen(false);
                                    }}
                                    style={{ margin: '10px' }}
                                >
                                    <SvgIcon>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
                                        </svg>
                                    </SvgIcon>
                                </Fab>
                            </div>
                        </Zoom>
                    ) : (
                        <div style={{ height: '10px' }} />
                    ),
                ]}
            />

            <InfoModal open={open} setOpen={setOpen} onResultOpen={() => setResultOpen(true)} />

            {resultOpen &&
            props.kmeans.info !== null &&
            (props.kmeans.info as DetailedInfo).best !== undefined &&
            props.kmeans.mode === KMEANSMode.MultipleIteration ? (
                <Result
                    details={props.kmeans.info as DetailedInfo}
                    setRender={() =>
                        props.setRender(
                            (props.kmeans.info as DetailedInfo).render[(props.kmeans.info as DetailedInfo).best],
                        )
                    }
                    onClose={() => setResultOpen(false)}
                />
            ) : null}
        </div>
    );
}

export default connector(KMEANS);
