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
    // wait for the initial useless‐facts call
    cy.wait('@getUseless');

    // freeze all timers
    cy.clock();

    cy.window().then((win) => {
      cy.stub(win.Math, 'random').returns(0);
    });

    cy.get('select#sourceSelect').should('exist').select('history');

    cy.contains('button', 'New Fact').click();

    cy.tick(300);

    cy.contains("landed on the Moon in 1969").should('be.visible');
  });
});