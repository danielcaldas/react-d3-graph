/**
 * Page Object for interacting with Marker component.
 * @param {string} id - the id of the marker.
 * @returns {undefined}
 */
function MarkerPO(id) {
  this.id = id;
  this.marker = `#${this.id}`;
  this.getColor = () => cy.get(this.marker).invoke("attr", "fill");
}

module.exports = MarkerPO;
