const sdEvent = "L'immortale"; // SD event to search
const hdEvent = 'Avatar'; // HD event to search
const idPresentLine = '4';
const idFutureLine = '50';
const indexClusterVal = 'CL_CIN'; // pick a random cluster
const startDateTime = cy.generateFutureDate(1, 'DD/MM/YYYY h:mm A'); // create tomorrow date as startDateTime
const endDateTime = cy.generateFutureDate(5, 'DD/MM/YYYY h:mm A'); // create a date five days after tomorrow date as endDateTime
const startDateEvent = cy.generatePastDate(7, 'day', 'DD/MM/YYYY h:mm A'); //'19/01/2022 6:29 PM'; // start date of the event to search

describe('Testing crud Line raccomandation', () => {
  beforeEach(() => {
    cy.useMockDataForSchedule();
    cy.useMockDataForFallback();
    cy.useMockDataForCreate();
    cy.useMockDataForUpdate();
    cy.useMockDataForDelete();

    //intercept sd search
    cy.fixture('linear-event').then((recc) => {
      recc.items[0].title = sdEvent;
      recc.items[0].resolution = 'SD';
      cy.intercept(
        'GET',
        Cypress.env().eventUrl + '?title=' + sdEvent.replace(/'/g, '%27') + '*',
        recc,
      );
    });
    //intercept hd search
    cy.fixture('linear-event').then((recc) => {
      recc.items[0].title = hdEvent;
      recc.items[0].resolution = 'HD';
      cy.intercept(
        'GET',
        Cypress.env().eventUrl + '?title=' + hdEvent + '*',
        recc,
      );
    });
    //intercept future linear
    cy.fixture('linear-recommendation').then((recc) => {
      recc[0].item[0].validFrom = cy.generateFutureDate(1);
      recc[0].item[0].validTo = cy.generateFutureDate(2);
      recc[0].item[0].id = idFutureLine; //todo togliere con
      recc[0].id = idFutureLine; //todo togliere con be
      cy.intercept(
        'GET',
        Cypress.env().recommendationUrl + '/' + idFutureLine,
        recc,
      );
    });
    //intercept present linear
    cy.fixture('linear-recommendation').then((recc) => {
      recc[0].item[0].validFrom = cy.setDay(1);
      recc[0].item[0].validTo = cy.generateFutureDate(1);
      recc[0].item[0].id = idPresentLine;
      recc[0].id = idPresentLine; //todo togliere con be
      cy.intercept(
        'GET',
        Cypress.env().recommendationUrl + '/' + idPresentLine,
        recc,
      );
    });
    cy.visit(Cypress.env().baseUrl);
  });

  /************************************CREATE******************************************************************************************************** */
  it('Check create new lin recommendation', () => {
    // click on create new lin button
    cy.contains('NEW LIN').click();
    // select user cluster
    cy.selectRandomCluster(indexClusterVal);
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
        cy.selecetNewLine(sdEvent, startDateEvent);
      });

    // select hd slot row
    cy.get('[data-testid="hd-slot-row"]')
      .find('[data-testid="AddCircleIcon"] > path')
      .each(($el, index, list) => {
        // for each slot
        // click on add button
        cy.wrap($el).click({ force: true });
        // get the opened modal
        cy.selecetNewLine(hdEvent, startDateEvent);
      });

    // invia
    cy.contains('Create').click();
    // check for notification
    cy.contains('Lin Created');
  });

  /************************************UDATE******************************************************************************************************** */
  it('Check update lin recommendation scheduled for the future', () => {
    let eventId = `eventId-${idFutureLine}`;
    // get lin rec to update;
    cy.get(`[data-testid="${eventId}"]`).click({ force: true });
    // pick a random cluster
    cy.selectRandomCluster(indexClusterVal);
    // select sd slot row
    cy.get('[data-testid="sd-slot-row"]')
      .find('[data-testid="AddCircleIcon"] > path')
      .each(($el, index, list) => {
        // for each slot
        // click on add button
        cy.wrap($el).click({ force: true });
        // search lin event title
        cy.selecetNewLine(sdEvent, startDateEvent);
      });
    // select hd slot row
    cy.get('[data-testid="hd-slot-row"]')
      .find('[data-testid="AddCircleIcon"] > path')
      .each(($el, index, list) => {
        // for each slot
        // click on add button
        cy.wrap($el).click({ force: true });
        // search lin title
        cy.selecetNewLine(hdEvent, startDateEvent);
      });
    // submit update
    cy.contains('Update').click();
    // check for notification
    cy.contains('Lin Updated');
  });

  it('Check update lin recommendation scheduled for the present', () => {
    let eventId = `eventId-${idPresentLine}`;
    // create a date five days after tomorrow date as endDateTime
    const endDateTime = cy.generateFutureDate(5, 'DD/MM/YYYY h:mm A');
    // get lin rec to update;
    cy.get(`[data-testid="${eventId}"]`).click({ force: true });
    // pick a random cluster
    // fill recommendation endDateTime
    cy.get('input[type="text"]').clear();
    cy.get('input[type="text"]').last().type(endDateTime);
    // submit update
    cy.contains('Update').click();
    // check for notification
    cy.contains('Lin Updated');
  });

  /************************************DELETE******************************************************************************************************** */
  it('Check delete lin recommendation', () => {
    let eventId = `eventId-${idFutureLine}`;
    // get lin rec to delete;
    cy.get(`[data-testid="${eventId}"]`).click({ force: true });
    // confirm deletion
    cy.contains('Delete').click();
    // check for notification
    cy.contains('Lin Deleted');
  });
});