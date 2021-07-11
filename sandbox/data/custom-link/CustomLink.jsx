/* eslint-disable valid-jsdoc */
import React from "react";

/**
 * @param {Object} params component props to render.
 * @param {string} params.label path label
 * @param {Object} params.source source node
 * @param {Object} params.target target node
 * @param {string} params.id path id
 * @param {Object} params.lineProps line props
 * @param {Object} params.textProps text props
 */
function CustomLink(params) {
  const { label, source, target, id, lineProps, textProps } = params;
  const isReverse = target.x < source.x;
  let fixedLineProps = lineProps;
  if (isReverse) {
    const { markerEnd, d, ...rest } = lineProps;
    const items = d.split(" ");
    const [sx, sy] = items[0].replace("M", "").split(",");
    const [tx, ty] = items[items.length - 1].split(",");
    const sOffset = { x: source.x - sx, y: source.y - sy };
    const tOffset = { x: target.x - tx, y: target.y - ty };
    const reverseD = `M${target.x - tOffset.x},${target.y - tOffset.y} ${source.x - sOffset.x},${source.y - sOffset.y}`;
    fixedLineProps = { ...rest, markerStart: markerEnd, d: reverseD };
  }
  return (
    <g>
      <path {...fixedLineProps} id={id} />
      {label && (
        <text style={{ textAnchor: "middle" }} {...textProps}>
          <textPath href={`#${id}`} startOffset="50%">
            {label}
          </textPath>
        </text>
      )}
    </g>
  );
}

export default CustomLink;
