/**
 * Page Object for interacting with Node component.
 * @param {string} id the id of the node.
 * @returns {undefined}
 */
function NodePO(id) {
  this.id = id;
  this.g = `#${this.id}`;
  this.path = `#${this.id} > path`;
  this.text = `#${this.id} > text`;
  this.image = `#${this.id} > image`;

  this.getPath = () => cy.get(this.path);
  this.getLabel = () => cy.get(this.text);
  this.getColor = () => cy.get(this.path).invoke("attr", "fill");
  this.getFontSize = () => cy.get(this.text).invoke("attr", "font-size");
  this.getFontWeight = () => cy.get(this.text).invoke("attr", "font-weight");
  this.getImage = () => cy.get(this.image);
  this.getImageHref = () => cy.get(this.image).invoke("attr", "href");
  this.getImageWidth = () => cy.get(this.image).invoke("attr", "width");
  this.getImageHeight = () => cy.get(this.image).invoke("attr", "height");
  this.getOpacity = () => cy.get(this.path).invoke("attr", "opacity");
}

module.exports = NodePO;
