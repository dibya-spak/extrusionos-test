
describe('Testing snapshot modal(create/edit/delete snapshots)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can create a snapshot',() =>
     {
        cy.log('click on create snapshot button')
        cy.get('[href="/production_snapshots/new.js"]').click()
        cy.log('fill all the input fields')
        cy.get('#production_snapshot_name').clear().type('Automate snapshot')
        cy.get('#production_snapshot_asset_id').select('RF5')
        cy.get('#production_snapshot_comment').type('automatic comment')
        cy.get('[class="btn btn-primary"]').click()
        cy.get('div#toast-container').should('have.text',"Snapshot was created")

    }) 

    it('verify the user can edit a snapshot',() =>
     {
        cy.log('naviagte benchmark tab') 
        cy.contains('Benchmark Tool').click()
        cy.get('[href="/production_snapshots"]').click()
        cy.get('table>tbody>tr').contains('Automate snapshot').click()
        cy.get('#production_snapshot_comment').type('comment modified')
        cy.get('[class="btn btn-primary"]').click()
        cy.get('div#toast-container').should('have.text',"Production snapshot was successfully updated.")

    })
 
    it('verify the user can delete a snapshot',() =>
     {
        cy.visit('/production_snapshots')
        cy.log('click delete button for a snapshot')
        cy.get('[data-title="Delete Production snapshot Automate snapshot"]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production snapshot was successfully destroyed.")

    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
