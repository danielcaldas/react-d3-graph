/**
 * <div style="text-align: right;"><i>This is certainly the only extra piece of documentation that you will ever need</i></div>
 * <br/><br/>
 * Here you can consult a detailed description of each graph configurable property as well as the default values
 * of those properties.
 *
 * **Note about performance**<br/>
 * Some of the properties have a major performance impact when toggled while rendering graphs of medium or large dimensions (hundreds or thousand of elements).
 * These properties are marked with 🚅🚅🚅.<br/>
 * ⭐ **tip** *to achieve smoother interactions you may want to provide a toggle to set **staticGraph** or (better) **staticGraphWithDragAndDrop** to **true** *<br/>
 * <br/>
 * **Note about granularity**<br/>
 * Some of the properties listed in the {@link #config-node|Node section} are marked with 🔍🔍🔍. This means that this properties
 * have a higher level of granularity. These properties can be defined in the graph payload at a node level. (sample payload below)
 * ```javascript
 * const graph = {
 *     nodes: [
 *         {
 *             id: "id",
 *             color: "red",         // only this node will be red
 *             size: 300,            // only this node will have size 300
 *             symbolType: "diamond" // only this node will have "diamond" shape
 *         }
 *     ],
 *     links: [...]
 * };
 * ```
 *
 * <br/>
 *
 * - <a href="#config-global">Graph global configurations</a>
 * - <a href="#config-d3">d3 level configurations</a>
 * - <a href="#config-node">Node level configurations</a>
 * - <a href="#config-link">Link level configurations</a>
 *
 * <br/>
 *
 * <h2 id="config-global"><a href="#config-global">#</a>  Graph global configurations</h2>
 * @param {boolean} [automaticRearrangeAfterDropNode=false] - 🚅🚅🚅 when true performing a node drag and drop should automatically
 * rearrange all nodes positions based on new position of dragged node (note: **staticGraph** should be false).
 * @param {boolean} [collapsible=false] - 🚅🚅🚅 Allow leaf neighbors nodes to be collapsed (folded), this will allow users to clear the way out and focus on the parts of the graph that really matter.
 * To see an example of this behavior you can access this sandbox link that has a specific set up to experiment this feature. **NOTE**: At this moment
 * nodes without connections (orphan nodes) are not rendered when this property is activated (see [react-d3-graph/issues/#129](https://github.com/danielcaldas/react-d3-graph/issues/129)).
 * <br/>
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-collapsible.gif?raw=true" width="820" height="480"/>
 * @param {boolean} [directed=false] - This property makes react-d3-graph handle your graph as a directed graph. It will
 * out of the box provide the look and feel of a directed graph and add directional semantic to links. You can see a sample in the image below.
 * <br/>
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-directed.gif?raw=true" width="820" height="480"/>
 * @param {number} [focusZoom=1] - zoom that will be applied when the graph view is focused in a node. Its value must be between
 * *minZoom* and *maxZoom*. If the specified *focusZoom* is out of this range, *minZoom* or *maxZoom* will be applied instead.
 * **NOTE:** This animation is not trigger by default. In order to trigger it you need to pass down to `react-d3-graph` the
 * node that you want to focus via prop `focusedNodeId` along side with nodes and links:
 *
 * ```javascript
 * const data = {
 *    nodes: this.state.data.nodes,
 *    links: this.state.data.links,
 *    focusedNodeId: "nodeIdToTriggerZoomAnimation"
 * };
 * ```
 *
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-zoom-animation.gif?raw=true" width="820" height="480"/>
 *
 * @param {number} [focusAnimationDuration=0.75] - duration (in seconds) for the animation that takes place when focusing the graph on a node.
 * @param {number} [height=400] - the height of the (svg) area where the graph will be rendered.
 * @param {boolean} [nodeHighlightBehavior=false] - 🚅🚅🚅 when user mouse hovers a node that node and adjacent common
 * connections will be highlighted (depending on the *highlightDegree* value). All the remaining nodes and links assume opacity value equal to **highlightOpacity**.
 * @param {boolean} [linkHighlightBehavior=false] - 🚅🚅🚅 when the user mouse hovers some link that link and the correspondent nodes will be highlighted, this is a similar behavior
 * to *nodeHighlightBehavior* but for links <small>(just for historical reference this property was introduced in **v1.0.0**)</small>.
 * @param {number} [highlightDegree=1] - **Possible values: 0, 1 or 2**. This value represents the range of the
 * highlight behavior when some node is highlighted. If the value is set to **0** only the selected node will be
 * highlighted. If the value is set to **1** the selected node and his 1st degree connections will be highlighted. If
 * the value is set to **2** the selected node will be highlighted as well as the 1st and 2nd common degree connections.
 * @param {number} [highlightOpacity=1] - this value is used to highlight nodes in the network. The lower
 * the value the more the less highlighted nodes will be visible (related to *nodeHighlightBehavior*).
 * @param {number} [maxZoom=8] - max zoom that can be performed against the graph.
 * @param {number} [minZoom=0.1] - min zoom that can be performed against the graph.
 * @param {boolean} [panAndZoom=false] - 🚅🚅🚅 pan and zoom effect when performing zoom in the graph,
 * a similar functionality may be consulted {@link https://bl.ocks.org/mbostock/2a39a768b1d4bc00a09650edef75ad39|here}.
 * @param {boolean} [staticGraph=false] - when setting this value to true the graph will be completely static, thus
 * all forces and drag events upon nodes will produce not effect. Note that, if this value is true the nodes will be
 * rendered with the initial provided **x and y coordinates** (links positions will be automatically set
 * from the given nodes positions by rd3g), no coordinates will be calculated by rd3g or subjacent d3 modules.
 * @param {boolean} [staticGraphWithDragAndDrop] - exactly the same as above `staticGraph`, but it will allow users to drag&drop nodes.
 * **Note**: If `staticGraph` is set to `true`, then `staticGraphWithDragAndDrop` will not produce the desired behaviour, make sure
 * to set only one of them to `true`.
 * @param {number} [width=800] - the width of the (svg) area where the graph will be rendered.
 * <br/>
 * @param {Object} d3 d3 object is explained in next section. ⬇️
 * <h2 id="config-d3"><a href="#config-d3">#</a> d3 level configurations</h2>
 * @param {number} [d3.alphaTarget=0.05] - [see d3-force simulation.alphaTarget](https://github.com/d3/d3-force#simulation_alphaTarget)
 * @param {number} [d3.gravity=-100] - this will define how close nodes are to each other ([see d3 reference for forces](https://github.com/d3/d3-force#forces)).
 *  - If value is positive, nodes will attract each other.
 *  - If value is negative, nodes will repel each other. Most of the times this is what we want, so nodes don"t overlap.
 * @param {number} [d3.linkLength=100] - the length of each link from the center of the nodes it joins.
 * @param {number} [d3.linkStrength=1] - [see d3-force link.strength](https://github.com/d3/d3-force#link_strength)
 * <br/>
 * @param {Object} node node object is explained in next section. ⬇️
 * <h2 id="config-node"><a href="#config-node">#</a> Node level configurations</h2>
 * @param {string} [node.color="#d3d3d3"] - 🔍🔍🔍 this is the color that will be applied to the node if no **color property**
 * is found inside the node itself (yes **you can pass a property "color" inside the node and that color will override the
 * this default one**).
 * @param {string} [node.fontColor="black"] - 🔍🔍🔍 fill color for node"s <text> svg label.
 * @param {number} [node.fontSize=8] - {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control|font-size}
 * property for all nodes" labels.
 * @param {string} [node.fontWeight="normal"] - {@link https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control|font-weight}
 * property for all nodes" labels.
 * @param {string} [node.highlightColor="SAME"] - color for all highlighted nodes (use string "SAME" if you
 * want the node to keep its color in highlighted state).
 * @param {number} [node.highlightFontSize=8] - fontSize in highlighted state.
 * @param {string} [node.highlightFontWeight="normal"] - fontWeight in highlighted state.
 * @param {string} [node.highlightStrokeColor="SAME"] - strokeColor in highlighted state.
 * @param {number} [node.highlightStrokeWidth="SAME"] - strokeWidth in highlighted state.
 * @param {string|Function} [node.labelProperty="id"] - this is the node property that will be used in runtime to
 * fetch the label content. You just need to add some property (e.g. firstName) to the node payload and then set
 * node.labelProperty to be **"firstName"**. **This can also be a function!**, if you pass a function here it will be called
 * to obtain the `label` value on the fly, as a client you will receive all the node information that you passed down into react-d3-graph,
 * so the signature of the function would be:
 * ```javascript
 * function myCustomLabelBuilder(node) {
 *     // do stuff to get the final result...
 *     return "label string";
 * }
 * ```
 * Then you just need to make sure that you pass this function in the config in `config.node.labelProperty`.
 * <br/>
 * @param {string} [node.mouseCursor="pointer"] - {@link https://developer.mozilla.org/en/docs/Web/CSS/cursor?v=control|cursor}
 * property for when some node is mouse hovered.
 * @param {number} [node.opacity=1] 🔍🔍🔍 - by default all nodes will have this opacity value.
 * @param {boolean} [node.renderLabel=true] - when set to false no labels will appear along side nodes in the
 * graph.
 * @param {number} [node.size=200] - 🔍🔍🔍 defines the size of all nodes.
 * @param {string} [node.strokeColor="none"] - 🔍🔍🔍  this is the stroke color that will be applied to the node if no **strokeColor property** is found inside the node itself (yes **you can pass a property "strokeColor" inside the node and that stroke color will override this default one** ).
 * @param {number} [node.strokeWidth=1.5] 🔍🔍🔍 - the width of the all node strokes.
 * @param {string} [node.svg=""] - 🔍🔍🔍 render custom svg for nodes in alternative to **node.symbolType**. This svg can
 * be provided as a string to either a remote svg resource or for a local one.
 * <br/>
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-custom-svg.gif?raw=true" width="820" height="480"/>
 * @param {string} [node.symbolType="circle"] - 🔍🔍🔍 the <span id="node-symbol-type">shape</span> of the node.
 * Use the following values under a property **type** inside each node (nodes may have different types, same as colors):
 *   - "circle"
 *   - "cross"
 *   - "diamond"
 *   - "square"
 *   - "star"
 *   - "triangle"
 *   - "wye"
 *
 * **[note]** react-d3-graph will map this values to [d3 symbols](https://github.com/d3/d3-shape#symbols)
 * @param {Function} [node.viewGenerator=null] - 🔍🔍🔍 function that receives a node and returns a JSX view.
 * <br/>
 * @param {Object} link link object is explained in the next section. ⬇️
 * <h2 id="config-link"><a href="#config-link">#</a> Link level configurations</h2>
 * @param {string} [link.color="#d3d3d3"] - 🔍🔍🔍 the color for links
 * (from version 1.3.0 this property can be configured at link level).
 * @param {string} [link.fontColor="black"] - 🔍🔍🔍 fill color for link's <text> svg label.
 * @param {number} [link.fontSize=8] - {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control|font-size}
 * property for all links' labels.
 * @param {string} [link.fontWeight="normal"] - {@link https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control|font-weight}
 * property for all links' labels.
 * @param {string} [link.highlightColor="#d3d3d3"] - links' color in highlight state.
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-bend.gif?raw=true" width="820" height="480"/>
 * @param {number} [link.highlightFontSize=8] - fontSize in highlighted state.
 * @param {string} [link.highlightFontWeight="normal"] - fontWeight in highlighted state.
 * @param {string|Function} [link.labelProperty="label"] - the property that will be rendered as label within some link. Note that
 * this property needs to be passed along the link payload (along side with source and target). This property can also be a function
 * that receives the link itself as argument and returns a custom string, similarly to what happens with `node.labelProperty`.
 * @param {string} [link.mouseCursor="pointer"] - {@link https://developer.mozilla.org/en/docs/Web/CSS/cursor?v=control|cursor}
 * property for when link is mouse hovered.
 * @param {number} [link.opacity=1] 🔍🔍🔍 - the default opacity value for links.
 * @param {boolean} [link.renderLabel=false] - when set to true labels will appear along side links in the
 * graph. **Note**: this will only happen of course if proper label is passed within the link, check also `link.labelProperty`.
 * <br/>
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-link-render-label.png?raw=true" width="820" height="480"/>
 * @param {boolean} [link.semanticStrokeWidth=false] - when set to true all links will have
 * *"semantic width"*, this means that the width of the connections will be proportional to the value of each link.
 * This is how link strokeWidth will be calculated:
 * ```javascript
 * strokeWidth += (linkValue * strokeWidth) / 10;
 * ```
 * @param {number} [link.strokeWidth=1.5] 🔍🔍🔍 - strokeWidth for all links. By default the actual value is obtain by the
 * following expression:
 * ```javascript
 * link.strokeWidth * (1 / transform); // transform is a zoom delta Δ value
 * ```
 * @param {string} [link.type="STRAIGHT"] - the type of line to draw, available types at this point are:
 * - "STRAIGHT" <small>(default)</small> - a straight line.
 * - "CURVE_SMOOTH" - a slight curve between two nodes
 * - "CURVE_FULL" - a semicircumference trajectory unites source and target nodes.
 * <br/>
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-bend.gif?raw=true" width="820" height="480"/>
 *
 * @example
 * // A simple config that uses some properties
 * const myConfig = {
 *     nodeHighlightBehavior: true,
 *     node: {
 *         color: "lightgreen",
 *         size: 120,
 *         highlightStrokeColor: "blue"
 *     },
 *     link: {
 *         highlightColor: "lightblue"
 *     }
 * };
 *
 * // Sorry for the long config description, here"s a potato 🥔.
 */
