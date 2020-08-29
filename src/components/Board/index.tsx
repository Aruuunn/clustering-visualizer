import React, { ReactElement } from 'react';
import { Fab, Zoom, SvgIcon } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';

import GlobalActionTypes from '../../reduxStore/types/Global.types';
import { Node } from '../../reduxStore/reducers/global';
import Gradients from '../../common/Gradients';
import { RootState } from '../../reduxStore/reducers';
import FloatingActionButtons from '../FloatingActionButtons';
import { UserPreferencesActionTypes } from '../../reduxStore';

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
                <FloatingActionButtons>
                    {[
                        ...(this.props.fabChildren ? this.props.fabChildren : []),
                        <Zoom in={true} key={'create clusters'}>
                            <Fab onClick={() => this.setState((s) => ({ createClusterMode: !s.createClusterMode }))}>
                                {' '}
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"
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
                            <path d="M2,2 L2,11 L10,6 L2,2" fill="grey" />
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
