/**
 * Page Object for interacting with sandbox interface.
 * @returns {undefined}
 */
function SandboxPO() {
  // whitelist checkbox inputs
  this.checkboxes = ["link.renderLabel", "node.renderLabel", "staticGraph", "collapsible", "directed"];

  // actions
  this.fullScreenMode = () => cy.get(".container__graph > :nth-child(1) > :nth-child(1)");
  this.exitFullScreenMode = () => cy.get(".cross-icon").click();
  this.playGraph = () => cy.get(".container__graph > :nth-child(1) > :nth-child(2)").click();
  this.pauseGraph = () => cy.get(".container__graph > :nth-child(1) > :nth-child(3)").click();
  this.addNode = () => cy.get(".container__graph > :nth-child(1) > :nth-child(5)").click();
  this.removeNode = () => cy.get(".container__graph > :nth-child(1) > :nth-child(6)").click();
  this.clickJsonTreeNodes = () => {
    cy.get(".container__graph-data")
      .contains("root")
      .scrollIntoView();
    cy.get(".container__graph-data")
      .contains("nodes")
      .click();
  };
  // must be collapsed
  this.clickJsonTreeFirstNode = () =>
    cy
      .get(
        ":nth-child(2) > .rejt-not-collapsed > .rejt-not-collapsed-list > :nth-child(1) > .rejt-collapsed > .rejt-collapsed-text"
      )
      .click();
  this.addJsonTreeFirstNodeProp = () =>
    cy.get(":nth-child(2) > :nth-child(1) > .rejt-not-collapsed > :nth-child(4) > .rejt-plus-menu").click();
  this.deleteJsonTreeFirstNodeProp = () =>
    cy.get(".rejt-not-collapsed-list > :nth-child(2) > .rejt-minus-menu").click();
  this.jsonTreeExpandLinks = () =>
    cy
      .get(".rejt-tree > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1) > .rejt-name")
      .click();
  this.clickJsonTreeFirstLink = () =>
    cy
      .get(":nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1) > .rejt-name")
      .click();
  this.addJsonTreeFirstLinkProp = () =>
    cy
      .get(
        ":nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > .rejt-not-collapsed > :nth-child(4) > .rejt-plus-menu"
      )
      .click();
  this.deleteJsonTreeLastLinkProp = () => cy.get(".rejt-not-collapsed-list > :nth-child(4) > .rejt-minus-menu").click();

  // element getters
  this.getFieldInput = field =>
    this.checkboxes.includes(field)
      ? cy.contains(field).children("input")
      : cy.contains(field).siblings(".form-control");
  this.getGraphNumbers = () => cy.get(".container__graph-info");
}

module.exports = SandboxPO;