export default {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    height: 400,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 800,
    d3: {
        alphaTarget: 0.05,
        gravity: -100,
        linkLength: 100,
        linkStrength: 1,
    },
    node: {
        color: "#d3d3d3",
        fontColor: "black",
        fontSize: 8,
        fontWeight: "normal",
        highlightColor: "SAME",
        highlightFontSize: 8,
        highlightFontWeight: "normal",
        highlightStrokeColor: "SAME",
        highlightStrokeWidth: "SAME",
        labelProperty: "id",
        mouseCursor: "pointer",
        opacity: 1,
        renderLabel: true,
        size: 200,
        strokeColor: "none",
        strokeWidth: 1.5,
        svg: "",
        symbolType: "circle",
        viewGenerator: null,
    },
    link: {
        color: "#d3d3d3",
        fontColor: "black",
        fontSize: 8,
        fontWeight: "normal",
        // FIXME: highlightColor default should be "SAME", breaking change
        highlightColor: "#d3d3d3",
        highlightFontSize: 8,
        highlightFontWeight: "normal",
        labelProperty: "label",
        mouseCursor: "pointer",
        opacity: 1,
        renderLabel: false,
        semanticStrokeWidth: false,
        strokeWidth: 1.5,
        type: "STRAIGHT",
    },
};
