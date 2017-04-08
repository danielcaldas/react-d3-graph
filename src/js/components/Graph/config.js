export default {
    automaticRearrangeAfterDropNode: false, // Very expensive for dense graphs, this will start a new force ...
    height: 500,
    maxZoom: 8,
    minZoom: 0.5,
    width: 1000,
    staticGraph: false,
    node: {
        color: '#d3d3d3',
        fontSize: 10, // in px
        highlightColor: 'blue',
        highlightOpacity: 0.1,
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
