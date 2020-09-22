import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Fab, SvgIcon, Zoom } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';

import { NavBar, RenderVisualisation, AlgorithmInfoModal, Chart } from './components';
import { Board } from '../../components';
import { RootState, UserPreferencesActionTypes } from '../../reduxStore';
import AlgorithmNames from '../../common/algorithms.enum';

const mapStateToProps = (state: RootState) => ({
    userPreference: state.userPreferences,
    hierarchical: state.hierarchical,
});

const mapDispatchToProps = {
    setNeverShowAlgorithmInfo: () => ({
        type: UserPreferencesActionTypes.SET_NEVER_SHOW_AGAIN_ALGO,
        payload: AlgorithmNames.HIERARCHICAL_CLUSTERING,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const HierarchicalView = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
            <Helmet>
                <title>Hierarchical Clustering | Clustering Visualizer</title>
            </Helmet>
            <NavBar />
            <Board
                component={<RenderVisualisation />}
                fabChildren={[
                    props.hierarchical.silhouetteScores ? (
                        <Zoom in={true}>
                            <Fab color="secondary" style={{ marginBottom: '10px' }} onClick={() => setOpen((s) => !s)}>
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        enableBackground="new 0 0 24 24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        width="24"
                                    >
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                        </g>
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M23,8c0,1.1-0.9,2-2,2c-0.18,0-0.35-0.02-0.51-0.07l-3.56,3.55C16.98,13.64,17,13.82,17,14c0,1.1-0.9,2-2,2s-2-0.9-2-2 c0-0.18,0.02-0.36,0.07-0.52l-2.55-2.55C10.36,10.98,10.18,11,10,11s-0.36-0.02-0.52-0.07l-4.55,4.56C4.98,15.65,5,15.82,5,16 c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.18,0,0.35,0.02,0.51,0.07l4.56-4.55C8.02,9.36,8,9.18,8,9c0-1.1,0.9-2,2-2s2,0.9,2,2 c0,0.18-0.02,0.36-0.07,0.52l2.55,2.55C14.64,12.02,14.82,12,15,12s0.36,0.02,0.52,0.07l3.55-3.56C19.02,8.35,19,8.18,19,8 c0-1.1,0.9-2,2-2S23,6.9,23,8z" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </SvgIcon>
                            </Fab>
                        </Zoom>
                    ) : null,
                ]}
            />
            {open ? <Chart details={props.hierarchical.silhouetteScores} onClose={() => setOpen(false)} /> : null}
            {props.userPreference.showAlgorithmModal.HIERARCHICAL_CLUSTERING ? (
                <AlgorithmInfoModal setNeverShowAlgorithmModal={props.setNeverShowAlgorithmInfo} />
            ) : null}
        </div>
    );
};

export default connector(HierarchicalView);
