
describe('Testing threshold violations tab',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can filter the threshold violations overview',() =>
     {       
        cy.log('navigate threshold tab')
        cy.contains('Production Summary').click()
        cy.get('[href="/threshold_violations"]').click()
        cy.log('filter all the requir fields')
        cy.get('#threshold_violation_asset').select('Reicofil')
        cy.get('#range').click()
        cy.contains('Last 7 Days').click()
        cy.get('#threshold_violation_production_specification').select('recipe1')
        cy.get('#threshold_violation_production_status').select('Setup & Production')
        cy.log('click apply')
        cy.get('#violation_submit').click()
        cy.get('.callout-danger').should('contain','There are no records for your selection.')
    }) 

  
   
    
//     afterEach(function(){
//         cy.logOut()
//     })

})
