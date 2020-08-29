/*eslint max-len: ["error", 200]*/
export default {
  GRAPH_NO_ID_PROP: "id prop not defined! id property is mandatory and it should be unique.",
  INSUFFICIENT_LINKS:
    "you are passing invalid data to react-d3-graph. You must include a links array, even if empty, in the data object you're passing down to the <Graph> component.",
  INVALID_LINKS:
    "you provided a invalid links data structure. Links source and target attributes must point to an existent node",
  INSUFFICIENT_DATA:
    "you have not provided enough data for react-d3-graph to render something. You need to provide at least one node",
  INVALID_LINK_VALUE: "links 'value' attribute must be of type number",
};
