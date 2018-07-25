/*global cy*/
const SANDBOX_URL = Cypress.env('SANDBOX_URL');

const NodePO = require('../page-objects/node.po');
const LinkPO = require('../page-objects/link.po');
const SandboxPO = require('../page-objects/sandbox.po');
let nodes = require('./../../sandbox/data/default').nodes.map(({ id }) => id);

describe('[rd3g-graph] graph tests', function() {
    before(function() {
        this.sandboxPO = new SandboxPO();
        // visit sandbox
        cy.visit(SANDBOX_URL);
        // sleep 2 seconds
        cy.wait(2000);
        // pause the graph
        this.sandboxPO.pauseGraph();
    });

    describe('when data is changed', function() {
        describe('and we change nodes props', function() {
            beforeEach(function() {
                // expand nodes
                this.sandboxPO.clickJsonTreeNodes();
                // expand 1st node
                this.sandboxPO.clickJsonTreeFirstNode();
            });

            afterEach(function() {
                this.sandboxPO.clickJsonTreeNodes();
            });

            it('nodes props modifications should be reflected in the graph', function() {
                // click (+) add prop to 1st node
                this.sandboxPO.addJsonTreeFirstNodeProp();

                // prop name be color
                cy
                    .get('[placeholder="Key"]')
                    .clear()
                    .type('color');

                // prop value be red and press ENTER
                cy
                    .get('[placeholder="Value"]')
                    .clear()
                    .type('red{enter}');

                const nodePO = new NodePO(nodes[0]);

                nodePO.getColor().should('eq', 'red');

                // delete created prop
                this.sandboxPO.deleteJsonTreeFirstNodeProp();

                nodePO.getColor().should('eq', '#d3d3d3');
            });

            describe('and staticGraph is toggled on', function() {
                beforeEach(function() {
                    cy.contains('staticGraph').scrollIntoView();
                    this.sandboxPO.getFieldInput('staticGraph').click();
                });

                it('nodes props modifications should be reflected in the graph', function() {
                    cy.get('text').should('have.length', 14);
                    cy.get('path[class="link"]').should('be.visible');

                    this.sandboxPO.addNode();
                    this.sandboxPO.addNode();
                    this.sandboxPO.addNode();
                    this.sandboxPO.addNode();

                    cy.get('text').should('have.length', 18);

                    // click (+) add prop to 1st node
                    this.sandboxPO.addJsonTreeFirstNodeProp();
                    // prop name be color
                    cy
                        .get('[placeholder="Key"]')
                        .clear()
                        .type('color');
                    // prop value be red and press ENTER
                    cy
                        .get('[placeholder="Value"]')
                        .clear()
                        .type('red{enter}');

                    const nodePO = new NodePO(nodes[0]);

                    nodePO.getColor().should('eq', 'red');

                    // delete created prop
                    this.sandboxPO.deleteJsonTreeFirstNodeProp();

                    nodePO.getColor().should('eq', '#d3d3d3');

                    this.sandboxPO.removeNode();

                    cy.get('text').should('have.length', 17);

                    this.sandboxPO.removeNode();
                    this.sandboxPO.removeNode();
                    this.sandboxPO.removeNode();

                    cy.get('text').should('have.length', 14);
                    cy.get('path[class="link"]').should('be.visible');
                });
            });
        });
    });
});

describe('when clicking a node', function() {
    before(function() {
        this.sandboxPO = new SandboxPO();
        // visit sandbox
        cy.visit(`${SANDBOX_URL}?data=small`);
        // sleep 2 seconds
        cy.wait(2000);
        // pause the graph
        this.sandboxPO.pauseGraph();

        cy.contains('collapsible').scrollIntoView();
        this.sandboxPO.getFieldInput('collapsible').click();

        this.node1PO = new NodePO(1);
        this.node2PO = new NodePO(2);
        this.link12PO = new LinkPO(0);
    });

    it('should collapse leaf nodes', function() {
        const line = this.link12PO.getLine();

        // Check the leaf node & link is present
        this.node2PO.getPath().should('be.visible');
        line.should('be.visible');

        // Click 'Node 1' in order to collapse the leafs
        this.node1PO.getPath().click();

        // Check the leaf node & link is no longer visible
        this.node2PO.getPath().should('not.be.visible');
        line.should('not.be.visible');
    });
});
