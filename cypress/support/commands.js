// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, password) => {
    cy.get('button').contains("Log in").click()
    cy.get('#mail').type(`${email}`)
    cy.get('#pass').type(`${password}`)
    cy.get('button').contains("Submit").click()
})

Cypress.Commands.add('addToFav', (num) => {
    cy // добавляем книгу в Избранное
    .get('div[class="d-flex flex-wrap card-deck"]')
    .children().eq(num).contains("Add to favorite")
    .click().wait (1500)
})

Cypress.Commands.add('addTestBooks', (pathToTestbooks, testbooks) => {
    testbooks.forEach(book => {
        cy.get('button').contains("Add new").click()
        cy.get('#title').type(`${book.title}`)
        cy.get('#description').type(`${book.description}`)
        cy.get('#fileCover').selectFile(pathToTestbooks + book.fileCover)
        cy.get('#fileBook').selectFile(pathToTestbooks + book.fileBook)
        cy.get('#authors').type(`${book.authors}`)
        cy.get('button').contains("Submit").click()

    });
})