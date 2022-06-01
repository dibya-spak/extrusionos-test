
describe('Testing custom dashboard modal(create/edit/delete dashboards)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add a dashboard',() =>
     {
        cy.log('navigate dashboards tab')
        cy.contains('Trend Analyzer').click()
        cy.contains('Trend builder').click()
        cy.log('adding a dashboard')
        cy.get('[href="/dashboards/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#dashboard_name').clear().type('Automate dashboard')
        cy.get('#dashboard_description').clear().type('no description')
        cy.log('configure properties')
        cy.get('#select-equipment-properties').click()
        cy.contains('Belt machine').click()
        cy.contains('Line speed').click()
        cy.get('#updateEquipmentFromSelectionButton').click()
        cy.log('save dashboard')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Dashboard was successfully created.")
    }) 
 
    it('verify the user can delete a material',() =>
     {
        cy.visit('/dashboards')
        cy.log('click dashboard delete button')
        cy.get('[data-title="Delete Dashboard Automate dashboard"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Dashboard was successfully destroyed.")

    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
