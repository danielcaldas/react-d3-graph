import React from "react";
import CustomLink from "./CustomLink";

export default {
  automaticRearrangeAfterDropNode: false,
  collapsible: false,
  height: 400,
  highlightDegree: 1,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: false,
  width: 800,
  directed: true,
  node: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 12,
    fontWeight: "normal",
    highlightColor: "red",
    highlightFontSize: 12,
    highlightFontWeight: "bold",
    highlightStrokeColor: "SAME",
    highlightStrokeWidth: 1.5,
    labelProperty: "name",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    size: 450,
    strokeColor: "none",
    strokeWidth: 1.5,
    svg: "",
    symbolType: "circle",
  },
  link: {
    color: "#d3d3d3",
    fontColor: "blue",
    fontSize: 10,
    highlightColor: "blue",
    highlightFontWeight: "bold",
    labelProperty: link => `from ${link.source} to ${link.target}`,
    opacity: 1,
    renderLabel: true,
    semanticStrokeWidth: false,
    strokeWidth: 4,
    viewGenerator: (props, options) => (
      <CustomLink
        label={props.label}
        source={props.source}
        target={props.target}
        id={options.id}
        textProps={options.textProps}
        lineProps={options.lineProps}
      />
    ),
  },
  d3: {
    gravity: -400,
    linkLength: 300,
  },
};
