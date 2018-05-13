/*global cy*/
const SANDBOX_URL = Cypress.env('SANDBOX_URL');

const LinkPO = require('../page-objects/link.po');
const NodePO = require('../page-objects/node.po');
const SandboxPO = require('../page-objects/sandbox.po');
let nodes = require('./../../sandbox/data/small/small.data').nodes.map(({ id }) => id);

describe('[rd3g-graph] link tests', function() {
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

    describe('when highlightDegree is 0', function() {
        beforeEach(function() {
            // set highlightDegree to 0
            cy.contains('highlightDegree').scrollIntoView();
            this.sandboxPO
                .getFieldInput('highlightDegree')
                .clear()
                .type('0');
        });

        it('(0) graph should react properly to mouse over events on nodes and links', function() {
            // mouse over 'Node 3'
            // highlight node 3 only
            this.node3PO.getPath().trigger('mouseover');

            this.node1PO.getColor().should('eq', '#d3d3d3');
            this.node1PO.getOpacity().should('eq', '0.2');

            this.node2PO.getColor().should('eq', '#d3d3d3');
            this.node2PO.getOpacity().should('eq', '0.2');

            this.node3PO.getColor().should('eq', 'red');
            this.node3PO.getFontWeight().should('eq', 'bold');

            this.node4PO.getColor().should('eq', '#d3d3d3');
            this.node4PO.getOpacity().should('eq', '0.2');

            this.link12PO.shouldHaveColor('rgb(211, 211, 211)');
            this.link12PO.shouldHaveOpacity(0.2);

            this.link13PO.shouldHaveColor('rgb(211, 211, 211)');
            this.link13PO.shouldHaveOpacity(0.2);

            this.link14PO.shouldHaveColor('rgb(211, 211, 211)');
            this.link14PO.shouldHaveOpacity(0.2);

            this.link34PO.shouldHaveColor('rgb(211, 211, 211)');
            this.link34PO.shouldHaveOpacity(0.2);
        });
    });

    describe('when highlightDegree is 1', function() {
        beforeEach(function() {
            // set highlightDegree to 1
            cy.contains('highlightDegree').scrollIntoView();
            this.sandboxPO
                .getFieldInput('highlightDegree')
                .clear()
                .type('1');
        });

        it('(1) graph should react properly to mouse over events on nodes and links', function() {
            // mouse over 'Node 3'
            // highlight nodes 1, 3 and 4 and respective links
            // not highlight node 2 and other connections
            this.node3PO.getPath().trigger('mouseover');

            this.node1PO.getColor().should('eq', 'red');
            this.node1PO.getFontWeight().should('eq', 'bold');

            this.node2PO.getColor().should('eq', '#d3d3d3');
            this.node2PO.getOpacity().should('eq', '0.2');

            this.node3PO.getColor().should('eq', 'red');
            this.node3PO.getFontWeight().should('eq', 'bold');

            this.node4PO.getColor().should('eq', 'red');
            this.node4PO.getFontWeight().should('eq', 'bold');

            this.link12PO.shouldHaveColor('rgb(211, 211, 211)');
            this.link12PO.shouldHaveOpacity(0.2);

            this.link13PO.shouldHaveColor('blue');

            this.link14PO.shouldHaveColor('rgb(211, 211, 211)');
            this.link14PO.shouldHaveOpacity(0.2);

            this.link34PO.shouldHaveColor('blue');
        });
    });

    describe('when highlightDegree is 2', function() {
        beforeEach(function() {
            // set highlightDegree to 2
            cy.contains('highlightDegree').scrollIntoView();
            this.sandboxPO
                .getFieldInput('highlightDegree')
                .clear()
                .type('2');
        });

        it('(2) graph should react properly to mouse over events on nodes and links', function() {
            // mouse over 'Node 3'
            // highlight nodes 1, 3 and 4 and respective links
            // should also highlight 2nd degree connection between 1 and 4
            // not highlight node 2 and other connections
            this.node3PO.getPath().trigger('mouseover');

            this.node1PO.getColor().should('eq', 'red');
            this.node1PO.getFontWeight().should('eq', 'bold');

            this.node2PO.getColor().should('eq', '#d3d3d3');
            this.node2PO.getOpacity().should('eq', '0.2');

            this.node3PO.getColor().should('eq', 'red');
            this.node3PO.getFontWeight().should('eq', 'bold');

            this.node4PO.getColor().should('eq', 'red');
            this.node4PO.getFontWeight().should('eq', 'bold');

            this.link12PO.shouldHaveColor('rgb(211, 211, 211)');
            this.link12PO.shouldHaveOpacity(0.2);

            this.link13PO.shouldHaveColor('blue');

            this.link14PO.shouldHaveColor('blue');

            this.link34PO.shouldHaveColor('blue');
        });
    });
});
