describe('Random Facts Dashboard – Favorites flows', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('generates a random fact and adds it to Recent Picks', () => {
      cy.intercept('GET', 'https://uselessfacts.jsph.pl/random.json?language=en', {
        statusCode: 200,
        body: { id: '1', text: 'Cypress E2E fact' },
      }).as('getFact');
  
      cy.contains('New Fact').click();
      cy.wait('@getFact');
  
      cy.contains('Add to Favorites').click();
  
      cy.contains('Latest Picks').should('be.visible');
      cy.get('section').contains('Cypress E2E fact');
    });
  
    it('navigates to Favorites, searches, selects and deletes', () => {
      cy.window().then(win => {
        win.localStorage.setItem('favorites', JSON.stringify([{ id: '1', text: 'Cypress E2E fact' }]));
      });
  
      cy.visit('/favorites');
  
      cy.get('input[placeholder="Search favorites..."]').type('Cypress');
      cy.contains('Cypress E2E fact').should('be.visible');
  
      cy.contains('Select').click();
  
      cy.get('input[type="checkbox"]').first().check({ force: true });
  
      cy.contains('Delete (1)').click();
  
      cy.contains('No favorites found.').should('be.visible');
    });
  });