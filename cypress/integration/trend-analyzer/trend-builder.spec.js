
describe('Testing custom dashboard modal(create/edit/delete dashboards)',{"scrollBehavior": false},()=>
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
        cy.log('click add button')
        cy.get('[href="/dashboards/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#dashboard_name').clear().type('Automate dashboard')
        cy.get('#dashboard_description').clear().type('no description')
        cy.log('click configure properties')
        cy.get('#select-equipment-properties').click()
        cy.get('[for="equipment_2"]').click()
        cy.contains('Belt Tension').click()
        cy.log('save configure')
        cy.get('#selector-modal-select-properties-button').click()
        cy.log('save dashboard')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Dashboard was successfully created.")
    })
    it('verify the user can view the dashboard',() =>
    {
       cy.visit('/dashboards')
       cy.log('click a dashboard')
       cy.get('[class="card-title-text"]').contains('Automate dashboard').click()
       cy.url().should('contain', 'show_embedded')    

   }) 

    it('verify the user can edit a dashboard',() =>
     {
        cy.visit('/dashboards')
        cy.log('click dashboard edit button')
        cy.xpath('(//div[@class="dropdown"])[1]').click()
        cy.contains('Edit Dashboard').click()    
        cy.get('#dashboard_description').clear().type('description updated')
        cy.get('[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Dashboard was successfully updated.")

    })
 
    it('verify the user can delete a dashboard',() =>
     {
        cy.visit('/dashboards')
        cy.log('click dashboard delete button')
        cy.get('[data-title="Delete Dashboard Automate dashboard"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Dashboard was successfully destroyed.")

    })
  
    // afterEach(function(){
    //     cy.logOut()
    // })
})
