/**
 * <div style='text-align: right;'><i>This is certainly the only extra piece of documentation that you will ever need</i></div>
 * <br/><br/>
 * Here you can consult a detailed description of each graph configurable property as well as the default values
 * of those properties.
 *
 * **Note about performance**<br/>
 * Some of the properties have a major performance impact when toggled while rendering graphs of medium or large dimensions (hundreds or thousand of elements).
 * These properties are marked with 🚅🚅🚅.<br/>
 * ⭐ **tip** *to achieve smoother interactions you may want to provide a toggle to set **staticGraph** to **true** *<br/>
 * <br/>
 * **Note about granularity**<br/>
 * Some of the properties listed in the {@link #node-section|Node section} are marked with 🔍🔍🔍. This means that this properties
 * have a higher level of granularity. These properties can be defined in the graph payload at a node level. (sample payload below)
 * ```javascript
 * const graph = {
 *     nodes: [
 *         {
 *             id: 'id',
 *             color: 'red',         // only this node will be red
 *             size: 300,            // only this node will have size 300
 *             symbolType: 'diamond' // only this node will have 'diamond' shape
 *         }
 *     ],
 *     links: [...]
 * };
 * ```
 *
 * <h2>Graph global configurations</h2>
 * @param {boolean} [automaticRearrangeAfterDropNode=false] - 🚅🚅🚅 when true performing a node drag and drop should automatically
 * rearrange all nodes positions based on new position of dragged node (note: **staticGraph** should be false).
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
 * @param {number} [width=800] - the width of the (svg) area where the graph will be rendered.
 * <br/>
 * @param {Object} node node object is explained in next section. ⬇️
 * <h2 id="node-section">Node level configurations</h2>
 * @param {string} [node.color='#d3d3d3'] - 🔍🔍🔍 this is the color that will be applied to the node if no **color property**
 * is found inside the node itself (yes **you can pass a property 'color' inside the node and that color will override the
 * this default one**).
 * @param {string} [node.fontColor='black'] - 🔍🔍🔍 fill color for node's <text> svg label.
 * @param {number} [node.fontSize=10] - {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control|font-size}
 * property for all nodes' labels.
 * @param {string} [node.fontWeight='normal'] - {@link https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control|font-weight}
 * property for all nodes' labels.
 * @param {string} [node.highlightColor='SAME'] - color for all highlighted nodes (use string 'SAME' if you
 * want the node to keep its color in highlighted state).
 * @param {number} [node.highlightFontSize=8] - fontSize in highlighted state.
 * @param {string} [node.highlightFontWeight='normal'] - fontWeight in highlighted state.
 * @param {string} [node.highlightStrokeColor='SAME'] - strokeColor in highlighted state.
 * @param {number} [node.highlightStrokeWidth=1.5] - strokeWidth in highlighted state.
 * @param {string} [node.labelProperty='id'] - this is the node property that will be used in runtime to
 * fetch the label content. You just need to add some property (e.g. firstName) to the node payload and then set
 * node.labelProperty to be **'firstName'**.
 * @param {string} [node.mouseCursor='pointer'] - {@link https://developer.mozilla.org/en/docs/Web/CSS/cursor?v=control|cursor}
 * property for when some node is mouse hovered.
 * @param {number} [node.opacity=1] - by default all nodes will have this opacity value.
 * @param {boolean} [node.renderLabel=true] - when set to false no labels will appear along side nodes in the
 * graph.
 * @param {number} [node.size=200] - 🔍🔍🔍 defines the size of all nodes.
 * @param {string} [node.strokeColor='none'] - color for the stroke of each node.
 * @param {number} [node.strokeWidth=1.5] - the width of the all node strokes.
 * @param {string} [node.svg=''] - 🔍🔍🔍 render custom svg for nodes in alternative to **node.symbolType**. This svg can
 * be provided as a string to either a remote svg resource or for a local one.
 * <br/>
 * <img src="https://github.com/danielcaldas/react-d3-graph/blob/master/docs/rd3g-custom-svg.gif?raw=true" width="820" height="480"/>
 * @param {string} [node.symbolType='circle'] - 🔍🔍🔍 the <span id='node-symbol-type'>shape</span> of the node.
 * Use the following values under a property **type** inside each node (nodes may have different types, same as colors):
 *   - 'circle'
 *   - 'cross'
 *   - 'diamond'
 *   - 'square'
 *   - 'star'
 *   - 'triangle'
 *   - 'wye'
 *
 * **[note]** react-d3-graph will map this values to [d3 symbols](https://github.com/d3/d3-shape#symbols)
 * <br/>
 * @param {Object} link link object is explained in the next section. ⬇️
 * <h2>Link level configurations</h2>
 * @param {string} [link.color='#d3d3d3'] - 🚅🚅🚅 the color for links
 * (from version 1.3.0 this property can be configured at link level).
 * @param {number} [link.opacity=1] - the default opacity value for links.
 * @param {boolean} [link.semanticStrokeWidth=false] - when set to true all links will have
 * *"semantic width"*, this means that the width of the connections will be proportional to the value of each link.
 * This is how link strokeWidth will be calculated:
 * ```javascript
 * strokeWidth += (linkValue * strokeWidth) / 10;
 * ```
 * @param {number} [link.strokeWidth=1.5] - strokeWidth for all links. By default the actual value is obtain by the
 * following expression:
 * ```javascript
 * link.strokeWidth * (1 / transform); // transform is a zoom delta Δ value
 * ```
 * @param {string} [link.highlightColor='#d3d3d3'] - links' color in highlight state.
 *
 * @example
 * // A simple config that uses some properties
 * const myConfig = {
 *     nodeHighlightBehavior: true,
 *     node: {
 *         color: 'lightgreen',
 *         size: 120,
 *         highlightStrokeColor: 'blue'
 *     },
 *     link: {
 *         highlightColor: 'lightblue'
 *     }
 * };
 *
 * // Sorry for the long config description, here's a potato 🥔.
 */
export default {
    automaticRearrangeAfterDropNode: false,
    height: 400,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    width: 800,
    node: {
        color: '#d3d3d3',
        fontColor: 'black',
        fontSize: 8,
        fontWeight: 'normal',
        highlightColor: 'SAME',
        highlightFontSize: 8,
        highlightFontWeight: 'normal',
        highlightStrokeColor: 'SAME',
        highlightStrokeWidth: 1.5,
        labelProperty: 'id',
        mouseCursor: 'pointer',
        opacity: 1,
        renderLabel: true,
        size: 200,
        strokeColor: 'none',
        strokeWidth: 1.5,
        svg: '',
        symbolType: 'circle'
    },
    link: {
        color: '#d3d3d3',
        opacity: 1,
        semanticStrokeWidth: false,
        strokeWidth: 1.5,
        highlightColor: '#d3d3d3'
    }
};
