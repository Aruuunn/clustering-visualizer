import React, { ReactElement } from 'react';
import { Fab, Zoom, SvgIcon } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';

import GlobalActionTypes from '../../reduxStore/types/Global.types';
import { Node } from '../../reduxStore/reducers/global';
import Gradients from '../../common/Gradients';
import { RootState } from '../../reduxStore/reducers';
import FloatingActionButtons from '../FloatingActionButtons';
import { UserPreferencesActionTypes } from '../../reduxStore';
import Logs from '../Logs';

const mapStateToProps = (state: RootState) => ({
    global: state.global,
    userPreference: state.userPreferences,
});

const mapDispatchToProps = {
    setCoordinates: (coordinates: Node[]) => ({
        type: GlobalActionTypes.SET_COORDINATES_OF_NODES,
        payload: coordinates,
    }),
    updateCoordinates: (node: Node) => ({
        type: GlobalActionTypes.UPDATE_COORDINATES,
        payload: node,
    }),
    resetFabCoordinates: () => ({ type: UserPreferencesActionTypes.RESET_FAB_COORDINATES }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IBoardProps = PropsFromRedux & {
    component?: ReactElement;
    fabChildren?: (ReactElement | null)[];
};

type BoardState = {
    bg: React.RefObject<SVGSVGElement>;
    createClusterMode: boolean;
};

class Board extends React.Component<IBoardProps, BoardState> {
    constructor(props: IBoardProps) {
        super(props);
        this.state = {
            bg: React.createRef(),
            createClusterMode: false,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.props.resetFabCoordinates());
    }

    componentDidUpdate() {
        if (this.state.bg.current !== null) {
            this.state.bg.current.addEventListener('touchmove', (e: TouchEvent) => e.preventDefault());
        }
    }

    handleMove = (event: React.PointerEvent<SVGSVGElement>, id: number) => {
        if (this.props.global.start === true || this.state.createClusterMode) {
            return;
        }
        event.persist();
        const currentNode = event.target as SVGSVGElement;
        let X = 0,
            Y = 0;

        const handleNodeMove = (event: PointerEvent): void => {
            if (this.state.bg.current === null) {
                return;
            }

            X = event.clientX - this.state.bg.current.getBoundingClientRect().left;
            Y = event.clientY - this.state.bg.current.getBoundingClientRect().top;
            currentNode.setAttribute('cx', X.toString());
            currentNode.setAttribute('cy', Y.toString());
            this.props.updateCoordinates({ id, coordinates: [X, Y] });
        };

        const removeListeners = () => {
            if (this.state.bg.current === null) {
                return;
            }

            this.state.bg.current.removeEventListener('pointermove', handleNodeMove);
            this.state.bg.current.removeEventListener('pointerup', removeListeners);
        };

        if (this.state.bg.current !== null) {
            this.state.bg.current.addEventListener('pointermove', handleNodeMove);
            this.state.bg.current.addEventListener('pointerup', removeListeners);
        }
    };

    handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        if (this.props.global.start === true || this.state.createClusterMode) {
            return;
        }
        event.persist();
        const target = event.target as SVGSVGElement;
        const X = event.clientX - target.getBoundingClientRect().left;
        const Y = event.clientY - target.getBoundingClientRect().top;

        if (X <= 20 || Y <= 20 || !X || !Y) {
            return;
        }

        this.props.setCoordinates([
            ...this.props.global.coordinatesOfNodes,
            { coordinates: [X, Y], id: this.props.global.coordinatesOfNodes.length },
        ]);
    };

    handleCreate = () => {
        if (this.props.global.start === true || !this.state.createClusterMode || !this.state.bg.current) {
            return;
        }
        const left = this.state.bg.current.getBoundingClientRect().left;
        const top = this.state.bg.current.getBoundingClientRect().top;
        let cluster = true;

        const createCluster = (e: PointerEvent) => {
            if (!cluster) {
                return;
            }
            const space = 40;
            const X = e.clientX - left;
            const y = e.clientY - top;
            if (y - space < 80) {
                return;
            }
            this.props.setCoordinates([
                ...this.props.global.coordinatesOfNodes,
                { coordinates: [X, y], id: this.props.global.coordinatesOfNodes.length },
                { coordinates: [X + space * Math.random(), y], id: this.props.global.coordinatesOfNodes.length + 1 },
                { coordinates: [X - space * Math.random(), y], id: this.props.global.coordinatesOfNodes.length + 2 },
                { coordinates: [X, y + space * Math.random()], id: this.props.global.coordinatesOfNodes.length + 3 },
                { coordinates: [X, y - space], id: this.props.global.coordinatesOfNodes.length + 4 },
                {
                    coordinates: [X + space * Math.random(), y + space * Math.random()],
                    id: this.props.global.coordinatesOfNodes.length + 5,
                },
                {
                    coordinates: [X - space * Math.random(), y - space * Math.random()],
                    id: this.props.global.coordinatesOfNodes.length + 6,
                },
                {
                    coordinates: [X + space * Math.random(), y - space],
                    id: this.props.global.coordinatesOfNodes.length + 7,
                },
                {
                    coordinates: [X - space * Math.random(), y + space * Math.random()],
                    id: this.props.global.coordinatesOfNodes.length + 8,
                },
            ]);
            cluster = false;
            setTimeout(() => {
                cluster = true;
            }, 100);
        };

        const removeEventListeners = () => {
            this.state.bg.current?.removeEventListener('pointermove', createCluster);
            this.state.bg.current?.removeEventListener('pointerup', () => removeEventListeners());
        };
        this.state.bg.current?.addEventListener('pointermove', createCluster);
        this.state.bg.current?.addEventListener('pointerup', () => removeEventListeners());
    };
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.props.resetFabCoordinates());
    }

    public render() {
        return (
            <div>
                <Logs />
                <FloatingActionButtons>
                    {[
                        ...(this.props.fabChildren ? (this.props.fabChildren as ReactElement[]) : []),
                        <Zoom in={true} key={'create clusters'}>
                            <Fab
                                onClick={() => {
                                    this.setState((s) => ({ createClusterMode: !s.createClusterMode }));
                                }}
                            >
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 444.892 444.892">
                                        <path
                                            d="M440.498 173.103c5.858-5.857 5.858-15.355 0-21.213l-22.511-22.511a15.003 15.003 0 00-19.038-1.8l-47.332 32.17 31.975-47.652a14.999 14.999 0 00-1.85-18.964l-48.83-48.83a14.996 14.996 0 00-17.114-2.908l-8.443 4.065 4.043-8.97a15 15 0 00-3.068-16.771L293.002 4.393c-5.857-5.857-15.355-5.857-21.213 0l-119.06 119.059 168.71 168.71 119.059-119.059zM130.56 145.622l-34.466 34.466a15 15 0 000 21.212l32.694 32.694c6.299 6.299 9.354 14.992 8.382 23.849-.971 8.851-5.843 16.677-13.366 21.473-96.068 61.238-105.023 70.194-107.965 73.137-21.119 21.118-21.119 55.48 0 76.6 21.14 21.14 55.504 21.098 76.6 0 2.944-2.943 11.902-11.902 73.136-107.965 4.784-7.505 12.607-12.366 21.462-13.339 8.883-.969 17.575 2.071 23.859 8.354l32.694 32.694c5.857 5.857 15.356 5.857 21.213 0l34.467-34.467-168.71-168.708zM70.05 404.825c-8.28 8.28-21.704 8.28-29.983 0-8.28-8.28-8.28-21.704 0-29.983 8.28-8.28 21.704-8.28 29.983 0 8.28 8.279 8.28 21.703 0 29.983z"
                                            fill={this.state.createClusterMode ? '#1976d2' : 'grey'}
                                        />
                                    </svg>
                                </SvgIcon>
                            </Fab>
                        </Zoom>,
                    ]}
                </FloatingActionButtons>
                <svg
                    width="100%"
                    height="99vh"
                    ref={this.state.bg}
                    onClick={this.handleClick}
                    onPointerDown={this.handleCreate}
                >
                    <defs>
                        <marker id="markerArrow" markerWidth="20" markerHeight="20" refX="24" refY="6" orient="auto">
                            <path d="M2,2 L2,11 L10,6 L2,2" fill="yellow" />
                        </marker>
                        <marker
                            id="arrow"
                            markerWidth="20"
                            markerHeight="20"
                            refX="0"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                        >
                            <path d="M0,0 L0,6 L9,3 z" fill="yellow" />
                        </marker>
                    </defs>
                    <Gradients />

                    <rect width="100%" height="100%" style={{ fill: 'url(#Deep-Space)' }} />

                    {this.props.global.coordinatesOfNodes.map((o: Node) => (
                        <g
                            key={o.id}
                            onPointerDown={(e: React.PointerEvent<SVGSVGElement>) =>
                                !this.props.global.start ? this.handleMove(e, o.id) : null
                            }
                        >
                            <circle
                                cx={o.coordinates[0]}
                                cy={o.coordinates[1]}
                                r={this.props.userPreference.sizeOfPoint || 9}
                                style={{ fill: 'white' }}
                                stroke="grey"
                                strokeWidth="0.5"
                            />
                        </g>
                    ))}
                    {this.props.component}
                </svg>
            </div>
        );
    }
}

export default connector(Board);
