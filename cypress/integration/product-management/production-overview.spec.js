
describe.skip('Testing production overview modal',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
     
    it('verify user can open the production overview modal & verify the components',() =>
    {
        cy.log('click production overview button')
        cy.get('[title="Production overview"]').click()
        cy.log('validate the overview components')
        cy.get('#productionStatusTable').contains('Asset').should('be.visible')
        cy.get('#productionStatusTable').contains('Order').should('be.visible')
        cy.get('#productionStatusTable').contains('Product (Production specification)').should('be.visible')
        cy.get('#productionStatusTable').contains('Status').should('be.visible')
   })
  
   

    afterEach(function(){
        cy.logOut()
    })
})
