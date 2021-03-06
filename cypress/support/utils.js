//restituisce un numero casuale compreso nel range
cy.getRandomNumber = (rangeMin, rangeMax) => {
  let min = Math.ceil(rangeMin);
  let max = Math.floor(rangeMax);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

cy.generateFutureDate = (plusDate, format) => {
  let tomorrow = Cypress.dayjs().add(plusDate, 'day');
  if (!format) return Cypress.dayjs(tomorrow).utc().format();
  return Cypress.dayjs(tomorrow).format(format);
};

cy.generateRandomCluster = () => {
  let randomIndexCluster = cy.getRandomNumber(1, 2);
  let randomIndexClusterVal = 'C' + randomIndexCluster;
  return randomIndexClusterVal;
};
