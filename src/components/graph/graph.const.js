import CONST from "../../const";

export default {
  COORDS_SEPARATOR: ",",
  FORCE_X: 0.06,
  FORCE_Y: 0.06,
  GRAPH_CONTAINER_ID: "graph-container-zoomable",
  GRAPH_WRAPPER_ID: "graph-wrapper",
  KEYWORDS: {
    SAME: "SAME",
  },
  LINK_CLASS_NAME: "link",
  NODE_CLASS_NAME: "node",
  TTL_DOUBLE_CLICK_IN_MS: 300,
  SYMBOLS_WITH_OPTIMIZED_POSITIONING: new Set([CONST.SYMBOLS.CIRCLE, CONST.SYMBOLS.SQUARE]),
  ...CONST,
};
