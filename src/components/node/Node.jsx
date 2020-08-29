import React from "react";

import nodeHelper from "./node.helper";
import CONST from "./node.const";
import { logWarning } from "../../utils";

/**
 * Node component is responsible for encapsulating node render.
 * @example
 * const onClickNode = function(nodeId) {
 *     window.alert('Clicked node', nodeId);
 * };
 *
 * const onRightClickNode = function(nodeId) {
 *     window.alert('Right clicked node', nodeId);
 * }
 *
 * const onMouseOverNode = function(nodeId) {
 *     window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *     window.alert('Mouse out node', nodeId);
 * };
 *
 * const generateCustomNode(node) {
 *     return <CustomComponent node={node} />;
 * }
 *
 * <Node
 *     id='nodeId'
 *     cx=22
 *     cy=22
 *     fill='green'
 *     fontSize=10
 *     fontColor='black'
 *     fontWeight='normal'
 *     dx=90
 *     label='label text'
 *     labelPosition='top'
 *     opacity=1
 *     renderLabel=true
 *     size=200
 *     stroke='none'
 *     strokeWidth=1.5
 *     svg='assets/my-svg.svg'
 *     type='square'
 *     viewGenerator={generateCustomNode}
 *     className='node'
 *     onClickNode={onClickNode}
 *     onRightClickNode={onRightClickNode}
 *     onMouseOverNode={onMouseOverNode}
 *     onMouseOutNode={onMouseOutNode} />
 */
export default class Node extends React.Component {
  /**
   * Handle click on the node.
   * @returns {undefined}
   */
  handleOnClickNode = () => this.props.onClickNode && this.props.onClickNode(this.props.id);

  /**
   * Handle right click on the node.
   * @param {Object} event - native event.
   * @returns {undefined}
   */
  handleOnRightClickNode = event => this.props.onRightClickNode && this.props.onRightClickNode(event, this.props.id);

  /**
   * Handle mouse over node event.
   * @returns {undefined}
   */
  handleOnMouseOverNode = () => this.props.onMouseOverNode && this.props.onMouseOverNode(this.props.id);

  /**
   * Handle mouse out node event.
   * @returns {undefined}
   */
  handleOnMouseOutNode = () => this.props.onMouseOut && this.props.onMouseOut(this.props.id);

  render() {
    const nodeProps = {
      cursor: this.props.cursor,
      onClick: this.handleOnClickNode,
      onContextMenu: this.handleOnRightClickNode,
      onMouseOut: this.handleOnMouseOutNode,
      onMouseOver: this.handleOnMouseOverNode,
      opacity: this.props.opacity,
    };

    const textProps = {
      ...nodeHelper.getLabelPlacementProps(this.props.dx, this.props.labelPosition),
      fill: this.props.fontColor,
      fontSize: this.props.fontSize,
      fontWeight: this.props.fontWeight,
      opacity: this.props.opacity,
    };

    let size = this.props.size;
    const isSizeNumericalValue = typeof size !== "object";

    let gtx = this.props.cx,
      gty = this.props.cy,
      label = null,
      node = null;

    if (this.props.svg || this.props.viewGenerator) {
      const height = isSizeNumericalValue ? size / 10 : size.height / 10;
      const width = isSizeNumericalValue ? size / 10 : size.width / 10;
      const tx = width / 2;
      const ty = height / 2;
      const transform = `translate(${tx},${ty})`;

      label = (
        <text {...textProps} transform={transform}>
          {this.props.label}
        </text>
      );

      // By default, if a view generator is set, it takes precedence over any svg image url
      if (this.props.viewGenerator && !this.props.overrideGlobalViewGenerator) {
        node = (
          <svg {...nodeProps} width={width} height={height}>
            <foreignObject x="0" y="0" width="100%" height="100%">
              <section style={{ height, width, backgroundColor: "transparent" }}>
                {this.props.viewGenerator(this.props)}
              </section>
            </foreignObject>
          </svg>
        );
      } else {
        node = <image {...nodeProps} href={this.props.svg} width={width} height={height} />;
      }

      // svg offset transform regarding svg width/height
      gtx -= tx;
      gty -= ty;
    } else {
      if (!isSizeNumericalValue) {
        logWarning("node.size should be a number when not using custom nodes.");
        size = CONST.DEFAULT_NODE_SIZE;
      }
      nodeProps.d = nodeHelper.buildSvgSymbol(size, this.props.type);
      nodeProps.fill = this.props.fill;
      nodeProps.stroke = this.props.stroke;
      nodeProps.strokeWidth = this.props.strokeWidth;

      label = <text {...textProps}>{this.props.label}</text>;
      node = <path {...nodeProps} />;
    }

    const gProps = {
      className: this.props.className,
      cx: this.props.cx,
      cy: this.props.cy,
      id: this.props.id,
      transform: `translate(${gtx},${gty})`,
    };

    return (
      <g {...gProps}>
        {node}
        {this.props.renderLabel && label}
      </g>
    );
  }
}
