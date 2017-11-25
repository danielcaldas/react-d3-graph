export default {
    GRAPH_NO_ID_PROP: "id prop not defined! id property is mandatory and it should be unique.",
    STATIC_GRAPH_DATA_UPDATE: "a static graph cannot receive new data (nodes or links).\
    Make sure config.staticGraph is set to true if you want to update graph data",
    INVALID_LINKS: "you provided a invalid links data structure.\
    Links source and target attributes must point to an existent node",
    INSUFFICIENT_DATA: "you have not provided enough data for react-d3-graph to render something.\
    You need to provide at least one node"
};
