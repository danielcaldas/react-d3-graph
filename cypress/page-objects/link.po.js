/*global cy*/

/**
 * Page Object for interacting with Link component.
 * @param {number} index - the index of the link.
 * @returns {undefined}
 */
function LinkPO(index) {
    this.index = index;

    this.getLine = () => cy.get('line').then(lines => lines[this.index]);
    this.getStyle = () => this.getLine().invoke('attr', 'style');
    this.shouldHaveColor = color => this.getStyle().should('contain', `stroke: ${color};`);
    this.shouldHaveOpacity = opacity => this.getStyle().should('contain', `opacity: ${opacity};`);
}

module.exports = LinkPO;
