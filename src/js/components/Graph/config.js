export default {
    automaticRearrangeAfterDropNode: false, // Very expensive for dense graphs, this will start a new force ...
    height: 450,
    highlightOpacity: 1, // for all elements: nodes, text and links
    maxZoom: 8,
    minZoom: 0.5,
    staticGraph: false,
    width: 800,
    highlightBehavior: 'HIGHLIGHT_NODE',
    node: {
        color: '#d3d3d3',
        fontSize: 10, // in px
        fontWeight: 'normal',
        highlightColor: 'SAME',
        highlightFontSize: 10,
        highlightFontWeight: 'normal',
        highlightStrokeColor: 'none',
        highlightStrokeWidth: 1.5,
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
        color: '#d3d3d3',
        opacity: 1,
        strokeWidth: 1.5
    }
};
