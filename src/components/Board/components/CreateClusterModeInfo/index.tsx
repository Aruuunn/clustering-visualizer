import React, { ReactElement } from 'react';
import { Backdrop, Paper, Grid, Typography } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';
import { connect, ConnectedProps } from 'react-redux';

import createClustersImage from '../../../../assets/create-cluster-mode.gif';
import createClustersProgressive from '../../../../assets/create-cluster-mode-progressive.jpg';
import BlueButton from '../../../BlueButton';
import { RootState, UserPreferencesActionTypes } from '../../../../reduxStore';

const mapStateToProps = (state: RootState) => ({ userPreferences: state.userPreferences });
const mapDispatchToProps = {
    onClose: () => ({ type: UserPreferencesActionTypes.SHOWED_CREATE_CLUSTER_MODE }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const CreateClusterModeInfo = (props: Props): ReactElement | null => {
    if (props.userPreferences.createClusterModeInfoComplete) {
        return null;
    }
    return (
        <Backdrop open={true} style={{ zIndex: 10000 }} onClick={() => props.onClose()}>
            <Grid
                component={Paper}
                container
                direction="column"
                justify="space-between"
                variant="outlined"
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '600px',
                    height: '100%',
                    padding: '20px',
                    margin: '10px',
                    overflowY: 'auto',
                    position: 'relative',
                }}
            >
                <div style={{ width: '100%', flexGrow: 1 }}>
                    <Typography variant="h4">Create Cluster Mode</Typography>
                    <Typography variant="h6" style={{ fontWeight: 'normal', marginTop: '15px' }}>
                        Create Clusters with ease using <strong>Create Cluster Mode</strong>.
                    </Typography>
                    <ProgressiveImage src={createClustersImage} placeholder={createClustersProgressive}>
                        {(src: string, loading: boolean) => (
                            <img
                                src={src}
                                alt="create clusters"
                                style={{
                                    opacity: loading ? 0.5 : 1,
                                    transition: 'opacity 1.5s ease',
                                    width: '100%',
                                    height: 'auto',
                                    marginTop: '50px',
                                }}
                            />
                        )}
                    </ProgressiveImage>
                </div>
                <Grid
                    container
                    justify="flex-end"
                    alignItems="flex-end"
                    style={{
                        width: '100%',
                    }}
                >
                    <BlueButton onClick={() => props.onClose()}>GOT IT!</BlueButton>
                </Grid>
            </Grid>
        </Backdrop>
    );
};

export default connector(CreateClusterModeInfo);
