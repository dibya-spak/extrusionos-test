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
        cy.log('click add button')
        cy.get('[href="/production_orders/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#production_order_order_id').clear().type('Automate order')
        cy.get('#production_order_asset_id').select('Reicofil')
        cy.get('#production_order_status').should('have.value','open')
        cy.get('#production_order_product_id').select('product1')
        cy.get('#production_order_recipe_id').select('recipe1 (Reicofil)')
        cy.log('set the date & time')
        cy.get('#scheduled_range').click()
        cy.get('div.ranges>ul>li').contains('Today').click()
        cy.get('#production_order_scheduled_quantity_m').clear({force:true}).type('20')
        cy.get('#production_order_scheduled_quantity_kg').clear().type('30')
        cy.log('save the order')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully created.")
    }) 

    it('verify user can start & stop this order on production overview modal ',() =>
    {
        cy.log('click production overview button')
        cy.get('[title="Production overview"]').click()
        cy.wait(1000)
        cy.log('select an order for an assset')
        cy.get('#select2-select_order_asset_1-container').click()
        cy.get('[type="search"]').type('Automate order').type('{enter}')
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
        cy.log('remove the running order')
        cy.get('[aria-describedby="select2-select_order_asset_1-container"]').click()
        cy.log('save the production overview modal')
        cy.get('#submit_change_recipe_asset_1').click()
        cy.log('validate that order status in the overview')
        cy.visit('/production_orders')
        cy.xpath('(//tbody/tr[1]/td[2])[1]').should('have.text',"complete")

   })
   it('verify user can filter the order overview',() =>
   {
      cy.visit('/production_orders')
      cy.get('#filters_search').type('Automate order')
      cy.log('validate the order name after filter')
      cy.get('tbody>tr>td:nth-child(1)').should('have.text','Automate order')
      cy.get('#filters_search').clear()
      cy.get('tbody>tr').should('have.length.greaterThan', 1)
      cy.get('#filters_asset').select('Reicofil')
      cy.log('validate the asset column after filter')
      cy.get('tbody>tr>td:nth-child(3)').invoke('text').should('match', /^Reicofil/)
      cy.get('#production_order_status').select('complete')
      cy.get('tbody>tr>td:nth-child(2)').invoke('text').should('match', /^complete/)
      cy.get('#production_order_product').select('product1')
      cy.get('tbody>tr>td:nth-child(4)').invoke('text').should('match', /^product1/)
      cy.get('#scheduled_type').select('scheduled')
      cy.get('tbody>tr>td:nth-child(6)').should('not.be.empty') 
      cy.get('#time_range').click()
      cy.get('div.ranges>ul>li').contains('Today').click()
      cy.get('tbody>tr>td:nth-child(1)').should('contain','Automate order')
      cy.get('#time_range').click()
      cy.log('clear the date picker')
      cy.get('.cancelBtn').click()  
      cy.get('#time_range').should('be.empty')
    

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
        cy.xpath('//tbody/tr[1]/td[9]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully destroyed.")
    })
    it('verify the user can import orders',() =>
    {
       cy.visit('/production_orders')
       cy.log('click import button')
       cy.get('[href="/upload_file"]').click()
       cy.get('.upload-file').selectFile('cypress/fixtures/orders.csv')
       cy.log('after uploading validate the file name')
       cy.xpath('//label[@id="selected_file_name"]').should('have.text','orders.csv')
       cy.log('click preview button')
       cy.get('[value="Preview"]').click()
       cy.get('p.text-danger').should('contain','Some assets, products or production specifications could not be found in our system.')
       cy.log('click confirm button')
       cy.get('[value="Confirm"]').click()
       cy.get('div#toast-container').should('have.text',"Production order was successfully created.")
       cy.log('close the alert pop-up')
       cy.xpath('(//a[@href="/production_orders"])[2]').click()
    
   })
   it('verify the user can skip or replace the order during import ',() =>
    {
       cy.visit('/production_orders')
       cy.log('click import button')
       cy.get('[href="/upload_file"]').click()
       cy.get('.upload-file').selectFile('cypress/fixtures/orders.csv')
       cy.get('[value="Preview"]').click()
       cy.get('[value="Confirm and Skip"]').click()
       cy.get('div#toast-container').should('have.text',"Production order was no new records created")
       cy.log('click import button')
       cy.get('[href="/upload_file"]').click()
       cy.get('.upload-file').selectFile('cypress/fixtures/orders.csv')
       cy.get('[value="Preview"]').click()
       cy.get('[value="Confirm and Replace"]').click()
       cy.get('div#toast-container').should('have.text',"Production order was successfully created.")
       cy.log('close the alert pop-up')
       cy.xpath('(//a[@href="/production_orders"])[2]').click()
    
   })
   it('verify user can delete that imported order',() =>
     {
        cy.visit('/production_orders')
        cy.log('click delete button for an order')
        cy.xpath('//tbody/tr[1]/td[9]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully destroyed.")
    })
  
    
    // afterEach(function(){
    //     cy.logOut()
    // })
})
