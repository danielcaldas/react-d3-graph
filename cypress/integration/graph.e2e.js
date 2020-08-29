const SANDBOX_URL = Cypress.env("SANDBOX_URL");

const NodePO = require("../page-objects/node.po");
const LinkPO = require("../page-objects/link.po");
const SandboxPO = require("../page-objects/sandbox.po");
let nodes = require("./../../sandbox/data/default").nodes.map(({ id }) => id);

describe("[rd3g-graph] graph tests", function() {
  before(function() {
    this.sandboxPO = new SandboxPO();
    // visit sandbox
    cy.visit(SANDBOX_URL);
    // sleep 2 seconds
    cy.wait(2000);
    // pause the graph
    this.sandboxPO.pauseGraph();
  });

  describe("when data is changed", function() {
    describe("and we change nodes props", function() {
      beforeEach(function() {
        // expand nodes
        this.sandboxPO.clickJsonTreeNodes();
        // expand 1st node
        this.sandboxPO.clickJsonTreeFirstNode();
      });

      afterEach(function() {
        this.sandboxPO.clickJsonTreeNodes();
      });

      it("nodes props modifications should be reflected in the graph", function() {
        // click (+) add prop to 1st node
        this.sandboxPO.addJsonTreeFirstNodeProp();

        // prop name be color
        cy.get('[placeholder="Key"]')
          .clear()
          .type("color");

        // prop value be red and press ENTER
        cy.get('[placeholder="Value"]')
          .clear()
          .type("red{enter}");

        const nodePO = new NodePO(nodes[0]);

        nodePO.getColor().should("eq", "red");

        // again click (+) add prop to 1st node
        this.sandboxPO.addJsonTreeFirstNodeProp();

        // edit color
        cy.get('[placeholder="Key"]')
          .clear()
          .type("color");

        // edit color to yellow and press ENTER
        cy.get('[placeholder="Value"]')
          .clear()
          .type("yellow{enter}");

        nodePO.getColor().should("eq", "yellow");

        // delete created prop
        this.sandboxPO.deleteJsonTreeFirstNodeProp();

        nodePO.getColor().should("eq", "#d3d3d3");
      });

      describe("and staticGraph is toggled on", function() {
        beforeEach(function() {
          cy.contains("staticGraph").scrollIntoView();
          this.sandboxPO.getFieldInput("staticGraph").click();
        });

        it("nodes props modifications should be reflected in the graph", function() {
          cy.get("text").should("have.length", 14);
          cy.get('path[class="link"]').should("be.visible");
          cy.get('path[class="link"]').should("have.length", 23);

          this.sandboxPO.addNode();
          this.sandboxPO.addNode();
          this.sandboxPO.addNode();
          this.sandboxPO.addNode();

          cy.get("text").should("have.length", 18);

          // should now have more than 23 links
          cy.get('path[class="link"]').should("not.have.length", 23);

          // click (+) add prop to 1st node
          this.sandboxPO.addJsonTreeFirstNodeProp();
          // prop name be color
          cy.get('[placeholder="Key"]')
            .clear()
            .type("color");
          // prop value be red and press ENTER
          cy.get('[placeholder="Value"]')
            .clear()
            .type("red{enter}");

          const nodePO = new NodePO(nodes[0]);

          nodePO.getColor().should("eq", "red");

          // delete created prop
          this.sandboxPO.deleteJsonTreeFirstNodeProp();

          nodePO.getColor().should("eq", "#d3d3d3");

          this.sandboxPO.removeNode();

          cy.get("text").should("have.length", 17);

          this.sandboxPO.removeNode();
          this.sandboxPO.removeNode();
          this.sandboxPO.removeNode();

          cy.get("text").should("have.length", 14);
          cy.get('path[class="link"]').should("be.visible");
        });
      });
    });
  });

  describe("when clicking a node", function() {
    before(function() {
      // visit sandbox
      cy.visit(`${SANDBOX_URL}?data=small`);
      // sleep 2 seconds
      cy.wait(2000);
      // pause the graph
      this.sandboxPO.pauseGraph();

      this.node1PO = new NodePO(1);
    });

    it("should trigger alert with message containing node id", async function() {
      // stub window.alert
      const stub = cy.stub();

      cy.on("window:alert", stub);

      // Click node 1
      this.node1PO
        .getPath()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith("laraalarla");
        });
    });

    describe("and graph is collapsible", function() {
      before(function() {
        ["node.renderLabel", "collapsible"].forEach(formKey => {
          cy.contains(formKey).scrollIntoView();
          this.sandboxPO.getFieldInput(formKey).click();
        });

        this.node1PO = new NodePO(1);
        this.node2PO = new NodePO(2);
        this.node3PO = new NodePO(3);
        this.node4PO = new NodePO(4);
        this.link12PO = new LinkPO(0);

        this.sandboxPO.fullScreenMode().click();
      });

      afterEach(function() {
        this.sandboxPO.exitFullScreenMode();
      });

      it("should collapse leaf nodes", function() {
        const line = this.link12PO.getLine();

        // Check the leaf node & link is present
        this.node2PO.getPath().should("be.visible");
        line.should("be.visible");

        // Click 'Node 1' in order to collapse the leafs
        this.node1PO.getPath().click();

        // Check the leaf node & link is no longer visible
        this.node2PO.getPath().should("not.be.visible");
        line.should("not.be.visible");

        // Check if other nodes and links are still visible
        this.node1PO.getPath().should("be.visible");
        this.node3PO.getPath().should("be.visible");
        this.node4PO.getPath().should("be.visible");

        const link13PO = new LinkPO(1);
        const link14PO = new LinkPO(2);
        const link34PO = new LinkPO(3);

        link13PO.getLine().should("be.visible");
        link14PO.getLine().should("be.visible");
        link34PO.getLine().should("be.visible");
      });
    });
  });
});
