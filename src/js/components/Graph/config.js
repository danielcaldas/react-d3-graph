export default {
    automaticRearrangeAfterDropNode: false, // Very expensive for dense graphs, this will start a new force ...
    height: 500,
    highlightOpacity: 0.1, // for all elements: nodes, text and links
    maxZoom: 8,
    minZoom: 0.5,
    staticGraph: false,
    width: 1000,
    node: {
        color: '#d3d3d3',
        fontSize: 10, // in px
        highlightColor: 'blue',

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
