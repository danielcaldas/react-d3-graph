/*eslint-disable*/
export const tooltips = {
    "link.type":
        '            <h4>link.type</h4>            <b>type</b>: string | <b>default value</b>: "STRAIGHT" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 - the type of line to draw, available types at this point are:\n- "STRAIGHT" <small>(default)</small> - a straight line.\n- "CURVE_SMOOTH" - a slight curve between two nodes\n- "CURVE_FULL" - a semicircumference trajectory unites source and target nodes.\n</br>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-bend.gif?raw=true" width=\'400\' height=\'200\'/></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.markerWidth":
        '            <h4>link.markerWidth</h4>            <b>type</b>: number | <b>default value</b>: 6 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en/docs/Web/SVG/Attribute/markerWidth">markerWidth</a>\nproperty for the link arrowhead width. *Note: this property can only be set in the first mount, it does not update dynamically.*</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.markerHeight":
        '            <h4>link.markerHeight</h4>            <b>type</b>: number | <b>default value</b>: 6 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en/docs/Web/SVG/Attribute/markerHeight">markerHeight</a>\nproperty for the link arrowhead height. *Note: this property can only be set in the first mount, it does not update dynamically.*</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.strokeWidth":
        '            <h4>link.strokeWidth</h4>            <b>type</b>: number | <b>default value</b>: 1.5 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 - strokeWidth for all links. By default the actual value is obtain by the\nfollowing expression:\n</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.semanticStrokeWidth":
        '            <h4>link.semanticStrokeWidth</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">when set to true all links will have\n<i>"semantic width"</i>, this means that the width of the connections will be proportional to the value of each link.\nThis is how link strokeWidth will be calculated:\n</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.renderLabel":
        '            <h4>link.renderLabel</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">when set to true labels will appear along side links in the\ngraph. <b>Note</b>: this will only happen of course if proper label is passed within the link, check also <code>link.labelProperty</code>.\n</br>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-link-render-label.png?raw=true" width=\'400\' height=\'200\'/></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.opacity":
        '            <h4>link.opacity</h4>            <b>type</b>: number | <b>default value</b>: 1 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 - the default opacity value for links.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.mouseCursor":
        '            <h4>link.mouseCursor</h4>            <b>type</b>: string | <b>default value</b>: "pointer" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en/docs/Web/CSS/cursor?v=control">cursor</a>\nproperty for when link is mouse hovered.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.labelProperty":
        '            <h4>link.labelProperty</h4>            <b>type</b>: string|function | <b>default value</b>: "label" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">the property that will be rendered as label within some link. Note that</br>\nthis property needs to be passed along the link payload (along side with source and target). This property can also be a function</br>\nthat receives the link itself as argument and returns a custom string, similarly to what happens with <code>node.labelProperty</code>.</br></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.highlightFontWeight":
        '            <h4>link.highlightFontWeight</h4>            <b>type</b>: string | <b>default value</b>: "normal" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control">font-weight</a> in highlighted state.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.highlightFontSize":
        '            <h4>link.highlightFontSize</h4>            <b>type</b>: number | <b>default value</b>: 8 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control">font-size</a> in highlighted state.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.highlightColor":
        '            <h4>link.highlightColor</h4>            <b>type</b>: string | <b>default value</b>: "#d3d3d3" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">links\' color in highlight state.\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-bend.gif?raw=true" width=\'400\' height=\'200\'/></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.fontWeight":
        '            <h4>link.fontWeight</h4>            <b>type</b>: string | <b>default value</b>: "normal" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control">font-weight</a>\nproperty for all links\' labels.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.fontSize":
        '            <h4>link.fontSize</h4>            <b>type</b>: number | <b>default value</b>: 8 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control">font-size</a>\nproperty for all links\' labels.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.fontColor":
        '            <h4>link.fontColor</h4>            <b>type</b>: string | <b>default value</b>: "black" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 fill color for link\'s <text> svg label.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "link.color":
        '            <h4>link.color</h4>            <b>type</b>: string | <b>default value</b>: "#d3d3d3" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 the color for links\n(from version 1.3.0 this property can be configured at link level).</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    link:
        '            <h4>link</h4>            <b>type</b>: Object | <b>default value</b>: undefined | <b>optional</b>: undefined            <h5>Description</h5>            <div style="max-width: 400px;">link object is explained in the next section. ⬇️\n<h2 id="config-link"><a href="#config-link">#</a> Link level configurations</h2></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.viewGenerator":
        '            <h4>node.viewGenerator</h4>            <b>type</b>: function | <b>default value</b>: null | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 function that receives a node and returns a JSX view.\n</br></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.symbolType":
        '            <h4>node.symbolType</h4>            <b>type</b>: string | <b>default value</b>: "circle" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 the <span id="node-symbol-type">shape</span> of the node.\nUse the following values under a property <b>type</b> inside each node (nodes may have different types, same as colors):\n  - "circle"\n  - "cross"\n  - "diamond"\n  - "square"\n  - "star"\n  - "triangle"\n  - "wye"\n\n<b>[note]</b> react-d3-graph will map this values to <a target="_blank" href="https://github.com/d3/d3-shape#symbols">d3 symbols</a></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.svg":
        '            <h4>node.svg</h4>            <b>type</b>: string | <b>default value</b>: "" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 render custom svg for nodes in alternative to <b>node.symbolType</b>. This svg can\nbe provided as a string to either a remote svg resource or for a local one.\n</br>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-custom-svg.gif?raw=true" width=\'400\' height=\'200\'/></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.strokeWidth":
        '            <h4>node.strokeWidth</h4>            <b>type</b>: number | <b>default value</b>: 1.5 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 - the width of the all node strokes.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.strokeColor":
        '            <h4>node.strokeColor</h4>            <b>type</b>: string | <b>default value</b>: "none" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍  this is the stroke color that will be applied to the node if no <b>strokeColor property</b> is found inside the node itself (yes <b>you can pass a property "strokeColor" inside the node and that stroke color will override this default one</b>).</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.size":
        '            <h4>node.size</h4>            <b>type</b>: number | <b>default value</b>: 200 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 defines the size of all nodes.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.renderLabel":
        '            <h4>node.renderLabel</h4>            <b>type</b>: boolean | <b>default value</b>: true | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">when set to false no labels will appear along side nodes in the\ngraph.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.opacity":
        '            <h4>node.opacity</h4>            <b>type</b>: number | <b>default value</b>: 1 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 - by default all nodes will have this opacity value.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.mouseCursor":
        '            <h4>node.mouseCursor</h4>            <b>type</b>: string | <b>default value</b>: "pointer" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en/docs/Web/CSS/cursor?v=control">cursor</a>\nproperty for when some node is mouse hovered.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.labelProperty":
        '            <h4>node.labelProperty</h4>            <b>type</b>: string|function | <b>default value</b>: "id" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">this is the node property that will be used in runtime to</br>\nfetch the label content. You just need to add some property (e.g. firstName) to the node payload and then set</br>\nnode.labelProperty to be <b>"firstName"</b>. <b>This can also be a function!</b>, if you pass a function here it will be called</br>\nto obtain the <code>label</code> value on the fly, as a client you will receive all the node information that you passed down into react-d3-graph,</br>\nso the signature of the function would be:\n\nThen you just need to make sure that you pass this function in the config in <code>config.node.labelProperty</code>.\n</br></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.highlightStrokeWidth":
        '            <h4>node.highlightStrokeWidth</h4>            <b>type</b>: number | <b>default value</b>: "SAME" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">strokeWidth in highlighted state.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.highlightStrokeColor":
        '            <h4>node.highlightStrokeColor</h4>            <b>type</b>: string | <b>default value</b>: "SAME" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">strokeColor in highlighted state.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.highlightFontWeight":
        '            <h4>node.highlightFontWeight</h4>            <b>type</b>: string | <b>default value</b>: "normal" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">fontWeight in highlighted state.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.highlightFontSize":
        '            <h4>node.highlightFontSize</h4>            <b>type</b>: number | <b>default value</b>: 8 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">fontSize in highlighted state.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.highlightColor":
        '            <h4>node.highlightColor</h4>            <b>type</b>: string | <b>default value</b>: "SAME" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">color for all highlighted nodes (use string "SAME" if you\nwant the node to keep its color in highlighted state).</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.fontWeight":
        '            <h4>node.fontWeight</h4>            <b>type</b>: string | <b>default value</b>: "normal" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control">font-weight</a>\nproperty for all nodes" labels.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.fontSize":
        '            <h4>node.fontSize</h4>            <b>type</b>: number | <b>default value</b>: 8 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control">font-size</a>\nproperty for all nodes" labels.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.fontColor":
        '            <h4>node.fontColor</h4>            <b>type</b>: string | <b>default value</b>: "black" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 fill color for node"s <text> svg label.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "node.color":
        '            <h4>node.color</h4>            <b>type</b>: string | <b>default value</b>: "#d3d3d3" | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🔍🔍🔍 this is the color that will be applied to the node if no <b>color property</b></br>\nis found inside the node itself (yes <b>you can pass a property "color" inside</b></br>\n<b>the node and that color will override the this default one</b>).</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    node:
        '            <h4>node</h4>            <b>type</b>: Object | <b>default value</b>: undefined | <b>optional</b>: undefined            <h5>Description</h5>            <div style="max-width: 400px;">node object is explained in next section. ⬇️\n<h2 id="config-node"><a href="#config-node">#</a> Node level configurations</h2></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "d3.linkStrength":
        '            <h4>d3.linkStrength</h4>            <b>type</b>: number | <b>default value</b>: 1 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://github.com/d3/d3-force#link_strength">see d3-force link.strength</a>\n</br></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "d3.linkLength":
        '            <h4>d3.linkLength</h4>            <b>type</b>: number | <b>default value</b>: 100 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">the length of each link from the center of the nodes it joins.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "d3.gravity":
        '            <h4>d3.gravity</h4>            <b>type</b>: number | <b>default value</b>: -100 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">this will define how close nodes are to each other <a target="_blank" href="https://github.com/d3/d3-force#forces">see d3 reference for forces</a>.\n - If value is positive, nodes will attract each other.\n - If value is negative, nodes will repel each other. Most of the times this is what we want, so nodes don"t overlap.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    "d3.alphaTarget":
        '            <h4>d3.alphaTarget</h4>            <b>type</b>: number | <b>default value</b>: 0.05 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><a target="_blank" href="https://github.com/d3/d3-force#simulation_alphaTarget">see d3-force simulation.alphaTarget</a></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    d3:
        '            <h4>d3</h4>            <b>type</b>: Object | <b>default value</b>: undefined | <b>optional</b>: undefined            <h5>Description</h5>            <div style="max-width: 400px;">d3 object is explained in next section. ⬇️\n<h2 id="config-d3"><a href="#config-d3">#</a> d3 level configurations</h2></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    width:
        '            <h4>width</h4>            <b>type</b>: number | <b>default value</b>: 800 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">the width of the (svg) area where the graph will be rendered.\n</br></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    staticGraphWithDragAndDrop:
        '            <h4>staticGraphWithDragAndDrop</h4>            <b>type</b>: boolean | <b>default value</b>: undefined | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">exactly the same as above <code>staticGraph</code>, but it will allow users to drag&drop nodes.\n<b>Note</b>: If <code>staticGraph</code> is set to <code>true</code>, then <code>staticGraphWithDragAndDrop</code> will not produce the desired behaviour, make sure\nto set only one of them to <code>true</code>.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    staticGraph:
        '            <h4>staticGraph</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">when setting this value to true the graph will be completely static, thus\nall forces and drag events upon nodes will produce not effect. Note that, if this value is true the nodes will be\nrendered with the initial provided <b>x and y coordinates</b> (links positions will be automatically set\nfrom the given nodes positions by rd3g), no coordinates will be calculated by rd3g or subjacent d3 modules.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    panAndZoom:
        '            <h4>panAndZoom</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🚅🚅🚅 pan and zoom effect when performing zoom in the graph,\na similar functionality may be consulted <a target="_blank" href="https://bl.ocks.org/mbostock/2a39a768b1d4bc00a09650edef75ad39">here</a>.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    minZoom:
        '            <h4>minZoom</h4>            <b>type</b>: number | <b>default value</b>: 0.1 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">min zoom that can be performed against the graph.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    maxZoom:
        '            <h4>maxZoom</h4>            <b>type</b>: number | <b>default value</b>: 8 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">max zoom that can be performed against the graph.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    highlightOpacity:
        '            <h4>highlightOpacity</h4>            <b>type</b>: number | <b>default value</b>: 1 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">this value is used to highlight nodes in the network. The lower\nthe value the more the less highlighted nodes will be visible (related to <i>nodeHighlightBehavior</i>).</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    highlightDegree:
        '            <h4>highlightDegree</h4>            <b>type</b>: number | <b>default value</b>: 1 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;"><b>Possible values: 0, 1 or 2</b>. This value represents the range of the\nhighlight behavior when some node is highlighted. If the value is set to <b>0</b> only the selected node will be\nhighlighted. If the value is set to <b>1</b> the selected node and his 1st degree connections will be highlighted. If\nthe value is set to <b>2</b> the selected node will be highlighted as well as the 1st and 2nd common degree connections.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    linkHighlightBehavior:
        '            <h4>linkHighlightBehavior</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🚅🚅🚅 when the user mouse hovers some link that link and the correspondent nodes will be highlighted, this is a similar behavior\nto <i>nodeHighlightBehavior</i> but for links <small>(just for historical reference this property was introduced in <a target="_blank" href="https://github.com/danielcaldas/react-d3-graph/releases/tag/1.0.0">v1.0.0</a>)</small>.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    nodeHighlightBehavior:
        '            <h4>nodeHighlightBehavior</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🚅🚅🚅 when user mouse hovers a node that node and adjacent common\nconnections will be highlighted (depending on the <i>highlightDegree</i> value). All the remaining nodes and links assume opacity value equal to <b>highlightOpacity</b>.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    height:
        '            <h4>height</h4>            <b>type</b>: number | <b>default value</b>: 400 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">the height of the (svg) area where the graph will be rendered.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    focusAnimationDuration:
        '            <h4>focusAnimationDuration</h4>            <b>type</b>: number | <b>default value</b>: 0.75 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">duration (in seconds) for the animation that takes place when focusing the graph on a node.</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    focusZoom:
        '            <h4>focusZoom</h4>            <b>type</b>: number | <b>default value</b>: 1 | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">zoom that will be applied when the graph view is focused in a node. Its value must be between\n<i>minZoom</i> and <i>maxZoom</i>. If the specified <i>focusZoom</i> is out of this range, <i>minZoom</i> or <i>maxZoom</i> will be applied instead.</br>\n<b>NOTE</b>: This animation is not trigger by default. In order to trigger it you need to pass down to <code>react-d3-graph</code> the\nnode that you want to focus via prop <code>focusedNodeId</code> along side with nodes and links:\n\n\n\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-zoom-animation.gif?raw=true" width=\'400\' height=\'200\'/></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    directed:
        '            <h4>directed</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">This property makes react-d3-graph handle your graph as a directed graph. It will\nout of the box provide the look and feel of a directed graph and add directional semantic to links. You can see a sample in the image below.\n</br>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-directed.gif?raw=true" width=\'400\' height=\'200\'/></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    collapsible:
        '            <h4>collapsible</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🚅🚅🚅 Allow leaf neighbors nodes to be collapsed (folded), this will allow users to clear the way out and focus on the parts of the graph that really matter.\nTo see an example of this behavior you can access this sandbox link that has a specific set up to experiment this feature. <b>NOTE</b>: At this moment\nnodes without connections (orphan nodes) are not rendered when this property is activated (see <a target="_blank" href="https://github.com/danielcaldas/react-d3-graph/issues/129">react-d3-graph/issues/#129</a>).\n</br>\n<img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-collapsible.gif?raw=true" width=\'400\' height=\'200\'/></div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
    automaticRearrangeAfterDropNode:
        '            <h4>automaticRearrangeAfterDropNode</h4>            <b>type</b>: boolean | <b>default value</b>: false | <b>optional</b>: true            <h5>Description</h5>            <div style="max-width: 400px;">🚅🚅🚅 when true performing a node drag and drop should automatically\nrearrange all nodes positions based on new position of dragged node (note: <b>staticGraph</b> should be false).</div>                <small>        for more details check the <a target="_blank" href="https://goodguydaniel.com/react-d3-graph/docs/index.html">official documentation</a>    </small>        ',
};
