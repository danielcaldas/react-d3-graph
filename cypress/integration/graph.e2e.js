/*global cy*/
const SANDBOX_URL = Cypress.env('SANDBOX_URL');

const NodePO = require('../page-objects/node.po');
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
                    cy.get('line').should('be.visible');

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
                    cy.get('line').should('be.visible');
                });
            });
        });
    });
});
