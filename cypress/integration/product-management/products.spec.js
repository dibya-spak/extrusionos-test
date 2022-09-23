
describe('Testing products & recipe modal(create/edit/delete products & recipe)',{"scrollBehavior": false},()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add a product',() =>
     {  
        cy.log('navigate products tab')
        cy.contains('Product Management').click()
        cy.contains('Products').click()
        cy.log('adding a product')
        cy.contains('Add Product').click()
        cy.log('fill all the input fields')
        cy.get('#product_name').clear().type('Automate product')
        cy.get('#product_comment').clear().type('no comment')
        cy.log('save product')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Product was successfully created.")
    }) 
    it('verify the user can add a recipe to that product',() =>
    {
       cy.visit('/product_management/products')
       cy.log('open a product')
       cy.get('table>tbody>tr').contains('Automate product').click({force:true})
       cy.log('adding a Production specification')
       cy.get('div>a.btn-primary').click({force:true})
       cy.log('fill all the input fields')
       cy.get('#recipe_name').clear({force:true}).type('Automate recipe')
       cy.get('select[name="recipe[asset_id]"]').select('Reicofil')
       cy.get('#recipe_comment').clear().type('automate comment')
       cy.log('adding threshold')
       cy.get('div>a.threshold-add-button').click()
       cy.contains('Line Speed').click()
       cy.get('button.select-threshold-properties').click()
       cy.get('table>tbody>tr>td:nth-child(6)').type('200')
       cy.log('adding material layer')
       cy.get('[data-association="material_layer"]').click()
       cy.log('fill required fields for material layer')
       cy.xpath('(//select[@class="form-control select required"])[2]').should('not.be.empty')
       cy.xpath('(//select[@class="form-control select required"])[3]').should('not.be.empty')
       cy.get('input[type="number"]:nth-child(2)').clear().type('100')
       cy.log('save recipe')
       cy.get('input[type="submit"]').click()
       cy.get('div#toast-container').should('have.text',"Production specification was successfully created.")
   })
   it('verify the user can manage threshold groups in that recipe',() =>
   {
      cy.visit('/product_management/products')
      cy.log('select product')
      cy.get('table>tbody>tr').contains('Automate product').click({force:true})
      cy.log('select a recipe')
      cy.get('tbody>tr').click()
      cy.get('#manage_threshold_groups').click()
      cy.wait(1000)
      cy.get('#add-threshold-group').click()
      cy.log('type Tgroup name')
      cy.xpath('(//input[@placeholder="Name"])[1]').clear().type('1st group')
      cy.get('.save-threshold-groups').click()
      cy.get('div#toast-container').should('have.text',"Threshold Groups were successfully updated.")
    //   cy.xpath('(//span[@class="select2-selection select2-selection--multiple"])[1]').click()
    //   cy.contains('1st group').click({force:true})
      cy.get('#manage_threshold_groups').click()
      cy.log('delete Tgroup')
      cy.xpath('(//button[@class="btn btn-outline-danger btn-sm destroy-button"])[1]').click()
      cy.get('.save-threshold-groups').click()
      cy.get('div#toast-container').should('have.text',"Threshold Groups were successfully updated.")
  })
   it('verify the user can copy a recipe',() =>
   {
      cy.visit('/product_management/products')
      cy.log('select product')
      cy.get('table>tbody>tr').contains('Automate product').click({force:true})
      cy.log('click copy button of a recipe')
      cy.get('tbody>tr:nth-child(1)>td>a.copy-button').click()
      cy.log('update comment')
      cy.get('#recipe_comment').clear().type('recipe copied')
      cy.log('save copied recipe')
      cy.get('[value="Create production specification"]').click()
      cy.get('div#toast-container').should('have.text',"Production specification was successfully copied.")
      cy.contains('Back').click()

  })

   it('verify the user can copy a product',() =>
   {
      cy.visit('/product_management/products')
      cy.log('click copy button of a product')
      cy.get('tbody>tr:nth-child(1)>td>a.copy-button').click()
      cy.log('update comment')
      cy.get('#product_name').clear().type('Automate product copied')
      cy.log('save copied product')
      cy.get('[value="Create Product"]').click()
      cy.get('div#toast-container').should('have.text',"Product was successfully copied.")
      cy.contains('Back').click()

  })
 
    it('verify the user can delete a product & the associated recipe',() =>
     {
        cy.visit('/product_management/products')
        cy.log('select a product')
        cy.get('table>tbody>tr').contains('Automate product').click({force:true})
        cy.log('click delete button for a PS')
        cy.get('[data-title="Delete Production specification Automate recipe"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production specification was successfully destroyed.")
        cy.contains('Back').click()
        cy.log('click delete button of a product')
        cy.get('tbody>tr:nth-child(1)>td>a.destroy-button').click()
        cy.wait(2000)
        cy.get('div>#options_confirm_string').type('DELETE')
        cy.log('click delete button')
        cy.get('input.btn-danger').click()
        cy.get('div#toast-container').should('have.text',"Product was successfully destroyed.")

    })
    it('verify the user can delete the copied product',() =>
    {
       cy.visit('/product_management/products')
       cy.log('click delete button of a product')
       cy.get('tbody>tr:nth-child(1)>td>a.destroy-button').click()
       cy.wait(2000)
       cy.get('div>#options_confirm_string').type('DELETE')
       cy.get('input.btn-danger').click()
       cy.get('div#toast-container').should('have.text',"Product was successfully destroyed.")

   })
    
    // afterEach(function(){
    //     cy.logOut()
    // })
})
