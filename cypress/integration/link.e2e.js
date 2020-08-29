const SANDBOX_URL = Cypress.env("SANDBOX_URL");

const LinkPO = require("../page-objects/link.po");
const NodePO = require("../page-objects/node.po");
const SandboxPO = require("../page-objects/sandbox.po");

describe("[rd3g-link]", function() {
  before(function() {
    this.sandboxPO = new SandboxPO();
    // visit sandbox
    cy.visit(`${SANDBOX_URL}?data=small`);
    // sleep 2 seconds
    cy.wait(2000);
    // pause the graph
    this.sandboxPO.pauseGraph();

    this.node1PO = new NodePO(1);
    this.node2PO = new NodePO(2);
    this.node3PO = new NodePO(3);
    this.node4PO = new NodePO(4);
    this.link12PO = new LinkPO(0);
    this.link13PO = new LinkPO(1);
    this.link14PO = new LinkPO(2);
    this.link34PO = new LinkPO(3);
  });

  describe("when some link.renderLabel is enable", function() {
    beforeEach(function() {
      cy.contains("link.renderLabel").scrollIntoView();
      this.sandboxPO.getFieldInput("link.renderLabel").click();
    });

    describe("and some link has a 'labelProperty'", function() {
      it("should properly render the label in the link between two nodes", function() {
        // link between nodes' 1 and 2 should have a label
        this.link12PO.getLabel().contains("from 1 to 2");
      });
    });

    afterEach(function() {
      cy.contains("link.renderLabel").scrollIntoView();
      this.sandboxPO.getFieldInput("link.renderLabel").click();
    });
  });

  describe("when highlightDegree is 0", function() {
    beforeEach(function() {
      // set highlightDegree to 0
      cy.contains("highlightDegree").scrollIntoView();
      this.sandboxPO
        .getFieldInput("highlightDegree")
        .clear()
        .type("0");
    });

    it("(0) graph should react properly to mouse over events on nodes and links", function() {
      // mouse over 'Node 3'
      // highlight node 3 only
      this.node3PO.getPath().trigger("mouseover");

      this.node1PO.getColor().should("eq", "#d3d3d3");
      this.node1PO.getOpacity().should("eq", "0.2");

      this.node2PO.getColor().should("eq", "#d3d3d3");
      this.node2PO.getOpacity().should("eq", "0.2");

      this.node3PO.getColor().should("eq", "red");
      this.node3PO.getFontWeight().should("eq", "bold");

      this.node4PO.getColor().should("eq", "#d3d3d3");
      this.node4PO.getOpacity().should("eq", "0.2");

      this.link12PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link12PO.shouldHaveOpacity(0.2);

      this.link13PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link13PO.shouldHaveOpacity(0.2);

      this.link14PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link14PO.shouldHaveOpacity(0.2);

      this.link34PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link34PO.shouldHaveOpacity(0.2);
    });
  });

  describe("when highlightDegree is 1", function() {
    beforeEach(function() {
      // set highlightDegree to 1
      cy.contains("highlightDegree").scrollIntoView();
      this.sandboxPO
        .getFieldInput("highlightDegree")
        .clear()
        .type("1");
    });

    it("(1) graph should react properly to mouse over events on nodes and links", function() {
      // mouse over 'Node 3'
      // highlight nodes 1, 3 and 4 and respective links
      // not highlight node 2 and other connections
      this.node3PO.getPath().trigger("mouseover");

      this.node1PO.getColor().should("eq", "red");
      this.node1PO.getFontWeight().should("eq", "bold");

      this.node2PO.getColor().should("eq", "#d3d3d3");
      this.node2PO.getOpacity().should("eq", "0.2");

      this.node3PO.getColor().should("eq", "red");
      this.node3PO.getFontWeight().should("eq", "bold");

      this.node4PO.getColor().should("eq", "red");
      this.node4PO.getFontWeight().should("eq", "bold");

      this.link12PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link12PO.shouldHaveOpacity(0.2);

      this.link13PO.shouldHaveColor("blue");

      this.link14PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link14PO.shouldHaveOpacity(0.2);

      this.link34PO.shouldHaveColor("blue");
    });
  });

  describe("when highlightDegree is 2", function() {
    beforeEach(function() {
      // set highlightDegree to 2
      cy.contains("highlightDegree").scrollIntoView();
      this.sandboxPO
        .getFieldInput("highlightDegree")
        .clear()
        .type("2");
    });

    it("(2) graph should react properly to mouse over events on nodes and links", function() {
      // mouse over 'Node 3'
      // highlight nodes 1, 3 and 4 and respective links
      // should also highlight 2nd degree connection between 1 and 4
      // not highlight node 2 and other connections
      this.node3PO.getPath().trigger("mouseover");

      this.node1PO.getColor().should("eq", "red");
      this.node1PO.getFontWeight().should("eq", "bold");

      this.node2PO.getColor().should("eq", "#d3d3d3");
      this.node2PO.getOpacity().should("eq", "0.2");

      this.node3PO.getColor().should("eq", "red");
      this.node3PO.getFontWeight().should("eq", "bold");

      this.node4PO.getColor().should("eq", "red");
      this.node4PO.getFontWeight().should("eq", "bold");

      this.link12PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link12PO.shouldHaveOpacity(0.2);

      this.link13PO.shouldHaveColor("blue");

      this.link14PO.shouldHaveColor("blue");

      this.link34PO.shouldHaveColor("blue");
    });
  });

  describe("when mouse is over some link", function() {
    beforeEach(function() {
      // small hack to disable any previous highlight behavior
      this.sandboxPO.fullScreenMode().click();
    });

    afterEach(function() {
      this.sandboxPO.exitFullScreenMode();
    });

    it("should highlight the link and the intervening nodes", function() {
      // mouse over link between nodes 1 and 4
      // should highlight nodes 1 and 4 as well as they're connection
      this.link14PO
        .getLine()
        .click()
        .trigger("mouseover");

      this.node1PO.getColor().should("eq", "red");
      this.node1PO.getFontWeight().should("eq", "bold");

      this.node2PO.getColor().should("eq", "#d3d3d3");
      this.node2PO.getOpacity().should("eq", "0.2");

      this.node3PO.getColor().should("eq", "#d3d3d3");
      this.node3PO.getOpacity().should("eq", "0.2");

      this.node4PO.getColor().should("eq", "red");
      this.node4PO.getFontWeight().should("eq", "bold");

      this.link12PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link12PO.shouldHaveOpacity(0.2);

      this.link13PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link13PO.shouldHaveOpacity(0.2);

      this.link14PO.shouldHaveColor("blue");

      this.link34PO.shouldHaveColor("rgb(211, 211, 211)");
      this.link34PO.shouldHaveOpacity(0.2);

      // clean
      this.link14PO
        .getLine()
        .click()
        .trigger("mouseout");
    });
  });

  describe("when changing link props", function() {
    it("should properly update link color", function() {
      this.sandboxPO.jsonTreeExpandLinks();
      this.sandboxPO.clickJsonTreeFirstLink();

      this.sandboxPO.addJsonTreeFirstLinkProp();

      // prop name be color
      cy.get('[placeholder="Key"]')
        .clear()
        .type("color");
      // prop value be red and press ENTER
      cy.get('[placeholder="Value"]')
        .clear()
        .type("red{enter}");

      this.sandboxPO.addJsonTreeFirstLinkProp();

      // prop name be color
      cy.get('[placeholder="Key"]')
        .clear()
        .type("color");
      // prop value be red and press ENTER
      cy.get('[placeholder="Value"]')
        .clear()
        .type("blue{enter}");

      this.link12PO.shouldHaveColor("blue");

      this.sandboxPO.deleteJsonTreeLastLinkProp();

      this.link12PO.shouldHaveColor("rgb(211, 211, 211)");
    });
  });
});
