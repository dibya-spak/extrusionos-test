describe('Testing order management modal(create/edit/delete orders)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add an order',() =>
     {
        cy.log('navigate order management tab')
        cy.contains('Order Management').click()
        cy.log('adding an order')
        cy.get('[href="/production_orders/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#production_order_order_id').clear().type('Automate order')
        cy.get('#production_order_asset_id').select('RF5')
        cy.get('#production_order_status').should('have.value','open')
        cy.get('#production_order_product_id').select('Oscus')
        cy.get('#production_order_recipe_id').select('testing r100 (RF5)')
        cy.get('#scheduled_range').click()
        cy.get('div.ranges>ul>li').contains('Today').click()
        cy.get('#production_order_scheduled_quantity_m').clear({force:true}).type('20')
        cy.get('#production_order_scheduled_quantity_kg').clear().type('30')
        cy.log('save the order')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully created.")
    }) 
    it('verify the user can edit an order',() =>
    {
       cy.visit('/production_orders')
       cy.log('click an order')
       cy.xpath('//tbody/tr[1]').click()
       cy.log('change the status')
       cy.get('#production_order_status').select('complete')
       cy.log('set the actual time')
       cy.get('#actual_range').click()
       cy.get('div:nth-child(6)>div.ranges>ul>li').contains('Yesterday').click({force:true})
       cy.log('save the order')
       cy.get('[type="submit"]').click()
       cy.get('div#toast-container').should('have.text',"Production order was successfully updated.")
   })
 
    it('verify the user can delete an order',() =>
     {
        cy.visit('/production_orders')
        cy.log('click delete button for an order')
        cy.xpath('//tbody/tr[1]/td[14]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully destroyed.")
    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
