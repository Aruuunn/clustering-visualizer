import React from 'react';
import { Fade, Zoom, Grid, Collapse, SvgIcon, Fab } from '@material-ui/core';

import { Variance, DetailedInfo } from '../../../../../../reduxStore/reducers/kmeans.algorithm';
import BlueFab from '../../../../../../components/BlueFab';
import { Mode } from '../../../InfoModal';
import KMEANSMode from '../../../../../../common/kmeans.mode.enum';

interface Props {
    setCoordinatesOfFab: (coor: number[]) => void;
    expand: boolean;
    coordiantesOfFab: {
        top?: number | string;
        bottom?: number | string;
        left?: number | string;
        right?: number | string;
    };
    info: null | Variance | DetailedInfo;
    start: boolean;
    setOpen: (s: (state: boolean) => boolean) => void;
    mode: KMEANSMode;
    setMode: (mode: Mode) => void;
    setExpand: (s: boolean) => void;
}

const FloatingActionButtons = (props: Props) => {
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
                    {props.expand ? (
                        <Collapse in={props.expand}>
                            <Grid
                                container
                                direction="column"
                                justify="flex-end"
                                alignItems="center"
                                style={{
                                    position: 'fixed',
                                    width: 'auto',
                                    ...props.coordiantesOfFab,
                                    height: '300px',
                                }}
                            >
                                {props.info !== null &&
                                props.start === false &&
                                props.mode === KMEANSMode.MultipleIteration ? (
                                    <Zoom in={true}>
                                        <BlueFab
                                            disabled={props.info === null}
                                            onClick={() => {
                                                props.setOpen((s) => !s);
                                                props.setMode(Mode.RESULT);
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
                                                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                                </svg>
                                            </SvgIcon>
                                        </BlueFab>
                                    </Zoom>
                                ) : null}
                                <Zoom in={true}>
                                    <div>
                                        <Fab
                                            disabled={props.info === null}
                                            color="secondary"
                                            onClick={() => {
                                                props.setOpen((s: boolean) => !s);
                                                props.setMode(Mode.INFO);
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
                                <Zoom in={true}>
                                    <Fab onPointerDown={handleMove} style={{ backgroundColor: 'white' }}>
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
                                <SvgIcon
                                    style={{ margin: '10px' }}
                                    fontSize="large"
                                    onClick={() => props.setExpand(false)}
                                >
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
                                ...props.coordiantesOfFab,
                                height: '300px',
                            }}
                        >
                            <Fab color="secondary" onClick={() => props.setExpand(true)}>
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

export default FloatingActionButtons;
