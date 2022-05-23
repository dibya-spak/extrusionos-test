describe('Testing order management modal(create/edit/delete orders)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add an order',() =>
     {
        cy.log('navigate order management tab')
        cy.get('[href="/production_orders"]').click()
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
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully created.")
    }) 
    it('verify the user can edit an order',() =>
    {
       cy.visit('/production_orders')
       cy.log('click an order')
    
       // cy.xpath('//tr/td[1]').each(($el, index, $list) => {
       //     const txt = $el.text()
       //     if (txt.includes('Automate order')){
       //         cy.xpath('//tr[1]/td[14]').click()
       //     }
       // })
       cy.get('tbody>tr:nth-child(1)>td:nth-child(14)').click()
       cy.contains('Confirm').click()
       cy.get('div#toast-container').should('have.text',"Production order was successfully destroyed.")
   })
 
    it('verify the user can delete an order',() =>
     {
        cy.visit('/production_orders')
        cy.log('click delete button for an order')
        cy.get('tbody>tr:nth-child(1)>td:nth-child(14)').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production order was successfully destroyed.")
        // cy.xpath('//tr/td[1]').each(($el, index, $list) => {
        //     const txt = $el.text()
        //     if (txt.includes('Automate order')){
        //         cy.xpath('//tr[1]/td[14]').click()
        //     }
        // })
    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
