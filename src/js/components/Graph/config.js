export default {
    automaticRearrangeAfterDropNode: false, // Very expensive for dense graphs, this will start a new force ...
    height: 500,
    highlightOpacity: 1, // for all elements: nodes, text and links
    maxZoom: 8,
    minZoom: 0.5,
    staticGraph: false,
    width: 1000,
    highlightBehavior: 'HIGHLIGHT_NODE',
    node: {
        color: '#d3d3d3',
        fontSize: 10, // in px
        fontWeight: 'normal',
        highlightColor: '#d3d3d3',
        highlightFontSize: 12,
        highlightFontWeight: 'bold',
        highlightStrokeColor: 'blue',
        highlightStrokeWidth: 2,
        labelProperty: 'id',
        mouseCursor: 'pointer',
        opacity: 1,
        renderLabel: true,
        size: 200,
        strokeColor: 'none',
        strokeWidth: 1.5,
        symbolType: 'circle'
    },
    link: {
        color: '#a9a9a9',
        opacity: 1,
        strokeWidth: 1.5
    }
};
