
describe('Testing roll detection settings(create/edit/delete detection settings)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can create a roll detection setting',() =>
     {
        cy.contains('Settings').click()
        cy.contains('Roll Detection').click()
        cy.get('[href="/roll_detection_settings/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#roll_detection_setting_asset_id').select('Reicofil')
        cy.wait(1000)
        cy.get('#roll_detection_setting_name').type('Automate settings')
        cy.wait(1000)
        cy.get('#roll_detection_setting_comments').type('Automate comment')
        cy.get('#roll_detection_setting_roll_detection_equipments_attributes_0_equipment_id').select('Winder (RF)')
        cy.get('#roll_detection_setting_roll_detection_equipments_attributes_0_roll_change_condition_equipment_property_id')
        .select('Reel Length')
        cy.get('#operator_select_0').select('>')
        cy.get('#operator_value_0').type('200')
        cy.get('#value_precision_0').type('4')
        cy.get('[name="commit"]').click()
        cy.get('div#toast-container').should('have.text',"Roll detection setting was successfully created.")
    }) 

    it('verify the user can detect the rolls by using that setting',() =>
    {
       cy.visit('/rolls')
       cy.log('detecting rolls')
       cy.get('#detect_roll').click()
       cy.get('#roll_detection_asset').select('Reicofil')
       cy.get('#roll_detections_select_method').select('Automate settings')
       cy.get('#is_detection_continue').click()
       cy.get('#detect_roll_submit').click()
       cy.get('div#toast-container').should('contain','Rolls have been detected')
   })

   it('verify the user can delete a roll from the overview list',{"scrollBehavior": false}, () =>
    {
       cy.visit('/rolls')
       cy.wait(1000)
       cy.log('click delete button')
       cy.get('tbody>tr:nth-child(1)').find('[data-confirm="Are you sure?"]').click()
       cy.get('.btn-danger').click()
       cy.get('div#toast-container').should('have.text',"Roll was successfully destroyed.")
   })
   it('verify the user can filter the roll overview list',{"scrollBehavior": false},() =>
   {
      cy.visit('/rolls')
      cy.wait(1000)
      cy.log('select the time range')
      cy.get('.time-range-container').click()
      cy.get('.ranges>ul>li:nth-child(5)').click()
      cy.get('#roll_detections_asset').select('Reicofil')
      cy.get('tbody>tr>td:nth-child(4)').invoke('text').should('match', /^Reicofil/)
  })

    it('verify the user can edit the roll detection setting',() =>
    {
        cy.visit('/roll_detection_settings')
        cy.log('click the row')
        cy.xpath('//td[2]').contains('Automate settings').click()
        cy.get('[name="is_second_winder"]').click()
       // cy.contains('Setting for Winder 2').should('be.visible')
        cy.get('.winder-index-1').should('contain','Setting for Winder 2')
        cy.get('[name="is_second_winder"]').click()
        cy.get('[name="commit"]').click()
        cy.get('div#toast-container').should('have.text',"Roll detection setting was successfully updated.")
   })
  
    it('verify the user can delete the roll detection setting',() =>
     {
        cy.visit('/roll_detection_settings')
        cy.wait(1000)
        cy.log('click detection setting delete button')
        cy.get('[data-title="Delete Roll detection setting Automate settings"]').click()
        cy.get('.btn-danger').click()
        cy.get('div#toast-container').should('have.text',"Roll detection setting was successfully destroyed.")
    })
    
//     afterEach(function(){
//         cy.logOut()
//     })

})
