
describe('Testing production comparisons modal(create/edit/delete dashboards)',{"scrollBehavior": false},()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add a comparison dashboard',() =>
     {
        cy.log('navigate comparison tab')
        cy.contains('Trend Analyzer').click()
        cy.contains('Production Compare').click()
        cy.log('adding a comparison dashboard')
        cy.get('[href="/production_comparisons/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#production_comparison_name').clear().type('Automate comparison')
        cy.get('#production_comparison_description').clear().type('no description')
        cy.log('configure properties 1')
        cy.xpath('(//*[@class="btn btn-primary"])[1]').click()
        cy.get('[for="equipment_2"]').click()
        cy.contains('Belt Tension').click()
        cy.log('save configure 1')
        cy.get('#selector-modal-select-properties-button').click()
        cy.wait(1000)
        cy.log('configure properties 2')
        cy.xpath('(//*[@class="btn btn-primary"])[2]').click()
        cy.wait(1000)
        cy.get('[for="equipment_2"]').click()
        cy.get('#li_equipment_2>ol>li:nth-child(2)>label').click()
        cy.log('save configure 2')
        cy.get('#selector-modal-select-properties-button').click()
        cy.log('save dashboard')
        cy.xpath('(//*[@class="btn btn-primary"])[3]').click()
        cy.get('div#toast-container').should('have.text',"Production comparison was successfully created.")
    })
    it('verify the user can view the dashboard',() =>
    {
       cy.visit('/production_comparisons')
       cy.log('click a comparison dashboard')
       cy.get('[class="card-title-text"]').contains('Automate comparison').click()
       cy.get('[class="header_title"]').should('have.text','Production Comparison')
   }) 

    it('verify the user can edit a comparison dashboard',() =>
     {
        cy.visit('/production_comparisons')
        cy.log('click dashboard edit button')
        cy.xpath('(//div[@class="dropdown"])[1]').click()
        cy.contains('Edit comparison').click()
        cy.log('edit description')
        cy.get('#production_comparison_description').clear().type('description updated')
        cy.log('save modal')
        cy.get('[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Production comparison was successfully updated.")

    })
 
    it('verify the user can delete a dashboard',() =>
     {
        cy.visit('/production_comparisons')
        cy.log('click dashboard delete button')
        cy.get('[data-title="Delete Production comparison Automate comparison"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production comparison was successfully destroyed.")

    })
  
    // afterEach(function(){
    //     cy.logOut()
    // })
})
