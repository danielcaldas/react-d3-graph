# react-d3-graph &middot; [![Build Status](https://travis-ci.org/danielcaldas/react-d3-graph.svg?branch=master)](https://travis-ci.org/danielcaldas/react-d3-graph) [![npm version](https://img.shields.io/badge/npm-v0.2.1-blue.svg)](https://www.npmjs.com/package/react-d3-graph) [![npm stats](https://img.shields.io/badge/downloads->600-brightgreen.svg)](https://npm-stat.com/) [![probot enabled](https://img.shields.io/badge/probot:stale-enabled-yellow.svg)](https://probot.github.io/)
[:book:](https://danielcaldas.github.io/react-d3-graph/docs/index.html)

### *Interactive and configurable graphs with react and d3 effortlessly*

![react-d3-graph gif sample](https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/rd3g.gif?raw=true)

## Playground
[Here a live playground](https://danielcaldas.github.io/react-d3-graph/sandbox/index.html) page where you can interactively config your own graph, and generate a ready to use configuration! :sunglasses:

## Documentation :book:
Full documentation [here](https://danielcaldas.github.io/react-d3-graph/docs/index.html).

## Compatibility
- Node version **6.9.x**
- React version **15.6.1**
- d3 version **4.10.2**

## Install
[![https://nodei.co/npm/YOUR-MODULE-NAME.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-d3-graph.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-d3-graph)


```bash
npm install react-d3-graph // using npm
yarn add react-d3-graph // using yarn
```

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

## Contributions
Contributions are welcome fell free to submit new ideas/features.
