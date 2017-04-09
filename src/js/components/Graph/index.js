import React from 'react';

import * as d3 from 'd3';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/config';

import GraphHelper from './helper';
import Utils from '../../utils';

// @TODO: When node dragged out of bouds the graph gets repainted
// @TODO: Unify ids decide whether they are strings or int values
export default class Graph extends React.Component {
    constructor(props) {
        super(props);

        let graph = this.props.data || {};
        let config = Utils.merge(DEFAULT_CONFIG, this.props.config);

        let nodes = {};
        let links = {};  // Matrix of graph connections

        graph.nodes.forEach(d => {
            d['highlighted'] = false;
            nodes[d.id] = d;
        });

        graph.links.forEach(d => {
            if (!links[d.source]) {
                links[d.source] = {};
            }
            if (!links[d.target]) {
                links[d.target] = {};
            }
            links[d.source][d.target] = true;
        });

        const forceX = d3.forceX(config.width / 2).strength(CONST.FORCE_X);
        const forceY = d3.forceY(config.height / 2).strength(CONST.FORCE_Y);

        const simulation = d3.forceSimulation()
                .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
                .force('x', forceX)
                .force('y', forceY);

        this.simulation = simulation;
        this.config = config;

        // Disposable once component is mounted
        this.links = graph.links;
        this.nodes = graph.nodes;

        this.state = {
            links,
            nodes,
            nodeHighlighted: false
        };
    }

    componentDidMount() {
        if (!this.config.staticGraph) {
            this.simulation.nodes(this.nodes).on('tick', this._tick);

            const forceLink = d3.forceLink(this.links)
                                .distance(CONST.LINK_IDEAL_DISTANCE)
                                .strength(1);

            this.simulation.force(CONST.LINK_CLASS_NAME, forceLink);

            const customNodeDrag = d3.drag()
                                    .on('start', this._onDragStart)
                                    .on('drag', this._onDragMove)
                                    .on('end', this._onDragEnd);

            d3.selectAll('.node').call(customNodeDrag);
        }

        // Graph zoom and drag&drop all network
        d3.select(`#${CONST.GRAPH_WRAPPER_ID}`).call(d3.zoom().scaleExtent([this.config.minZoom, this.config.maxZoom]).on('zoom', this._zoomed));

        Reflect.deleteProperty(this, 'nodes');
        Reflect.deleteProperty(this, 'links');
    }

    _tick = () => this.setState(this.state || {});

    _zoomed = () => d3.selectAll(`#${CONST.GRAPH_CONTAINER_ID}`).attr('transform', d3.event.transform);

    /*--------------------------------------------------
        Drag & Drop
     --------------------------------------------------*/
    _onDragStart = (_e, id) => !this.config.staticGraph && this.simulation.stop();

    _onDragMove = (_e, id) => {
        // This is where d3 and react bind
        let draggedNode = this.state.nodes[id];

        draggedNode.x += d3.event.dx;
        draggedNode.y += d3.event.dy;

        // Set nodes fixing coords fx and fy
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;

        !this.config.staticGraph && this._tick();
    }

    _onDragEnd = (_e, id) => !this.config.staticGraph
                            && this.config.automaticRearrangeAfterDropNode
                            && this.simulation.alphaTarget(0.05).restart();
    /*--------------------------------------------------*/

    /*--------------------------------------------------
        Event Handlers
     --------------------------------------------------*/
    onMouseOverNode = (node) => {
        this.props.onMouseOverNode && this.props.onMouseOverNode(node);

        if (this.config.highlightBehavior) {
            const nodeId = parseInt(node, 10);
            this._setHighlighted(nodeId, true);
        }
    }

    onMouseOutNode = (node) => {
        this.props.onMouseOutNode && this.props.onMouseOutNode(node);

        if (this.config.highlightBehavior) {
            const nodeId = parseInt(node, 10);
            this._setHighlighted(nodeId, false);
        }
    }

    _setHighlighted(nodeId, value) {
        this.state.nodeHighlighted = value;
        this.state.nodes[nodeId].highlighted = value;

        if (this.state.links[nodeId]) {
            Object.keys(this.state.links[nodeId]).map(k => parseInt(k, 10)).forEach(k => {
                this.state.nodes[k].highlighted = value;
            });
        }

        this.setState(this.state || {});
    }
    /*--------------------------------------------------*/

    resetNodesPositions = () => {
        let nodes = Object.values(this.state.nodes).map(d => {
            if (d.fx && d.fy) {
                Reflect.deleteProperty(d, 'fx');
                Reflect.deleteProperty(d, 'fy');
            }
            return d;
        });

        // @TODO: hardcoded alpha target
        this.simulation.alphaTarget(0.08).restart();

        this.setState({
            nodes
        });
    }

    /**
    * simulation.stop() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L84]
    */
    pauseSimulation = () => this.simulation.stop();

    /**
     * simulation.restart() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L80]
     */
    restartSimulation = () => this.simulation.restart();

    render() {
        const { nodes, links } = GraphHelper.buildGraph(
            this.state.nodes,
            { onClickNode: this.props.onClickNode, onMouseOverNode: this.onMouseOverNode, onMouseOut: this.onMouseOutNode},
            this.state.links,
            { onClickLink: this.props.onClickLink },
            this.config,
            this.state.nodeHighlighted
        );

        const svgStyle = {
            height: this.config.height,
            width: this.config.width
        };

        return (
            <div id={CONST.GRAPH_WRAPPER_ID}>
                <svg style={svgStyle}>
                    <g id={CONST.GRAPH_CONTAINER_ID}>
                        {links}
                        {nodes}
                    </g>
                </svg>
            </div>
        );
    }
}
