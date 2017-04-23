# react-d3-graph &middot; [![Build Status](https://travis-ci.com/danielcaldas/react-d3-graph.svg?token=fb6uSENok5Y3gSSi5yjE&branch=master)](https://travis-ci.com/danielcaldas/react-d3-graph)
Interactive and configurable graphs with react and d3 effortlessly.

## Playground
Here a live playground (https://danielcaldas.github.io/react-d3-graph/sandbox/index.html) page where you can interactively config your own graph,
and generate the configuration data structure ready to use! :sunglasses:

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

## TODOs
This consists in a list of ideas for further development:
- Expose a graph property **background-color** that is applied to the svg graph container;
- Expose d3-force values as configurable such as **alphaTarget** simulation value;
- Improve opacity/highlightBehavior strategy maybe use a global *background: rgba(...)* value and then set a higher
value on selected nodes;
- At the moment highlightBehavior is highlighting the mouse hovered node, its 1st degree connections and their 1st
degree connections. Make **highlightBehaviorDegree** which consists in a *step value* on the depth that we wish to highlight.

#### Sanbox/Playground
- Improve page layout (optimize space).

## Contributions
Contributions are welcome fell free to submit new features or simply grab something from
the above TODO list.
