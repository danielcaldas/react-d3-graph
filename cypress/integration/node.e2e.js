const SANDBOX_URL = Cypress.env("SANDBOX_URL");

const NodePO = require("../page-objects/node.po");
const SandboxPO = require("../page-objects/sandbox.po");
const defaultNodes = require("./../../sandbox/data/default").nodes;
let nodes = require("./../../sandbox/data/default").nodes.map(({ id }) => id);

describe("[rd3g-node]", function() {
  before(function() {
    this.sandboxPO = new SandboxPO();
    // visit sandbox
    cy.visit(SANDBOX_URL);
    // sleep 2 seconds
    cy.wait(2000);
    // pause the graph
    this.sandboxPO.pauseGraph();

    // @TODO: Could add this to a global scope
    // NOTE: https://github.com/cypress-io/cypress/issues/300
    // cy.window().then((win) => {
    //     cy.spy(win.console, 'log')
    // });
  });

  describe("when node.labelProperty is different than default property", function() {
    beforeEach(function() {
      // scroll down to node.labelProperty config
      cy.contains("node.labelProperty").scrollIntoView();
      // input text 'green'
      this.sandboxPO
        .getFieldInput("node.labelProperty")
        .clear()
        .type("symbolType");
    });

    it("should properly render node labels", function() {
      defaultNodes.forEach(function({ id, symbolType }) {
        const nodePO = new NodePO(id);
        const label = symbolType || id;

        nodePO
          .getLabel()
          .invoke("text")
          .should("eq", label);
      });
    });
  });

  describe("when setting specific node color", function() {
    beforeEach(function() {
      // scroll down to node.color config
      cy.contains("node.color").scrollIntoView();
      // input text 'green'
      this.sandboxPO
        .getFieldInput("node.color")
        .clear()
        .type("green");
    });

    it("all nodes should have the selected color", function() {
      nodes.forEach(function(n) {
        const nodePO = new NodePO(n);

        // below alternative using async/await
        // expect(await nodePO.getColor()).to.eq('green');
        nodePO.getColor().should("eq", "green");
      });
    });
  });

  describe("when setting specific node label fontSize", function() {
    beforeEach(function() {
      // scroll down to node.fontSize config
      cy.contains("node.fontSize").scrollIntoView();
      // input text '14'
      this.sandboxPO
        .getFieldInput("node.fontSize")
        .clear()
        .type("14");
    });

    it("all nodes labels should have the selected fontSize", function() {
      nodes.forEach(function(n) {
        const nodePO = new NodePO(n);

        nodePO.getFontSize().should("eq", "14");
      });
    });
  });

  describe("when toggling off render label", function() {
    beforeEach(function() {
      // scroll down to node.renderLabel config & click
      cy.contains("node.renderLabel").scrollIntoView();
      this.sandboxPO.getFieldInput("node.renderLabel").click();
    });

    it("all node labels should disappear", function() {
      nodes.forEach(n => {
        const nodePO = new NodePO(n);

        nodePO.getLabel().should("not.be.visible");
      });
    });
  });

  describe("when rendering custom svg as node", function() {
    describe("and svg is provided to specific node at node level", function() {
      beforeEach(function() {
        // expand nodes
        this.sandboxPO.clickJsonTreeNodes();
        // expand 1st node
        this.sandboxPO.clickJsonTreeFirstNode();
        // click (+) add prop to 1st node
        this.sandboxPO.addJsonTreeFirstNodeProp();

        // prop name be svg
        cy.get('[placeholder="Key"]')
          .clear()
          .type("svg");

        // prop value be './sample.svg' and press ENTER
        cy.get('[placeholder="Value"]')
          .clear()
          .type("./sample.svg{enter}");
      });

      afterEach(function() {
        this.sandboxPO.deleteJsonTreeFirstNodeProp();
        this.sandboxPO.clickJsonTreeNodes();
      });

      it("target node should be rendered with provided svg", function() {
        const nodePO = new NodePO(nodes[0]);

        nodePO.getImageHref().should("eq", "./sample.svg");
        nodePO.getImageWidth().should("eq", "20");
        nodePO.getImageHeight().should("eq", "20");
      });
    });
  });
});
