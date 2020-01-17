module.exports = {
    height: 400,
    width: 800,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    staticGraphWithDragAndDrop: true,
    node: {
        fontSize: 12,
        highlightFontSize: 12,
        highlightFontWeight: "bold",
        highlightStrokeColor: "blue",
        labelProperty: "name",
        size: 500,
        strokeWidth: 2,
    },
    link: {
        highlightColor: "blue",
        renderLabel: true,
        highlightFontWeight: "bold",
        semanticStrokeWidth: true,
        fontSize: 12,
    },
    d3: {
        gravity: -400,
        linkLength: 180,
        disableLinkForce: true,
    },
};
