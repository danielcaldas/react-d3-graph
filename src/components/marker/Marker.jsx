import React from "react";

/**
 * Market component provides configurable interface to marker definition.
 * @example
 *
 * <Marker id="marker-id" fill="black" />
 */
export default class Marker extends React.Component {
    // TODO: make Marker configurable in the future (markerWidth, markerHeight)
    render() {
        return (
            <marker
                className="marker"
                id={this.props.id}
                viewBox="0 -5 10 10"
                refX={this.props.refX}
                refY="0"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
                fill={this.props.fill}
            >
                <path d="M0,-5L10,0L0,5" />
            </marker>
        );
    }
}
