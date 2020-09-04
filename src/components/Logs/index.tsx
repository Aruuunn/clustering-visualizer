import React, { useState, useEffect } from 'react';
import {
    Snackbar,
    useTheme,
    Paper,
    Typography,
    Grid,
    SvgIcon,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Divider,
    useMediaQuery,
} from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';

import { RootState } from '../../reduxStore';
import BlueFab from '../../components/BlueFab';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
});

const connector = connect(mapStateToProps, {});

type Props = ConnectedProps<typeof connector>;

const Logs = (props: Props) => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    
    const [expand, setExpand] = useState(false);
    const [minimized, setMinimized] = useState<boolean>(false);

    if (props.global.logs.length === 0) {
        return null;
    }

    if (minimized) {
        return (
            <BlueFab style={{ position: 'fixed', bottom: 20, left: 20 }} onClick={() => setMinimized(false)}>
                <SvgIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" fill="white" />
                    </svg>
                </SvgIcon>
            </BlueFab>
        );
    }
    return (
        <div>
            {!expand ? (
                <Snackbar
                    style={{ zIndex: 1 }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={true}
                    onClose={() => null}
                >
                    <Grid
                        component={Paper}
                        variant="outlined"
                        container
                        alignItems="center"
                        justify="space-between"
                        style={{
                            height: '100%',
                            width: xs ? '200px' : '400px',
                            minHeight: '50px',
                            padding: '10px',
                        }}
                    >
                        <Grid container item xs={7} lg={8}>
                            <Typography>{props.global.logs[0]}</Typography>
                        </Grid>
                        <Grid container justify="flex-end" item xs={5} lg={4}>
                            <IconButton onClick={() => setMinimized(true)}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                </SvgIcon>
                            </IconButton>
                            <IconButton onClick={() => setExpand(true)}>
                                <SvgIcon style={{ transform: 'rotate(30deg)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"
                                            fill="white"
                                        />
                                    </svg>
                                </SvgIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Snackbar>
            ) : (
                <Paper
                    variant="outlined"
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '5px',
                        minWidth: xs ? '90vw' : '300px',
                        padding: '10px',
                        zIndex: 1,
                    }}
                >
                    <Grid container justify="space-between" alignItems="center" style={{ width: '100%' }}>
                        <Grid container item xs={8}>
                            <SvgIcon style={{ margin: '5px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                                        fill="#FFBF00"
                                    />
                                </svg>
                            </SvgIcon>
                            <Typography variant="h5" align="center" style={{ marginLeft: '10px' }}>
                                {' '}
                                Logs
                            </Typography>{' '}
                        </Grid>
                        <Grid container justify="flex-end" item xs={4}>
                            <IconButton onClick={() => setExpand(false)}>
                                <SvgIcon style={{ transform: 'rotate(30deg)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z" />
                                    </svg>
                                </SvgIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider />
                    <List style={{ height: '70vh', overflow: 'auto' }}>
                        {' '}
                        <VirtualList
                            width="100%"
                            height={600}
                            itemCount={props.global.logs.length}
                            itemSize={50}
                            renderItem={({ index, style }) => (
                                <ListItem key={index} style={style}>
                                    <ListItemText primary={props.global.logs[index]} />
                                    <Divider />
                                </ListItem>
                            )}
                        />
                    </List>
                </Paper>
            )}
        </div>
    );
};

export default connector(Logs);
