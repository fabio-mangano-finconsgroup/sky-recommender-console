Cypress.Commands.add('testSearchVodModal', (event) => {
  //dovrebbe esserci un modal apert
  cy.get('[data-test="search-vod-modal"]').should('have.length', 1);

  cy.get('[data-test="search-vod-modal"]').within(() => {
    //dovrebbe esserci scritto "no rows", il che vuol dire che non sono partite cose strane
    cy.contains('No rows');
    cy.get('input[type="text"]').type(event);
    //clicco sul search
    cy.contains('button', 'Search').click();
    //dovrebbe aver trovato almeno 1 riga
    cy.get('No rows').should('not.exist');
    //clicco la prima riga
    cy.get(`[aria-label="Select Row checkbox"]`).first().click();
    //submit
    cy.contains('Select').click();
    //controllo che abbia chiuso
    cy.get('[data-test="search-vod-modal"]').should('have.length', 0);
  });
});

Cypress.Commands.add('login', () => {
  let user = 'test';
  let pwd = 'test';
  // search lin event title
  cy.get('input[type="text"]').type(user);
  // insert startDate
  cy.get('input[type="password"]').type(pwd);
  //submit
  cy.contains('Login').click();
});

Cypress.Commands.add('selecetNewLine', (event, startDateEvent) => {
  // get the opened modal
  cy.get('[data-test="search-lin-modal"]').within(() => {
    // search lin event title
    cy.get('input[type="text"]').first().type(event);
    // insert startDate
    cy.get('input[type="text"]').last().clear();
    cy.get('input[type="text"]').last().type(startDateEvent);
    // click on search button
    cy.contains('button', 'Search').click();
    // it should be at least one result
    cy.get('No rows').should('not.exist');
    // click on first row
    cy.get(`[aria-label="Select Row checkbox"]`).first().click();
    // click on submit
    cy.contains('Select').click();
  });
});

Cypress.Commands.add('testSearchLinModal', () => {
  //dovrebbe esserci un modal apert
  cy.get('[data-test="search-lin-modal"]').should('have.length', 1);
});

Cypress.Commands.add('selectRandomCluster', (randomIndexClusterVal) => {
  //click on cluster select
  cy.get('[data-test="select-cluster"]').click();
  //click on cluster select
  cy.get('[data-value="' + randomIndexClusterVal + '"]').click();
});
