# react-d3-graph
Interactive and configurable graphs with react and d3 effortlessly

## Compatibility
- Node version >= 4.7.0
- npm3

## Notes
- Obtain a cool node when set the fill property as white a other color for the border. It will seem like the node is more like a ring.
- Default configuration:
```javascript
export default {
    automaticRearrangeAfterDropNode: false, // Very expensive for dense graph
    height: 450,
    highlightBehavior: false,
    highlightOpacity: 1, // For all elements: nodes, text and links
    maxZoom: 8,
    minZoom: 0.5,
    staticGraph: false,
    width: 800,
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
        highlightColor: '#d3d3d3',
        opacity: 1,
        strokeWidth: 1.5
    }
};
```
