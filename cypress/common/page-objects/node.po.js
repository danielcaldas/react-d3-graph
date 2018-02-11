/**
 * Page Object for interacting with Node component.
 * @param {string} id the id of the node.
 * @returns {undefined}
 */
function NodePO (id) {
    this.id = id;
    this.path = `#${this.id} > path`;
    this.text = `#${this.id} > text`;

    this.getPath = () => cy.get(this.path);
    this.getLabel = () => cy.get(this.text);
    this.getColor = () => cy.get(this.path).invoke('attr', 'fill');
    this.getFontSize = () => cy.get(this.text).invoke('attr', 'font-size');
}

module.exports = NodePO;