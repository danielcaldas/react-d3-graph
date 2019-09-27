/* eslint-disable */
export const tooltips = {
    "link.type":
        'type: string | default value: "STRAIGHT" | optional: true\\nthe type of line to draw, available types at this point are:\n- "STRAIGHT" <small>(default)</small> - a straight line.\n- "CURVE_SMOOTH" - a slight curve between two nodes\n- "CURVE_FULL" - a semicircumference trajectory unites source and target nodes.\n<br/>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-bend.gif?raw=true" width="820" height="480"/>',
    "link.strokeWidth":
        "type: number | default value: 1.5 | optional: true\\n🔍🔍🔍 - strokeWidth for all links. By default the actual value is obtain by the\nfollowing expression:\n```javascript\nlink.strokeWidth * (1 / transform); // transform is a zoom delta Δ value\n```",
    "link.semanticStrokeWidth":
        'type: boolean | default value: false | optional: true\\nwhen set to true all links will have\n*"semantic width"*, this means that the width of the connections will be proportional to the value of each link.\nThis is how link strokeWidth will be calculated:\n```javascript\nstrokeWidth += (linkValue * strokeWidth) / 10;\n```',
    "link.renderLabel":
        'type: boolean | default value: false | optional: true\\nwhen set to true labels will appear along side links in the\ngraph. **Note**: this will only happen of course if proper label is passed within the link, check also `link.labelProperty`.\n<br/>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-link-render-label.png?raw=true" width="820" height="480"/>',
    "link.opacity": "type: number | default value: 1 | optional: true\\n🔍🔍🔍 - the default opacity value for links.",
    "link.mouseCursor":
        'type: string | default value: "pointer" | optional: true\\n{@link https://developer.mozilla.org/en/docs/Web/CSS/cursor?v=control|cursor}\nproperty for when link is mouse hovered.',
    "link.labelProperty":
        'type: string|function | default value: "label" | optional: true\\nthe property that will be rendered as label within some link. Note that\nthis property needs to be passed along the link payload (along side with source and target). This property can also be a function\nthat receives the link itself as argument and returns a custom string, similarly to what happens with `node.labelProperty`.',
    "link.highlightFontWeight":
        'type: string | default value: "normal" | optional: true\\nfontWeight in highlighted state.',
    "link.highlightFontSize": "type: number | default value: 8 | optional: true\\nfontSize in highlighted state.",
    "link.highlightColor":
        'type: string | default value: "#d3d3d3" | optional: true\\nlinks\' color in highlight state.\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-bend.gif?raw=true" width="820" height="480"/>',
    "link.fontWeight":
        'type: string | default value: "normal" | optional: true\\n{@link https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control|font-weight}\nproperty for all links\' labels.',
    "link.fontSize":
        "type: number | default value: 8 | optional: true\\n{@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control|font-size}\nproperty for all links' labels.",
    "link.fontColor":
        'type: string | default value: "black" | optional: true\\n🔍🔍🔍 fill color for link\'s <text> svg label.',
    "link.color":
        'type: string | default value: "#d3d3d3" | optional: true\\n🔍🔍🔍 the color for links\n(from version 1.3.0 this property can be configured at link level).',
    link:
        'type: Object | default value: undefined | optional: undefined\\nlink object is explained in the next section. ⬇️\n<h2 id="config-link"><a href="#config-link">#</a> Link level configurations</h2>',
    "node.viewGenerator":
        "type: function | default value: null | optional: true\\n🔍🔍🔍 function that receives a node and returns a JSX view.\n<br/>",
    "node.symbolType":
        'type: string | default value: "circle" | optional: true\\n🔍🔍🔍 the <span id="node-symbol-type">shape</span> of the node.\nUse the following values under a property **type** inside each node (nodes may have different types, same as colors):\n  - "circle"\n  - "cross"\n  - "diamond"\n  - "square"\n  - "star"\n  - "triangle"\n  - "wye"\n\n**[note]** react-d3-graph will map this values to [d3 symbols](https://github.com/d3/d3-shape#symbols)',
    "node.svg":
        'type: string | default value: "" | optional: true\\n🔍🔍🔍 render custom svg for nodes in alternative to **node.symbolType**. This svg can\nbe provided as a string to either a remote svg resource or for a local one.\n<br/>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-custom-svg.gif?raw=true" width="820" height="480"/>',
    "node.strokeWidth":
        "type: number | default value: 1.5 | optional: true\\n🔍🔍🔍 - the width of the all node strokes.",
    "node.strokeColor":
        'type: string | default value: "none" | optional: true\\n🔍🔍🔍  this is the stroke color that will be applied to the node if no **strokeColor property** is found inside the node itself (yes **you can pass a property "strokeColor" inside the node and that stroke color will override this default one** ).',
    "node.size": "type: number | default value: 200 | optional: true\\n🔍🔍🔍 defines the size of all nodes.",
    "node.renderLabel":
        "type: boolean | default value: true | optional: true\\nwhen set to false no labels will appear along side nodes in the\ngraph.",
    "node.opacity":
        "type: number | default value: 1 | optional: true\\n🔍🔍🔍 - by default all nodes will have this opacity value.",
    "node.mouseCursor":
        'type: string | default value: "pointer" | optional: true\\n{@link https://developer.mozilla.org/en/docs/Web/CSS/cursor?v=control|cursor}\nproperty for when some node is mouse hovered.',
    "node.labelProperty":
        'type: string|function | default value: "id" | optional: true\\nthis is the node property that will be used in runtime to\nfetch the label content. You just need to add some property (e.g. firstName) to the node payload and then set\nnode.labelProperty to be **"firstName"**. **This can also be a function!**, if you pass a function here it will be called\nto obtain the `label` value on the fly, as a client you will receive all the node information that you passed down into react-d3-graph,\nso the signature of the function would be:\n```javascript\nfunction myCustomLabelBuilder(node) {\n    // do stuff to get the final result...\n    return "label string";\n}\n```\nThen you just need to make sure that you pass this function in the config in `config.node.labelProperty`.\n<br/>',
    "node.highlightStrokeWidth":
        'type: number | default value: "SAME" | optional: true\\nstrokeWidth in highlighted state.',
    "node.highlightStrokeColor":
        'type: string | default value: "SAME" | optional: true\\nstrokeColor in highlighted state.',
    "node.highlightFontWeight":
        'type: string | default value: "normal" | optional: true\\nfontWeight in highlighted state.',
    "node.highlightFontSize": "type: number | default value: 8 | optional: true\\nfontSize in highlighted state.",
    "node.highlightColor":
        'type: string | default value: "SAME" | optional: true\\ncolor for all highlighted nodes (use string "SAME" if you\nwant the node to keep its color in highlighted state).',
    "node.fontWeight":
        'type: string | default value: "normal" | optional: true\\n{@link https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control|font-weight}\nproperty for all nodes" labels.',
    "node.fontSize":
        'type: number | default value: 8 | optional: true\\n{@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control|font-size}\nproperty for all nodes" labels.',
    "node.fontColor":
        'type: string | default value: "black" | optional: true\\n🔍🔍🔍 fill color for node"s <text> svg label.',
    "node.color":
        'type: string | default value: "#d3d3d3" | optional: true\\n🔍🔍🔍 this is the color that will be applied to the node if no **color property**\nis found inside the node itself (yes **you can pass a property "color" inside the node and that color will override the\nthis default one**).',
    node:
        'type: Object | default value: undefined | optional: undefined\\nnode object is explained in next section. ⬇️\n<h2 id="config-node"><a href="#config-node">#</a> Node level configurations</h2>',
    "d3.linkStrength":
        "type: number | default value: 1 | optional: true\\n[see d3-force link.strength](https://github.com/d3/d3-force#link_strength)\n<br/>",
    "d3.linkLength":
        "type: number | default value: 100 | optional: true\\nthe length of each link from the center of the nodes it joins.",
    "d3.gravity":
        'type: number | default value: -100 | optional: true\\nthis will define how close nodes are to each other ([see d3 reference for forces](https://github.com/d3/d3-force#forces)).\n - If value is positive, nodes will attract each other.\n - If value is negative, nodes will repel each other. Most of the times this is what we want, so nodes don"t overlap.',
    "d3.alphaTarget":
        "type: number | default value: 0.05 | optional: true\\n[see d3-force simulation.alphaTarget](https://github.com/d3/d3-force#simulation_alphaTarget)",
    d3:
        'type: Object | default value: undefined | optional: undefined\\nd3 object is explained in next section. ⬇️\n<h2 id="config-d3"><a href="#config-d3">#</a> d3 level configurations</h2>',
    width:
        "type: number | default value: 800 | optional: true\\nthe width of the (svg) area where the graph will be rendered.\n<br/>",
    staticGraphWithDragAndDrop:
        "type: boolean | default value: undefined | optional: true\\nexactly the same as above `staticGraph`, but it will allow users to drag&drop nodes.\n**Note**: If `staticGraph` is set to `true`, then `staticGraphWithDragAndDrop` will not produce the desired behaviour, make sure\nto set only one of them to `true`.",
    staticGraph:
        "type: boolean | default value: false | optional: true\\nwhen setting this value to true the graph will be completely static, thus\nall forces and drag events upon nodes will produce not effect. Note that, if this value is true the nodes will be\nrendered with the initial provided **x and y coordinates** (links positions will be automatically set\nfrom the given nodes positions by rd3g), no coordinates will be calculated by rd3g or subjacent d3 modules.",
    panAndZoom:
        "type: boolean | default value: false | optional: true\\n🚅🚅🚅 pan and zoom effect when performing zoom in the graph,\na similar functionality may be consulted {@link https://bl.ocks.org/mbostock/2a39a768b1d4bc00a09650edef75ad39|here}.",
    minZoom: "type: number | default value: 0.1 | optional: true\\nmin zoom that can be performed against the graph.",
    maxZoom: "type: number | default value: 8 | optional: true\\nmax zoom that can be performed against the graph.",
    highlightOpacity:
        "type: number | default value: 1 | optional: true\\nthis value is used to highlight nodes in the network. The lower\nthe value the more the less highlighted nodes will be visible (related to *nodeHighlightBehavior*).",
    highlightDegree:
        "type: number | default value: 1 | optional: true<br/><b>Possible values: 0, 1 or 2</b>.<br/>This value represents the range of the<br/>highlight behavior when some node is highlighted. If the value is set to **0** only the selected node will be<br/>highlighted. If the value is set to **1** the selected node and his 1st degree connections will be highlighted. If<br/>the value is set to **2** the selected node will be highlighted as well as the 1st and 2nd common degree connections.",
    linkHighlightBehavior:
        "type: boolean | default value: false | optional: true\\n🚅🚅🚅 when the user mouse hovers some link that link and the correspondent nodes will be highlighted, this is a similar behavior\nto *nodeHighlightBehavior* but for links <small>(just for historical reference this property was introduced in **v1.0.0**)</small>.",
    nodeHighlightBehavior:
        "type: boolean | default value: false | optional: true\\n🚅🚅🚅 when user mouse hovers a node that node and adjacent common\nconnections will be highlighted (depending on the *highlightDegree* value). All the remaining nodes and links assume opacity value equal to **highlightOpacity**.",
    height:
        "type: number | default value: 400 | optional: true\\nthe height of the (svg) area where the graph will be rendered.",
    focusAnimationDuration:
        "type: number | default value: 0.75 | optional: true\\nduration (in seconds) for the animation that takes place when focusing the graph on a node.",
    focusZoom:
        'type: number | default value: 1 | optional: true\\nzoom that will be applied when the graph view is focused in a node. Its value must be between\n*minZoom* and *maxZoom*. If the specified *focusZoom* is out of this range, *minZoom* or *maxZoom* will be applied instead.\n**NOTE:** This animation is not trigger by default. In order to trigger it you need to pass down to `react-d3-graph` the\nnode that you want to focus via prop `focusedNodeId` along side with nodes and links:\n\n```javascript\nconst data = {\n   nodes: this.state.data.nodes,\n   links: this.state.data.links,\n   focusedNodeId: "nodeIdToTriggerZoomAnimation"\n};\n```\n\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-zoom-animation.gif?raw=true" width="820" height="480"/>',
    directed:
        'type: boolean | default value: false | optional: true\\nThis property makes react-d3-graph handle your graph as a directed graph. It will\nout of the box provide the look and feel of a directed graph and add directional semantic to links. You can see a sample in the image below.\n<br/>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-directed.gif?raw=true" width="820" height="480"/>',
    collapsible:
        'type: boolean | default value: false | optional: true\\n🚅🚅🚅 Allow leaf neighbors nodes to be collapsed (folded), this will allow users to clear the way out and focus on the parts of the graph that really matter.\nTo see an example of this behavior you can access this sandbox link that has a specific set up to experiment this feature. **NOTE**: At this moment\nnodes without connections (orphan nodes) are not rendered when this property is activated (see [react-d3-graph/issues/#129](https://github.com/danielcaldas/react-d3-graph/issues/129)).\n<br/>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-collapsible.gif?raw=true" width="820" height="480"/>',
    automaticRearrangeAfterDropNode:
        "type: boolean | default value: false | optional: true\\n🚅🚅🚅 when true performing a node drag and drop should automatically\nrearrange all nodes positions based on new position of dragged node (note: **staticGraph** should be false).",
};
