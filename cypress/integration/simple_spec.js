const SANDBOX_URL = Cypress.env('SANDBOX_URL');

describe('Smoke tests', function () {
    it('should render graph with react-d3-graph in sandbox', function () {
        // stub window
        const windowSpy = cy.stub();

        cy.on('window:alert', windowSpy);

        // go to sandbox
        cy.visit(SANDBOX_URL);

        // add +10 random nodes to the graph
        for (let i = 0; i < 10; i++) {
            cy.contains('+').click();
        }

        // click on the "Fullscreen" button
        cy.contains('Fullscreen').click();

        // wait 3 seconds
        cy.wait(3000);

        // pause the graph
        cy.get('[data-reactroot=""] > :nth-child(1) > :nth-child(1) > :nth-child(3)').click();

        // click on some node and verify the window.alert call
        cy.get('#Drone > path').click().then(() => expect(windowSpy.getCall(0)).to.be.calledWith('Clicked node Drone'));

        // https://docs.cypress.io/guides/references/assertions.html#Value
        // should see 24 nodes
        cy.get('.node').should('have.length', 24);
    });
});