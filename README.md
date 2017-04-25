# react-d3-graph &middot; [![Build Status](https://travis-ci.com/danielcaldas/react-d3-graph.svg?token=fb6uSENok5Y3gSSi5yjE&branch=master)](https://travis-ci.com/danielcaldas/react-d3-graph)
Interactive and configurable graphs with react and d3 effortlessly.

![react-d3-graph gif sample](https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/rd3g.gif?raw=true)

## Playground
Here a live playground (https://danielcaldas.github.io/react-d3-graph/sandbox/index.html) page where you can interactively config your own graph,
and generate a ready to use configuration! :sunglasses:

## Documentation
Full documentation [here](https://danielcaldas.github.io/react-d3-graph/docs/index.html).

## Compatibility
- Node version **>=6.9.5**
- React version **15.5.0**
- d3 version **4.7.4**

## Usage sample
Graph component is the main component for react-d3-graph components, its interface allows its user
to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).
The code for the live example (<https://danielcaldas.github.io/react-d3-graph/sandbox/index.html>)
can be consulted here <https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.js>

```javascript
import { Graph } from 'react-d3-graph';

// Graph payload (with minimalist structure)
const data = {
    nodes: [
      {id: 'Harry'},
      {id: 'Sally'},
      {id: 'Alice'}
    ],
    links: [
        {source: 'Harry', target: 'Sally'},
        {source: 'Harry', target: 'Alice'},
    ]
};

// The graph configuration
const myConfig = {
    highlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 120,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

// Graph event callbacks
const onClickNode = function(nodeId) {
     window.alert('Clicked node', nodeId);
};

const onMouseOverNode = function(nodeId) {
     window.alert('Mouse over node', nodeId);
};

const onMouseOutNode = function(nodeId) {
     window.alert('Mouse out node', nodeId);
};

const onClickLink = function(source, target) {
     window.alert(`Clicked link between ${source} and ${target}`);
};

<Graph
     id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
     data={data}
     config={myConfig}
     onClickNode={onClickNode}
     onClickLink={onClickLink}
     onMouseOverNode={onMouseOverNode}
     onMouseOutNode={onMouseOutNode} />
```

## TODOs
This consists in a list of ideas for further developments:
- Expose a graph property **background-color** that is applied to the svg graph container;
- Expose d3-force values as configurable such as **alphaTarget** simulation value;
- Improve opacity/highlightBehavior strategy maybe use a global *background: rgba(...)* value and then set a higher
value on selected nodes;
- At the moment highlightBehavior is highlighting the mouse hovered node, its 1st degree connections and their 1st
degree connections. Make **highlightBehaviorDegree** which consists in a *step value* on the depth that we wish to highlight;
- Semantic node size. Have a property value in each node that then is used along side config.nodeSize property
to calculate effective node size in run time;
- Improve semanticStrokeWidth calculation;
- On Graph instantiation do a check on all config properties. If there is a "bad property" (name or value) throw
a custom error (property error checking);
- Path highlight - highlight a certain set of links and nodes (use case: highlight shortest path between two given nodes);
- Link mouseover with highlight behavior highlights the intervenient nodes.

## Contributions
Contributions are welcome fell free to submit new features or simply grab something from
the above TODO list.
