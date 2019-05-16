describe('v-suggest plugin end-to-end test', () => {
    /**
     * prepare operation
     * visit login page, do login and visit test page
     */
    before(() => {
        cy.visit('/#/login');
        cy.get('#btnLogin').click();
        cy.wait(1000);
        cy.visit('/#/demo/suggest');
        cy.wait(500);
    });
    beforeEach(()=>{
        cy.get('.v-suggest:first').find('input').as('input-el');
    });


    /**
     * test case
     */
    it('The first v-suggest have content "ch"', () => {
        cy.wait(1000);
        cy.get('@input-el').focus().should('have.value', 'ch');
    });
    it('Select first suggest item by mouse click', ()=>{
        cy.get('div.v-dropdown-container').should('be.visible').find('li:first').as('first-item');
        cy.get('@first-item').trigger('mouseenter');
        cy.wait(500);
        cy.get('@first-item').trigger('click');
        cy.get('@input-el').should('have.value', 'Chicago Bulls');
    });
    it('Clear input content, then the drop down layer should be hidden', ()=>{
        cy.get('@input-el').clear();
        cy.get('div.v-dropdown-container').not('[style*="display: none;"]').should('have.length', 0);
    });
    it('Enter keyword "b", suggestion list show up, select first item and click "X" icon to clear; The input should be empty and the drop down layer should be hidden', ()=>{
        cy.get('@input-el').focus().type('b');
        cy.get('div.v-dropdown-container').should('be.visible').find('li:first').as('first-item');
        cy.get('@first-item').trigger('mouseenter');
        cy.wait(500);
        cy.get('@first-item').trigger('click');
        cy.get('.v-suggest:first').find('div.sg-clear').click();
        cy.get('@input-el').should('have.value', '');
        cy.get('div.v-dropdown-container').not('[style*="display: none;"]').should('have.length', 0);
    });
    it('Enter keyword "b", types the down arrow key and types the Enter key to select first item(Chicago Bulls)', ()=>{
        cy.get('@input-el').focus().type('b');
        cy.wait(200);
        cy.get('@input-el').type('{downarrow}');
        cy.wait(200);
        cy.get('@input-el').type('{enter}').should('have.value', 'Chicago Bulls');
    });
    it('Enter keyword "b", types the up arrow key and types the Enter key to select last item(Portland Trail Blazers)', ()=>{
        cy.get('@input-el').focus().clear().type('b');
        cy.wait(200);
        cy.get('@input-el').type('{uparrow}');
        cy.wait(200);
        cy.get('@input-el').type('{enter}').should('have.value', 'Portland Trail Blazers');
    });
});