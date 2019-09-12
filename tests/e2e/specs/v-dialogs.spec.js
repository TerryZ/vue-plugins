describe('v-dialogs plugin end-to-end test', () => {
  /**
   * prepare operation
   * visit login page, do login and visit test page
   */
  before(() => {
    cy.visit('/#/login');
    cy.get('#btnLogin').click();
    cy.wait(1000);
    cy.visit('/#/demo/dialog');
    cy.wait(500);
  });

  /**
   * test case
   */
  describe('Modal dialog', () => {
    it('Open a modal dialog', ()=>{
      cy.get('#btn-modal').click();
      cy.wait(500);
      cy.get('.v-dialog-modal').should('be.exist');
    });
    it('Maximize modal dialog', ()=>{
      cy.get('.v-dialog-btn__maximize').click();
      cy.wait(500);
      cy.get('.v-dialog-modal').should('have.class', 'v-dialog--maximize');
    });
    it('Restore maximized modal dialog', ()=>{
      cy.get('.v-dialog-btn__maximize').click();
      cy.wait(500);
      cy.get('.v-dialog-modal').should('have.not.class', 'v-dialog--maximize');
    });
    it('Close modal dialog and using Alert dialog to show received data(张三)', ()=>{
      cy.get('#btn-modal-close').click();
      cy.wait(1000);
      cy.get('.v-dialog-modal').should('be.not.exist');
      cy.get('.v-dialog-alert').should('be.exist');
      cy.get('.v-dialog-alert__content').contains('Received user name: 张三');
      cy.get('.v-dialog-btn__ok').click();
      cy.wait(200);
    });
  });

  describe('Alert dialog', () => {
    it('Open a information type alert dialog', ()=>{
      cy.get('#btn-alert-info').click();
      cy.wait(500);
      cy.get('.v-dialog-alert').should('be.exist');
      cy.get('.v-dialog-alert').should('have.class', 'alertInfo');
      cy.get('.v-dialog-btn__ok').click();
      cy.wait(200);
    });
    it('Open a warning type alert dialog', ()=>{
      cy.get('#btn-alert-warning').click();
      cy.wait(500);
      cy.get('.v-dialog-alert').should('be.exist');
      cy.get('.v-dialog__shadow--warning').should('be.exist');
      cy.get('.v-dialog-alert').should('have.class', 'alertWarning');
      cy.get('.v-dialog-btn__ok').click();
      cy.wait(200);
    });
    it('Open a error type alert dialog', ()=>{
      cy.get('#btn-alert-error').click();
      cy.wait(500);
      cy.get('.v-dialog-alert').should('be.exist');
      cy.get('.v-dialog__shadow--error').should('be.exist');
      cy.get('.v-dialog-alert').should('have.class', 'alertError');
      cy.get('.v-dialog-btn__ok').click();
      cy.wait(200);
    });
    it('Open a success type alert dialog', ()=>{
      cy.get('#btn-alert-success').click();
      cy.wait(500);
      cy.get('.v-dialog-alert').should('be.exist');
      cy.get('.v-dialog__shadow--success').should('be.exist');
      cy.get('.v-dialog-alert').should('have.class', 'alertSuccess');
      cy.get('.v-dialog-btn__ok').click();
      cy.wait(200);
    });
    it('Open a confirm type alert dialog', ()=>{
      cy.get('#btn-alert-confirm').click();
      cy.wait(500);
      cy.get('.v-dialog-alert').should('be.exist');
      cy.get('.v-dialog-alert').should('have.class', 'alertConfirm');
      cy.get('.v-dialog-btn__cancel').should('be.exist');
      cy.get('.v-dialog-btn__cancel').click();
      cy.wait(500);
      cy.get('.v-dialog-alert__content').contains('You canceled the confirm Alert');
      cy.get('.v-dialog-btn__ok').click();
      cy.wait(200);
    });
  });

  describe('Mask dialog', () => {
    it('Open a mask dialog', ()=>{
      cy.get('#btn-mask').click();
      cy.wait(500);
      cy.get('.v-dialog-mask__container').should('be.exist');
      cy.get('.v-dialog-mask__content').contains('Loading……');
      cy.wait(3000);
    });
  });

    describe('Toast dialog', () => {
        it('Open a information toast dialog and auto close in 3 second', ()=>{
            cy.get('#btn-toast-info').click();
            cy.wait(500);
            cy.get('.v-dialog-toast__container').should('be.exist');
            cy.wait(3000);
            cy.get('.v-dialog-toast__container').should('be.not.exist');
        });
        it('Open a warning toast dialog', ()=>{
            cy.get('#btn-toast-warning').click();
            cy.wait(500);
            cy.get('.v-dialog-toast__container').should('be.exist');
            cy.get('.v-dialog-toast__container').should('have.class', 'toast-warning');
            cy.wait(500);
            cy.get('.v-dialog-toast__close').click();
            cy.wait(300);
            cy.get('.v-dialog-toast__container').should('be.not.exist');
        });
        it('Open a error toast dialog', ()=>{
            cy.get('#btn-toast-error').click();
            cy.wait(500);
            cy.get('.v-dialog-toast__container').should('be.exist');
            cy.get('.v-dialog-toast__container').should('have.class', 'toast-error');
            cy.wait(500);
            cy.get('.v-dialog-toast__close').click();
            cy.wait(300);
            cy.get('.v-dialog-toast__container').should('be.not.exist');
        });
        it('Open a success toast dialog', ()=>{
            cy.get('#btn-toast-success').click();
            cy.wait(500);
            cy.get('.v-dialog-toast__container').should('be.exist');
            cy.get('.v-dialog-toast__container').should('have.class', 'toast-success');
            cy.wait(500);
            cy.get('.v-dialog-toast__close').click();
            cy.wait(300);
            cy.get('.v-dialog-toast__container').should('be.not.exist');
        });
    });
});
