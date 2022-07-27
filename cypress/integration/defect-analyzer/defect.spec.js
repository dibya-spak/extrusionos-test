
describe('Testing defect analyzer',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can configure the process data',() =>
     {
        cy.log('navigating defect analyzer tab')
        cy.get('[href="/roll_data_analyzer"]').click()
        cy.get('[href="/roll_data_analyzer/process_data_configuration.js"]').click()
        cy.log('select any property')
        cy.get('#li_asset_1>ol>li:nth-child(2)').click()
        cy.get('#li_equipment_4>ol>li>label').click()
        cy.get('[value="Update Defects dashboard"]').click()
        cy.get('div#toast-container').should('have.text',"Defects dashboard was successfully updated.")
    }) 
    it('verify the user can configure the defect data',() =>
    {
       cy.log('navigating defect analyzer tab')
       cy.get('[href="/roll_data_analyzer"]').click()
       cy.get('[href="/roll_data_analyzer/defects_data_configuration.js"]').click()
       cy.log('select any defect class')
       cy.xpath('(//input[@type="checkbox"])[1]').click()
       cy.get('[value="Update Defects dashboard"]').click()
       cy.get('div#toast-container').should('have.text',"Defects dashboard was successfully updated.")
   }) 
   it('verify the user can disable & enable the selected properties',() =>
    {
       cy.log('navigating defect analyzer tab')
       cy.get('[href="/roll_data_analyzer"]').click()
       cy.wait(2000)
       cy.log('disable the property')
       cy.get('li.selected-process-data>div:nth-child(1)').click()
       cy.get('li.selected-process-data>div:nth-child(1)').should('have.class','hidden-in-graph')
       cy.log('enable the property')
       cy.get('li.selected-process-data>div:nth-child(1)').click()
       cy.get('li.selected-process-data>div:nth-child(1)').should('not.have.class','hidden-in-graph')
       cy.log('disable the defect class')
       cy.get('li.selected-defect-data>div:nth-child(1)').click()
       cy.get('li.selected-defect-data>div:nth-child(1)').should('have.class','hidden-in-graph')
       cy.log('enable the defect class')
       cy.get('li.selected-defect-data>div:nth-child(1)').click()
       cy.get('li.selected-defect-data>div:nth-child(1)').should('not.have.class','hidden-in-graph')

   }) 
   it('verify the user can select a specific time range',() =>
    {
       cy.log('navigating defect analyzer tab')
       cy.get('[href="/roll_data_analyzer"]').click()
       cy.get('[name="date-start"]').clear().type('2022-07-25')
       cy.get('[name="time-start"]').clear().type('10:00')
       cy.get('[name="date-end"]').clear().type('2022-07-25')
       cy.get('[name="time-end"]').clear().type('22:00')
       cy.get('[type="submit"]').click()
       cy.get('svg>svg>g>g:nth-child(5)>g').should(($lis) => {
        expect($lis).to.have.length(13)
        expect($lis.eq(0)).to.contain('10 AM')
        expect($lis.eq(12)).to.contain('10 PM')
        })
       cy.get('svg>svg>g>g:nth-child(3)>g').should(($lis) => {
        expect($lis).to.have.length(8)
        expect($lis.eq(0)).to.contain('0 mm')
        expect($lis.eq(7)).to.contain('3500 mm')

      })
   }) 
   
    
//     afterEach(function(){
//         cy.logOut()
//     })

})
