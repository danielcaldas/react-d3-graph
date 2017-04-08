export default {
    automaticRearrangeAfterDropNode: false,
    height: 500,
    maxZoom: 8,
    minZoom: 0.5,
    nodeFixedAfterDropped: true,
    width: 1000,
    fixedGraph: false, // @TODO: When fixed graph is true do not apply d3 forces and stuff just render the graph as it is
    node: {
        highlightColor: 'blue',
        highlightOpacity: 0.1,
        labelProperty: 'id',
        color: '#d3d3d3',
        mouseCursor: 'pointer',
        opacity: 1,
        size: 200,
        strokeColor: 'green',
        strokeWidth: 1.5,
        symbolType: 'circle',
        fontSize: 10 // in px
    },
    link: {
        color: '#a9a9a9',
        opacity: 1,
        strokeWidth: 1.5
    }
};
