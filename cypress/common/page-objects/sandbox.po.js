/**
 * Page Object for interacting with sandbox interface.
 * @returns {undefined}
 */
function SandboxPO () {
    // whitelist checkbox inputs
    this.checkboxes = [ 'node.renderLabel' ];
    
    // actions
    this.playGraph = () => cy.get('.container__graph > :nth-child(1) > :nth-child(2)').click();
    this.pauseGraph = () => cy.get('.container__graph > :nth-child(1) > :nth-child(3)').click();

    // element getters
    this.getFieldInput = (field) => this.checkboxes.includes(field)
        ? cy.contains(field).children('input')
        : cy.contains(field).siblings('.form-control');
}

module.exports = SandboxPO;