
describe('Testing material modal(create/edit/delete materials)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add a material',() =>
     {
        cy.log('navigate materials tab')
        cy.contains('Product Management').click()
        cy.contains('Materials').click()
        cy.log('adding a material')
        cy.contains('Add Material').click()
        cy.log('fill all the input fields')
        cy.get('#recipe_material_name').clear().type('Automate material')
        cy.get('#recipe_material_density').clear().type('100')
        cy.get('#recipe_material_material_type').clear().type('automatic')
        cy.get('#recipe_material_producer').clear().type('NA')
        cy.get('#recipe_material_bulk_density').clear().type('100')
        cy.get('#recipe_material_trade_name').clear().type('demo')
        cy.get('#recipe_material_processing_temperature').clear().type('100')
        cy.get('#recipe_material_melting_temperature').clear().type('500')
        cy.get('#recipe_material_antiblock').clear().type('200')
        cy.get('#recipe_material_slip').clear().type('100')
        cy.get('#recipe_material_mfi').clear().type('1000')
        cy.log('save the material')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Material was successfully created.")
    }) 
 
    it('verify the user can delete a material',() =>
     {
        cy.visit('/product_management/materials')
        cy.log('click material delete button')
        cy.get('[data-title="Delete Material Automate material"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Material was successfully destroyed.")

    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
