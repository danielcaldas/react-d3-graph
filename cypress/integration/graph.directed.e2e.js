const SANDBOX_URL = Cypress.env("SANDBOX_URL");

const LinkPO = require("../page-objects/link.po");
const NodePO = require("../page-objects/node.po");
const SandboxPO = require("../page-objects/sandbox.po");

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

        it("should properly display elements for directed graph", function() {
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

        it("should behave correctly when directed is disabled after collapsed node", function() {
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

            // Disable "directed"
            cy.contains("directed").scrollIntoView();
            this.sandboxPO.getFieldInput("directed").click();

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

            // Disable "collapsible"
            cy.contains("collapsible").scrollIntoView();
            this.sandboxPO.getFieldInput("collapsible").click();

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
});
