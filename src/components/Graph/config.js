/**
 * *This is certainly the only extra piece of documentation that you will ever need.*<br/><br/>
 * Here you can consult a detailed description of each graph configurable property as well as the default values
 * that each of that property assume.
 *
 * **Note about granularity**<br/>
 * Some of the properties listed in the {@link #node-section|Node section} are marked with 🔍🔍🔍. This means that this properties
 * have a higher level of granularity. These properties can be defined in the graph payload at a node level. (sample payload below)
 * ```javascript
 * const graph = {
 *     nodes: [
 *         {
 *             id: 'id',
 *             color: 'red',   // only this node will be red
 *             size: 300,      // only this node will have size 300
 *             type: 'diamond' // only this node will have 'diamond' shape
 *         }
 *     ],
 *     links: [...]
 * };
 * ```
 *
 * <h2>Graph global configurations</h2>
 * @param {boolean} [automaticRearrangeAfterDropNode=false] - when true performing a node drag and drop should automatically
 * rearrange all nodes positions based on new position of dragged node (note: **staticGraph** should be false).
 * @param {number} [height=400] - the height of the (svg) area where the graph will be rendered.
 * @param {boolean} [highlightBehavior=false] - when user mouse hovers a node that node and adjacent common
 * connections will be highlighted. All the remaining nodes and links assume opacity value equal to **highlightOpacity**.
 * @param {number} [highlightOpacity=1] - this value is used to highlight nodes in the network. The lower
 * the value the more the less highlighted nodes will be visible (related to **highlightBehavior**).
 * @param {number} [maxZoom=8] - max zoom that can be performed against the graph.
 * @param {number} [minZoom=0.1] - min zoom that can be performed against the graph.
 * @param {boolean} [staticGraph=false] - when setting this value to true the graph will be completely static, thus
 * all forces and drag events upon nodes will be disabled. **Plus**, if this value is true the nodes will be rendered
 * in the provided **x and y coordinates**, no coordinates will be calculated by react-d3-graph.
 * @param {number} [width=800] - the width of the (svg) area where the graph will be rendered.
 * <br/>
 * @param {Object} node node object is explained in next section.
 * <h2 id="node-section">Node level configurations</h2>
 * @param {string} [node.color='#d3d3d3'] - 🔍🔍🔍 this is the color that will be applied to the node if no **color property**
 * is found inside the node itself (yes **you can pass a property 'color' inside the node and that color will override the
 * this default one**).
 * @param {number} [node.fontSize=10] - {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size?v=control|font-size}
 * property for all nodes' labels.
 * @param {string} [node.fontWeight='normal'] - {@link https://developer.mozilla.org/en/docs/Web/CSS/font-weight?v=control|font-weight}
 * property for all nodes' labels.
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
 * **[note]** react-d3-graph will map this values to d3 symbols ({@link https://github.com/d3/d3-shape#symbols})
 * @param {string} [node.highlightColor='SAME'] - color for all highlighted nodes (use string 'SAME' if you
 * want the node to keep its color in highlighted state).
 * @param {number} [node.highlightFontSize=10] - node.fontSize in highlighted state.
 * @param {string} [node.highlightFontWeight='normal'] - node.fontWeight in highlighted state.
 * @param {string} [node.highlightStrokeColor='SAME'] - node.strokeColor in highlighted state.
 * @param {number} [node.highlightStrokeWidth=1.5] - node.strokeWidth in highlighted state.
 * <br/>
 * @param {Object} link link object is explained in the next section.
 * <h2>Link level configurations</h2>
 * @param {string} [link.color='#d3d3d3'] - the color for links.
 * @param {number} [link.opacity=1] - the default opacity value for links.
 * @param {boolean} [link.semanticStrokeWidth=false] - when set to true all links will have
 * *"semantic width"*, this means that the width of the connections will be proportional to the value of each link.
 * This is how link strokeWidth will be calculated:
 * ```javascript
 * strokeWidth += (linkValue * strokeWidth) / 10;
 * ```
 * @param {number} [link.strokeWidth=1.5] - strokeWidth for all links.
 * @param {string} [link.highlightColor='#d3d3d3'] - links color in highlight state.
 *
 * @example
 * // A simple config that uses some properties
 * const myConfig = {
 *     highlightBehavior: true,
 *     node: {
 *         color: 'lightgreen',
 *         size: 120,
 *         highlightStrokeColor: 'blue'
 *     },
 *     link: {
 *         highlightColor: 'lightblue'
 *     }
 * };
 */
export default {
    automaticRearrangeAfterDropNode: false,
    height: 400,
    highlightBehavior: false,
    highlightOpacity: 1,
    maxZoom: 8,
    minZoom: 0.5,
    staticGraph: false,
    width: 800,
    node: {
        color: '#d3d3d3',
        fontSize: 8,
        fontWeight: 'normal',
        labelProperty: 'id',
        mouseCursor: 'pointer',
        opacity: 1,
        renderLabel: true,
        size: 80,
        strokeColor: 'none',
        strokeWidth: 1.5,
        symbolType: 'circle',
        highlightColor: 'SAME',
        highlightFontSize: 8,
        highlightFontWeight: 'normal',
        highlightStrokeColor: 'SAME',
        highlightStrokeWidth: 1.5
    },
    link: {
        color: '#d3d3d3',
        opacity: 1,
        semanticStrokeWidth: false,
        strokeWidth: 1.5,
        highlightColor: '#d3d3d3'
    }
};
