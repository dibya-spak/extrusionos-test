

describe('Testing benchmark modal(create/edit/delete benchmarks)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add a benchmark',() =>
     {
        cy.log('navigate benchmarks tab')
        cy.contains('Benchmark Tool').click()
        cy.contains('Benchmarks').click()
        cy.log('adding a benchmark')
        cy.contains('Add Benchmark').click()
        cy.log('fill all the input fields')
        cy.get('#asset_benchmark_asset_id').select('RF5')
        cy.get('#asset_benchmark_name').clear().type('automate benchmark')
        cy.get('#asset_benchmark_comments').clear().type('no comment')
        cy.get('input[name="quick_mode"]').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully created.")
    }) 
 
    it('verify the user can delete a benchmark',() =>
     {
        cy.visit('/asset_benchmarks')
        cy.log('click dashboard delete button')
        cy.get('[data-title="Delete Benchmark automate benchmark"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully destroyed.")

    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
