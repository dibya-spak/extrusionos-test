//Importing login testdata json file
const testData = require('../../fixtures/logintestdata.json')

describe('User Login and Logout',()=>
{
    beforeEach(function(){
        cy.visit("https://extrusion-os.r-ecosystem.de/")
        cy.wait(2000)
    })
    //Iterating with each login credential
    testData.forEach((row) => 
    {
        const data = 
        {
            username: row.username,
            password: row.password
        }
    //generate the test name per each data
    context(`generate a test for ${data.username}`, () => 
   {
      it('verify the admin, viewer & manager login',() =>
     {  
        cy.log('enter credentials')
        cy.get('#user_email').clear().type(data.username)
        cy.get('#user_password').clear().type(data.password)
        cy.log('click login button')
        cy.get('input[value="Log in"]').click()
        cy.get('div#toast-container').should('have.text',"Signed in successfully.")
        cy.log('click profile button')
        cy.get('div:nth-child(2)>ul>li:nth-child(3)').click()
        cy.get('[href="/users/sign_out"]').click()
        cy.get('div#toast-container').should('have.text',"Signed out successfully.")   
     })})})

    it('verify the error message for invalid email',() =>
     {
        cy.log('enter invalid email')
        cy.get('#user_email').clear().type('dibya@')
        cy.get('#user_password').clear().type('dibya123')
        cy.get('input[value="Log in"]').click()
        cy.get('div#toast-container').should('have.text',"Invalid E-Mail or password.")   
     }) 

    it('verify the error message for invalid password',() =>
    {
        cy.get('#user_email').clear().type('dibya@localhost')
        cy.log('enter invalid password')
        cy.get('#user_password').clear().type('dibya')
        cy.get('input[value="Log in"]').click()
        cy.get('div#toast-container').should('have.text',"Invalid E-Mail or password.")        
   })
  
})
