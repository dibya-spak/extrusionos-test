import 'cypress-file-upload'
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('adminLogIn',() =>{
    cy.visit("/",{timeout:60000})
    cy.get('#user_email').clear().type('dibya@localhost')
    cy.get('#user_password').clear().type('dibya123')
    cy.get('input[value="Log in"]').click()
})
Cypress.Commands.add('managerLogIn',() =>{
    cy.visit("/",{timeout:60000})
    cy.get('#user_email').clear().type('man@localhost')
    cy.get('#user_password').clear().type('man123')
    cy.get('input[value="Log in"]').click()
})
Cypress.Commands.add('viewerLogIn',() =>{
    cy.visit("/",{timeout:60000})
    cy.get('#user_email').clear().type('view@localhost')
    cy.get('#user_password').clear().type('view123')
    cy.get('input[value="Log in"]').click()
})

Cypress.Commands.add('logOut',() =>{
    cy.get('div:nth-child(2)>ul>li:nth-child(3)').click()
    cy.get('[href="/users/sign_out"]').click({force:true})
})
