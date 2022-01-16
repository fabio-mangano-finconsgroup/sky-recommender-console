describe('Testing lin recommendation', () => {
  it('Check create new lin recommendation', () => {
    // visit the schedule page
    cy.visit('http://localhost:3000/schedule');
    // pick a random cluster
    let randomIndexClusterVal = cy.generateRandomCluster();
    // create tomorrow date as startDateTime
    let startDateTime = cy.generateFutureDate(1, 'DD/MM/YYYY h:mm A');
    // create a date five days after tomorrow date as endDateTime
    let endDateTime = cy.generateFutureDate(5, 'DD/MM/YYYY h:mm A');

    // intercept create new lin request to make assertions
    cy.intercept({ method: 'POST', path: '/recommendations' }).as('createLin');

    // click on create new lin button
    cy.contains('NEW LIN').click();
    // select user cluster
    cy.selectRandomCluster(randomIndexClusterVal);
    // fill recommendation startDateTime
    cy.get('input[type="text"]').first().type(startDateTime);
    // fill recommendation endDateTime
    cy.get('input[type="text"]').last().type(endDateTime);
    // select sd slot row
    cy.get('[data-testid="sd-slot-row"]')
      .find('[data-testid="AddCircleIcon"] > path')
      .each(($el, index, list) => {
        // for each slot
        // click on add button
        cy.wrap($el).click({ force: true });
        // get the opened modal
        cy.get('[data-test="search-lin-modal"]').within(() => {
          // search lin event title
          cy.get('input[type="text"]').first().type("L'immortale");
          // insert startDate
          cy.get('input[type="text"]').last().type('19/01/2022 6:29 PM');
          // click on search button
          cy.contains('Search').click();
          // it should be at least one result
          cy.get('.MuiDataGrid-row').its('length').should('be.gt', 0);
          // click on first row
          cy.get('.MuiDataGrid-row').first().click();
          // click on submit
          cy.contains('Select').click();
        });
      });

    // select hd slot row
    cy.get('[data-testid="hd-slot-row"]')
      .find('[data-testid="AddCircleIcon"] > path')
      .each(($el, index, list) => {
        // for each slot
        // click on add button
        cy.wrap($el).click({ force: true });
        // get the opened modal
        cy.get('[data-test="search-lin-modal"]').within(() => {
          // search lin title
          cy.get('input[type="text"]').first().type('Avatar');
          // insert startDate
          cy.get('input[type="text"]').last().type('19/01/2022 6:29 PM');
          // click on search button
          cy.contains('Search').click();
          // it should be at least one result
          cy.get('.MuiDataGrid-row').its('length').should('be.gt', 0);
          // click on first row
          cy.get('.MuiDataGrid-row').first().click();
          // click on submit button
          cy.contains('Select').click();
        });
      });

    // invia
    cy.contains('Create').click();

    cy.wait('@createLin').should(({ req, response }) => {
      expect(response.statusCode).to.equal(201);
      // check that notification appears
      cy.contains('Lin Created');
      // delete created lin
      cy.request(
        'DELETE',
        `http://localhost:3001/recommendations/${response.body.id}`,
      );
    });
  });
});
