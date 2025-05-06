
describe('Fact‑viewer source switching', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en',
        { id: '1', text: 'Useless stub fact', source: 'uselessfacts' }
      ).as('getUseless');
  
      cy.visit('/');
    });
  
    it('shows the stubbed useless fact', () => {
      cy.wait('@getUseless');
      cy.contains('Useless stub fact').should('be.visible');
    });
  
    it('switches to History Facts source', () => {
      cy.intercept(
        'GET',
        '/nothing-to-intercept'
      ).as('getHistory');
  
      cy.get('select#sourceSelect').should('exist').select('history');
  
      cy.contains('Apollo 11 landed on the Moon in 1969.').should('be.visible');
    });
  });