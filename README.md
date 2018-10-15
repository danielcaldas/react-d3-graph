# react-d3-graph &middot; [![Build Status](https://travis-ci.org/danielcaldas/react-d3-graph.svg?branch=master&style=flat-square)](https://travis-ci.org/danielcaldas/react-d3-graph)

[![npm version](https://img.shields.io/npm/v/react-d3-graph.svg?style=flat-square)](https://www.npmjs.com/package/react-d3-graph) [![probot enabled](https://img.shields.io/badge/probot:stale-enabled-yellow.svg?longCache=true&style=flat-square)](https://probot.github.io/) [![trello](https://img.shields.io/badge/trello-board-blue.svg?longCache=true&style=flat-square)](https://trello.com/b/KrnmFXha/react-d3-graph)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![npm](https://img.shields.io/npm/dw/react-d3-graph.svg?style=flat-square)](https://www.npmjs.com/package/react-d3-graph)
[![npm](https://img.shields.io/npm/dt/react-d3-graph.svg?style=flat-square)](https://www.npmjs.com/package/react-d3-graph)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/DanielCaldas321)

:book: [documentation](https://danielcaldas.github.io/react-d3-graph/docs/index.html)

### _Interactive and configurable graphs with react and d3 effortlessly_

[![react-d3-graph gif sample](https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/rd3g_v2.gif?raw=true)](https://danielcaldas.github.io/react-d3-graph/sandbox/index.html)

## Playground

[Here a live playground](https://danielcaldas.github.io/react-d3-graph/sandbox/index.html) page where you can interactively config your own graph, and generate a ready to use configuration! :sunglasses:

You can also load different datasets and configurations via URL query parameter, here are the links:

*   [small dataset](https://goodguydaniel.com/react-d3-graph/sandbox/index.html?data=small)
*   [custom node dataset](https://goodguydaniel.com/react-d3-graph/sandbox/index.html?data=custom-node)

Do you want to visualize your own data set on the live sandbox? Just submit a PR! You're welcome 😁

## Documentation :book:

Full documentation [here](https://danielcaldas.github.io/react-d3-graph/docs/index.html).

## Install

[![https://nodei.co/npm/YOUR-MODULE-NAME.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-d3-graph.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-d3-graph)

```bash
npm install react-d3-graph // using npm
```

## Usage sample

Graph component is the main component for react-d3-graph components, its interface allows its user to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).
The code for the [live example](https://danielcaldas.github.io/react-d3-graph/sandbox/index.html) can be consulted [here](https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.jsx).

```javascript
import { Graph } from 'react-d3-graph';

// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 120,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

// graph event callbacks
const onClickGraph = function() {
    window.alert(`Clicked the graph background`);
};

const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
};

const onRightClickNode = function(event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function(nodeId) {
    window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
    window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function(event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
    window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
    window.alert(`Mouse out link between ${source} and ${target}`);
};

<Graph
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={data}
    config={myConfig}
    onClickNode={onClickNode}
    onRightClickNode={onRightClickNode}
    onClickGraph={onClickGraph}
    onClickLink={onClickLink}
    onRightClickLink={onRightClickLink}
    onMouseOverNode={onMouseOverNode}
    onMouseOutNode={onMouseOutNode}
    onMouseOverLink={onMouseOverLink}
    onMouseOutLink={onMouseOutLink}
/>;
```

## Roadmap :railway_track:

Want to know what's ahead for react-d3-graph? Or simply curious on what comes next and stuff that is under development?
Check [this trello board](https://trello.com/b/KrnmFXha/react-d3-graph) where everything related to react-d3-graph is managed.

## Contributions

Contributions are welcome fell free to submit new ideas/features, just open an issue or send me an email or something. If you are more a _hands on_ person, just submit a pull request.

## Donation

Using _react-d3-graph_ and want to help the project grow with new features or simply want to say thank you? You can always buy me a cup of coffee ☕☕☕

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/DanielCaldas321)

## Alternatives (Not what you where looking for?)

Well if you scrolled this far maybe _react-d3-graph_ does not fulfill all your requirements 😭, but don't worry I got you covered! There are a lot of different and good alternatives out there, [here is a list with a few alternatives](http://anvaka.github.io/graph-drawing-libraries/#!/all#%2Fall). Btw, not in the previous list but also a valid alternative built by uber [uber/react-vis-force](https://github.com/uber/react-vis-force).
