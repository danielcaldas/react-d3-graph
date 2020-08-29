const SANDBOX_URL = Cypress.env("SANDBOX_URL");

const LinkPO = require("../page-objects/link.po");
const NodePO = require("../page-objects/node.po");
const SandboxPO = require("../page-objects/sandbox.po");
const MarkerPO = require("../page-objects/marker.po");

describe("[rd3g-graph-directed]", function() {
  beforeEach(function() {
    this.sandboxPO = new SandboxPO();
    // visit sandbox
    cy.visit(`${SANDBOX_URL}?data=small`);
    // sleep 1.5 seconds
    cy.wait(1500);
    // pause the graph
    this.sandboxPO.pauseGraph();
    // make graph directed and remove labels
    ["node.renderLabel", "directed"].forEach(formKey => {
      cy.contains(formKey).scrollIntoView();
      this.sandboxPO.getFieldInput(formKey).click();
    });
  });

  describe("check for graph elements", function() {
    beforeEach(function() {
      this.node1PO = new NodePO(1);
      this.node2PO = new NodePO(2);
      this.node3PO = new NodePO(3);
      this.node4PO = new NodePO(4);
      this.link12PO = new LinkPO(0);
      this.link13PO = new LinkPO(1);
      this.link14PO = new LinkPO(2);
      this.link34PO = new LinkPO(3);
    });

    afterEach(function() {
      this.sandboxPO.exitFullScreenMode();
    });

    it("should properly display elements for directed graph", function() {
      this.sandboxPO.fullScreenMode().click();

      // Check if other , links and markers are visible
      this.node1PO.getPath().should("be.visible");
      this.node2PO.getPath().should("be.visible");
      this.node3PO.getPath().should("be.visible");
      this.node4PO.getPath().should("be.visible");
      this.link12PO.getLine().should("be.visible");
      this.link12PO.hasMarker();
      this.link13PO.getLine().should("be.visible");
      this.link13PO.hasMarker();
      this.link14PO.getLine().should("be.visible");
      this.link14PO.hasMarker();
      this.link34PO.getLine().should("be.visible");
      this.link34PO.hasMarker();
    });
  });

  describe("when graph is collapsible", function() {
    beforeEach(function() {
      cy.contains("collapsible").scrollIntoView();
      this.sandboxPO.getFieldInput("collapsible").click();

      this.node1PO = new NodePO(1);
      this.node2PO = new NodePO(2);
      this.node3PO = new NodePO(3);
      this.node4PO = new NodePO(4);
      this.link12PO = new LinkPO(0);
      this.link13PO = new LinkPO(1);
      this.link14PO = new LinkPO(2);
      this.link34PO = new LinkPO(3);
    });

    afterEach(function() {
      this.sandboxPO.exitFullScreenMode();
    });

    it("should behave correctly when directed is disabled after collapsed node", function() {
      const toggledLine = this.link12PO.getLine();

      this.sandboxPO.fullScreenMode().click();

      // Check the leaf node & link is present
      this.node2PO.getPath().should("be.visible");
      toggledLine.should("be.visible");

      // Click 'Node 1' in order to collapse the leafs
      this.node1PO.getPath().click();

      // Check the leaf node & link is no longer visible
      this.node2PO.getPath().should("not.be.visible");
      toggledLine.should("not.be.visible");

      // Check if other nodes and links are still visible
      this.node1PO.getPath().should("be.visible");
      this.node3PO.getPath().should("be.visible");
      this.node4PO.getPath().should("be.visible");

      this.link13PO.getLine().should("be.visible");
      this.link14PO.getLine().should("be.visible");
      this.link34PO.getLine().should("be.visible");

      this.sandboxPO.exitFullScreenMode();

      // Disable "directed"
      cy.contains("directed").scrollIntoView();
      this.sandboxPO.getFieldInput("directed").click();

      this.sandboxPO.fullScreenMode().click();

      // Check if other nodes and links are still visible
      this.node1PO.getPath().should("be.visible");
      this.node2PO.getPath().should("be.visible");
      this.node3PO.getPath().should("be.visible");
      this.node4PO.getPath().should("be.visible");

      toggledLine.should("be.visible");
      this.link13PO.getLine().should("be.visible");
      this.link14PO.getLine().should("be.visible");
      this.link34PO.getLine().should("be.visible");
    });

    it("should behave correctly when collapsible is disabled after collapsible node", function() {
      this.sandboxPO.fullScreenMode().click();

      const toggledLine = this.link12PO.getLine();

      // Check the leaf node & link is present
      this.node2PO.getPath().should("be.visible");
      toggledLine.should("be.visible");

      // Click 'Node 1' in order to collapse the leafs
      this.node1PO.getPath().click();

      // Check the leaf node & link is no longer visible
      this.node2PO.getPath().should("not.be.visible");
      toggledLine.should("not.be.visible");

      // Check if other nodes and links are still visible
      this.node1PO.getPath().should("be.visible");
      this.node3PO.getPath().should("be.visible");
      this.node4PO.getPath().should("be.visible");

      this.link13PO.getLine().should("be.visible");
      this.link14PO.getLine().should("be.visible");
      this.link34PO.getLine().should("be.visible");

      this.sandboxPO.exitFullScreenMode();

      // Disable "collapsible"
      cy.contains("collapsible").scrollIntoView();
      this.sandboxPO.getFieldInput("collapsible").click();

      this.sandboxPO.fullScreenMode().click();

      // The previously hidden node should reappear
      this.node2PO.getPath().should("be.visible");
      toggledLine.should("be.visible");
      this.link12PO.hasMarker();

      // Check if other nodes and links are still visible
      this.node1PO.getPath().should("be.visible");
      this.node3PO.getPath().should("be.visible");
      this.node4PO.getPath().should("be.visible");

      this.link13PO.getLine().should("be.visible");
      this.link13PO.hasMarker();
      this.link14PO.getLine().should("be.visible");
      this.link14PO.hasMarker();
      this.link34PO.getLine().should("be.visible");
      this.link34PO.hasMarker();
    });
  });

  describe("check graph markers", function() {
    beforeEach(function() {
      this.markerSmall = new MarkerPO("marker-small");
      this.markerSmallHighlighted = new MarkerPO("marker-small-highlighted");
      this.markerMedium = new MarkerPO("marker-medium");
      this.markerMediumHighlighted = new MarkerPO("marker-medium-highlighted");
      this.markerLarge = new MarkerPO("marker-large");
      this.markerLargeHighlighted = new MarkerPO("marker-large-highlighted");
    });

    afterEach(function() {
      // Reset link.color and link.highlightColor
      cy.contains("link.color").scrollIntoView();
      this.sandboxPO
        .getFieldInput("link.color")
        .clear()
        .type("#d3d3d3");

      cy.contains("link.highlightColor").scrollIntoView();
      this.sandboxPO
        .getFieldInput("link.highlightColor")
        .clear()
        .type("blue");
    });

    it("should correctly render inital marker colors", function() {
      this.markerSmall.getColor().should("eq", "#d3d3d3");
      this.markerSmallHighlighted.getColor().should("eq", "blue");
      this.markerMedium.getColor().should("eq", "#d3d3d3");
      this.markerMediumHighlighted.getColor().should("eq", "blue");
      this.markerLarge.getColor().should("eq", "#d3d3d3");
      this.markerLargeHighlighted.getColor().should("eq", "blue");
    });

    it("should correctly render marker colors based on current link.color and link.highlightColor", function() {
      cy.contains("link.color").scrollIntoView();
      this.sandboxPO
        .getFieldInput("link.color")
        .clear()
        .type("rgba(255,0,0,0.9)");

      cy.contains("link.highlightColor").scrollIntoView();
      this.sandboxPO
        .getFieldInput("link.highlightColor")
        .clear()
        .type("green");

      this.markerSmall.getColor().should("eq", "rgba(255,0,0,0.9)");
      this.markerSmallHighlighted.getColor().should("eq", "green");
      this.markerMedium.getColor().should("eq", "rgba(255,0,0,0.9)");
      this.markerMediumHighlighted.getColor().should("eq", "green");
      this.markerLarge.getColor().should("eq", "rgba(255,0,0,0.9)");
      this.markerLargeHighlighted.getColor().should("eq", "green");
    });

    it("should correctly render marker colors when link.highlightColor is SAME", function() {
      cy.contains("link.color").scrollIntoView();
      this.sandboxPO
        .getFieldInput("link.color")
        .clear()
        .type("green");

      cy.contains("link.highlightColor").scrollIntoView();
      this.sandboxPO
        .getFieldInput("link.highlightColor")
        .clear()
        .type("SAME");

      this.markerSmall.getColor().should("eq", "green");
      this.markerSmallHighlighted.getColor().should("eq", "green");
      this.markerMedium.getColor().should("eq", "green");
      this.markerMediumHighlighted.getColor().should("eq", "green");
      this.markerLarge.getColor().should("eq", "green");
      this.markerLargeHighlighted.getColor().should("eq", "green");
    });
  });
});
