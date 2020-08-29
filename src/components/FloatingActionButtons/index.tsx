import React, { ReactElement } from 'react';
import { Fade, Zoom, Grid, Collapse, SvgIcon, Fab, useMediaQuery, useTheme } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalActionTypes, RootState, UserPreferencesActionTypes } from '../../reduxStore';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    kmeans: state.kmeans,
    userPreference: state.userPreferences,
});

const mapDispatchToProps = {
    setCoordinatesOfFab: (coor: number[]) => ({ type: UserPreferencesActionTypes.SET_FAB_COORDINATES, payload: coor }),
    setOpen: (fabOpen: boolean) => ({ type: GlobalActionTypes.SET_OPEN_FAB, payload: fabOpen }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    children?: ReactElement[];
};

const FloatingActionButtons = (props: Props) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const {
        global: { fabOpen },
        setOpen,
    } = props;

    const defaultFabCoordiantes = { bottom: sm ? '60vh' : 20, right: 20 };
    const coordiantesOfFab = props.userPreference.coordinatesOfFab
        ? { top: props.userPreference.coordinatesOfFab[1], left: props.userPreference.coordinatesOfFab[0] }
        : defaultFabCoordiantes;

    const handleMove = (e: any) => {
        e.persist();
        window.addEventListener('touchmove', (e: TouchEvent) => e.preventDefault(), { passive: false });

        const move = (e: any) => {
            const X: number = e.clientX - 34;
            let y: number = e.clientY - 210;

            y = y < 60 ? 60 : y;

            props.setCoordinatesOfFab([X, y]);

            e.target.style.top = X;
            e.target.style.left = y;
        };

        const removeListener = (e: any) => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', removeListener);
            window.removeEventListener('touchmove', (e: TouchEvent) => e.preventDefault());
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', removeListener);
    };

    return (
        <Fade in={true}>
            <div>
                <div>
                    {fabOpen ? (
                        <Collapse in={fabOpen}>
                            <Grid
                                container
                                direction="column"
                                justify="flex-end"
                                alignItems="center"
                                style={{
                                    position: 'fixed',
                                    width: 'auto',
                                    ...coordiantesOfFab,
                                    height: '300px',
                                }}
                            >
                                {props.children}

                                <Zoom in={fabOpen}>
                                    <Fab
                                        onPointerDown={handleMove}
                                        style={{ backgroundColor: 'white', margin: '10px' }}
                                    >
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                width="24"
                                            >
                                                <path d="M0 0h24v24H0V0z" fill="none" />
                                                <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                            </svg>
                                        </SvgIcon>
                                    </Fab>
                                </Zoom>
                                <SvgIcon style={{ margin: '10px' }} fontSize="large" onClick={() => setOpen(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                        width="24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                            fill="white"
                                        />
                                    </svg>
                                </SvgIcon>
                            </Grid>
                        </Collapse>
                    ) : (
                        <Grid
                            container
                            direction="column"
                            justify="flex-end"
                            alignItems="center"
                            style={{
                                position: 'fixed',
                                width: 'auto',
                                ...coordiantesOfFab,
                                height: '300px',
                            }}
                        >
                            <Fab color="secondary" onClick={() => setOpen(true)}>
                                <SvgIcon fontSize="large">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                    </svg>
                                </SvgIcon>
                            </Fab>
                        </Grid>
                    )}
                </div>
            </div>
        </Fade>
    );
};

export default connector(FloatingActionButtons);
