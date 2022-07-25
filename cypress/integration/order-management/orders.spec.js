describe.skip('Testing order management modal(create/edit/delete orders)',()=>
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
        cy.get('#production_order_asset_id').select('Reicofil')
        cy.get('#production_order_status').should('have.value','open')
        cy.get('#production_order_product_id').select('product1')
        cy.get('#production_order_recipe_id').select('recipe1 (Reicofil)')
        cy.get('#scheduled_range').click()
        cy.get('div.ranges>ul>li').contains('Today').click()
        cy.get('#production_order_scheduled_quantity_m').clear({force:true}).type('20')
        cy.get('#production_order_scheduled_quantity_kg').clear().type('30')
        cy.log('save the order')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully created.")
    }) 
    it('verify user can start this order on production overview modal ',() =>
    {
        cy.log('click production overview button')
        cy.get('[title="Production overview"]').click()
        cy.wait(1000)
        cy.log('select an order for an assset')
        cy.get('#select2-select_order_asset_1-container').click()
        cy.get('[type="search"]').type('Automate order')
        cy.get('[type="search"]').type('{enter}')
        cy.wait(1000)
        cy.log('validate the product & recipe for that order')
        cy.get('#select2-select_recipe_asset_1-container').should('have.text',"product1 (recipe1)")
        cy.log('save the Production overview modal')
        cy.get('#submit_change_recipe_asset_1').click()
        cy.log('validate that order status in the overview ')
        cy.visit('/production_orders')
        cy.xpath('(//tbody/tr[1]/td[2])[1]').should('have.text',"running")
        cy.log('stop that order in Production overview modal')
        cy.get('[title="Production overview"]').click()
        cy.get('[aria-describedby="select2-select_order_asset_1-container"]').click()
        cy.get('#submit_change_recipe_asset_1').click()
        cy.log('validate that order status in the overview')
        cy.visit('/production_orders')
        cy.xpath('(//tbody/tr[1]/td[2])[1]').should('have.text',"complete")

   })

    it('verify the user can edit an order',() =>
    {
       cy.visit('/production_orders')
       cy.log('click an order')
       cy.xpath('//tbody/tr[1]').click()
       cy.log('change the status')
       cy.get('#production_order_status').select('open')
       cy.log('save the order')
       cy.get('[type="submit"]').click()
       cy.xpath('(//tbody/tr[1]/td[2])[1]').should('have.text',"open")

   })
 
    it('verify the user can delete an order',() =>
     {
        cy.visit('/production_orders')
        cy.log('click delete button for an order')
        cy.xpath('//tbody/tr[1]/td[15]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully destroyed.")
    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
