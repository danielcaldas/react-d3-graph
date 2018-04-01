/*global cy*/
const SANDBOX_URL = Cypress.env('SANDBOX_URL');

const NodePO = require('../page-objects/node.po');
const SandboxPO = require('../page-objects/sandbox.po');
let nodes = require('./../../sandbox/data').nodes.map(({ id }) => id);

describe('[rd3g-node] node tests', function() {
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

    describe('when setting specific node color', function() {
        beforeEach(function() {
            // scroll down to node.color config
            cy.contains('node.color').scrollIntoView();
            // input text 'green'
            this.sandboxPO
                .getFieldInput('node.color')
                .clear()
                .type('green');
        });

        it('all nodes should have the selected color', function() {
            nodes.forEach(function(n) {
                const nodePO = new NodePO(n);

                // below alternative using async/await
                // expect(await nodePO.getColor()).to.eq('green');
                nodePO.getColor().should('eq', 'green');
            });
        });
    });

    describe('when setting specific node label fontSize', function() {
        beforeEach(function() {
            // scroll down to node.fontSize config
            cy.contains('node.fontSize').scrollIntoView();
            // input text '14'
            this.sandboxPO
                .getFieldInput('node.fontSize')
                .clear()
                .type('14');
        });

        it('all nodes labels should have the selected fontSize', function() {
            nodes.forEach(function(n) {
                const nodePO = new NodePO(n);

                nodePO.getFontSize().should('eq', '14');
            });
        });
    });

    describe('when toggling off render label', function() {
        beforeEach(function() {
            // scroll down to node.renderLabel config & click
            cy.contains('node.renderLabel').scrollIntoView();
            this.sandboxPO.getFieldInput('node.renderLabel').click();
        });

        it('all node labels should disappear', function() {
            nodes.forEach(n => {
                const nodePO = new NodePO(n);

                nodePO.getLabel().should('not.be.visible');
            });
        });
    });
});
