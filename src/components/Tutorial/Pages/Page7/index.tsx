import React from 'react';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image';

import fab from '../../../../assets/fab-min.gif';
import fabMin from '../../../../assets/fab.jpg';

export const Page7 = () => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ width: '100%', height: '100%', padding: '10px' }}
        >
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Floating Action Buttons
            </Typography>
            <Typography variant="h6" style={{ marginTop: '50px', width: '100%', fontWeight: 'normal' }}>
                Floating Action Buttons contains special options such as Statistics. You can drag them and place
                wherever you want them to be!
            </Typography>
            {/* */}
            <ProgressiveImage src={fab} placeholder={fabMin}>
                {(src: string, loading: boolean) => (
                    <div
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            flexGrow: 1,
                            backgroundRepeat: 'no-repeat',
                            background: `url(${src})`,
                            backgroundSize: 'auto',
                            opacity: loading ? 0.8 : 1,
                            transition: 'opacity 2s ease',
                            position: 'relative',
                        }}
                    >
                        {loading ? (
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                            >
                                <CircularProgress style={{ color: 'white' }} />
                            </Grid>
                        ) : null}
                    </div>
                )}
            </ProgressiveImage>
        </Grid>
    );
};

export default Page7;
