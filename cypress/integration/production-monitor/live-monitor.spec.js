
describe('Testing live monitor modal',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
     
    it('verify user can navigate to the live monitor tab by selecting asset from home page',{"scrollBehavior": false},() =>
    {
        cy.log('select an asset in home page')
        cy.scrollTo('bottom')
        cy.get('.card-header').contains('Reicofil').click()
        cy.contains('Machine Monitor').should('be.visible') 
        cy.log('validate the selected asset in live monitor tab')
        cy.get('#asset_id').contains('Reicofil').should('be.visible')
        cy.log('validate live monitor table')
        cy.get('thead>tr>th').should(($lis) => {
            expect($lis).to.have.length(9)
            expect($lis.eq(0)).to.contain('Equipment')
            expect($lis.eq(1)).to.contain('Property name')
            expect($lis.eq(2)).to.contain('Unit')
            expect($lis.eq(3)).to.contain('Target')
            expect($lis.eq(4)).to.contain('Set point')
            expect($lis.eq(5)).to.contain('Act value')
            expect($lis.eq(6)).to.contain('Set vs act')
            expect($lis.eq(7)).to.contain('Act vs target')
            expect($lis.eq(8)).to.contain('ThresholdGroup')
          })
   })
   it('verify user can search & filter available option then clear it ',() =>
    {
        cy.log('navigate live monitor tab')
        cy.contains(' Machine Monitor').click()
        cy.get('[href="/production_overview/compliance"]').click()
        cy.log('search & select an asset')
        cy.get('#select2-asset_id-container').click()
        cy.xpath('//input[@type="search"]').clear().type('Reicofil').type('{enter}')
        cy.log('validate the selected asset')
        cy.get('#select2-asset_id-container').contains('Reicofil').should('be.visible')
        cy.wait(1000)
        cy.log('search & select an equipment')
        cy.xpath('(//textarea[@type="search"])[1]').type('Winder').type('{enter}')
        cy.log('validate the selected equipment')
        cy.get('#filter-equipment').contains('Winder').should('be.visible')
        cy.wait(1000)
        cy.log('search & select a property')
        cy.xpath('(//textarea[@type="search"])[2]').type('line speed').type('{enter}')
        cy.log('validate the selected property')
        cy.get('#filter-equipment_property').contains('Line Speed').should('be.visible')
        cy.wait(1000)
        cy.log('search & select unit')
        cy.xpath('(//textarea[@type="search"])[3]').type('%').type('{enter}')
        cy.log('validate the selected unit')
        cy.get('#filter-display_unit').contains('%').should('be.visible')
        cy.wait(1000)
        cy.log('search & select a threshold group')
        cy.xpath('(//textarea[@type="search"])[4]').type('major').type('{enter}')
        cy.log('validate the selected threshold group')
        cy.get('#threshold_group_id').contains('major').should('be.visible')
        cy.log('clear all the filters')
        cy.get('[title="Remove item"]').click({ multiple: true })
        cy.log('validate the filter has removed')
        cy.get('[type="search"]').should('have.value','')

   })
  
   

    afterEach(function(){
        cy.logOut()
    })
})
