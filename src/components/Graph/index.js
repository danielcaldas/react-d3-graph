import React from 'react';

import * as d3 from 'd3';

import CONST from './const';
import DEFAULT_CONFIG from './config';
import ERRORS from '../../err';

import GraphHelper from './helper';
import Utils from '../../utils';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);

        if (!this.props.id) {
            throw Utils.throwErr(this.constructor.name, ERRORS.GRAPH_NO_ID_PROP);
        }

        let graph = this.props.data || {};
        let config = Utils.merge(DEFAULT_CONFIG, this.props.config || {});
        let {nodes, indexMapping} = GraphHelper.initializeNodes(graph.nodes);
        let links = GraphHelper.initializeLinks(graph.links); // Matrix of graph connections

        this.indexMapping = indexMapping;
        this.simulation = GraphHelper.createForceSimulation(config.width, config.height);

        // Disposable once component is mounted
        this.links = graph.links;
        this.nodes = graph.nodes;

        this.state = {
            config,
            links,
            nodes,
            nodeHighlighted: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const config = Utils.merge(DEFAULT_CONFIG, nextProps.config || {});

        if (JSON.stringify(config) !== JSON.stringify(this.state.config)) {
            this.setState({
                config
            });
        }
    }

    componentDidMount() {
        if (!this.state.config.staticGraph) {
            this.simulation.nodes(this.nodes).on('tick', this._tick);

            const forceLink = d3.forceLink(this.links)
                                .id(l => l.id)
                                .distance(CONST.LINK_IDEAL_DISTANCE)
                                .strength(1);

            this.simulation.force(CONST.LINK_CLASS_NAME, forceLink);

            const customNodeDrag = d3.drag()
                                    .on('start', this._onDragStart)
                                    .on('drag', this._onDragMove)
                                    .on('end', this._onDragEnd);

            d3.select(`#${this.props.id}-${CONST.GRAPH_WRAPPER_ID}`).selectAll('.node').call(customNodeDrag);
        }

        // Graph zoom and drag&drop all network
        d3.select(`#${this.props.id}-${CONST.GRAPH_WRAPPER_ID}`).call(d3.zoom().scaleExtent([this.state.config.minZoom, this.state.config.maxZoom]).on('zoom', this._zoomed));

        Reflect.deleteProperty(this, 'nodes');
        Reflect.deleteProperty(this, 'links');
    }

    _tick = () => this.setState(this.state || {});

    _zoomed = () => d3.selectAll(`#${this.props.id}-${CONST.GRAPH_CONTAINER_ID}`).attr('transform', d3.event.transform);

    /*--------------------------------------------------
        Drag & Drop
     --------------------------------------------------*/
    _onDragStart = () => !this.state.config.staticGraph && this.simulation.stop();

    _onDragMove = (_, index) => {
        // This is where d3 and react bind;
        let draggedNode = this.state.nodes[this.indexMapping[index]];

        draggedNode.x += d3.event.dx;
        draggedNode.y += d3.event.dy;

        // Set nodes fixing coords fx and fy
        draggedNode['fx'] = draggedNode.x;
        draggedNode['fy'] = draggedNode.y;

        !this.state.config.staticGraph && this._tick();
    }

    _onDragEnd = () => !this.state.config.staticGraph
                        && this.state.config.automaticRearrangeAfterDropNode
                        && this.simulation.alphaTarget(0.05).restart();
    /*--------------------------------------------------*/

    /*--------------------------------------------------
        Event Handlers
     --------------------------------------------------*/
    onMouseOverNode = (index) => {
        this.props.onMouseOverNode && this.props.onMouseOverNode(index);

        this.state.config.highlightBehavior && this._setHighlighted(index, true);
    }

    onMouseOutNode = (index) => {
        this.props.onMouseOutNode && this.props.onMouseOutNode(index);

        this.state.config.highlightBehavior && this._setHighlighted(index, false);
    }

    _setHighlighted(index, value) {
        this.state.nodeHighlighted = value;
        this.state.nodes[index].highlighted = value;

        if (this.state.links[index]) {
            Object.keys(this.state.links[index]).forEach(k => {
                this.state.nodes[k].highlighted = value;
            });
        }

        this.setState(this.state || {});
    }
    /*--------------------------------------------------*/

    resetNodesPositions = () => {
        Object.values(this.state.nodes).forEach(node => {
            if (node.fx && node.fy) {
                Reflect.deleteProperty(node, 'fx');
                Reflect.deleteProperty(node, 'fy');
            }
        });

        // @TODO: hardcoded alpha target
        this.simulation.alphaTarget(0.08).restart();

        this.setState(this.state || {});
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
            this.state.config,
            this.state.nodeHighlighted
        );

        const svgStyle = {
            height: this.state.config.height,
            width: this.state.config.width
        };

        return (
            <div id={`${this.props.id}-${CONST.GRAPH_WRAPPER_ID}`}>
                <svg style={svgStyle}>
                    <g id={`${this.props.id}-${CONST.GRAPH_CONTAINER_ID}`}>
                        {links}
                        {nodes}
                    </g>
                </svg>
            </div>
        );
    }
}
