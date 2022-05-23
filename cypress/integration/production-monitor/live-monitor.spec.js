
describe('Testing live monitor modal',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
     
    it('verify user can navigate to the live monitor tab by the selected asset from home page',() =>
    {
        cy.get('.card-title').contains('RF5').click()
        cy.contains('Production Monitor').should('be.visible') 
        cy.get('#asset_id').contains('RF5').should('be.visible')
        cy.get('thead>tr>th').should(($lis) => {
            expect($lis).to.have.length(7)
            expect($lis.eq(0)).to.contain('Equipment')
            expect($lis.eq(1)).to.contain('Property name')
            expect($lis.eq(2)).to.contain('Unit')
            expect($lis.eq(3)).to.contain('Act value')
            expect($lis.eq(4)).to.contain('Set point')
            expect($lis.eq(5)).to.contain('Target value')
            expect($lis.eq(6)).to.contain('Threshold group')
          })
   })
   it('verify user can search & filter available option then clear it ',() =>
    {
        cy.contains('Production Monitor').click()
        cy.get('[href="/production_overview/compliance"]').click()
        cy.get('#select2-asset_id-container').click()
        cy.xpath('//input[@type="search"]').clear().type('RF5')
        cy.xpath('//input[@type="search"]').type('{enter}')
        cy.get('#select2-asset_id-container').contains('RF5').should('be.visible')
        cy.wait(1000)
        cy.xpath('(//textarea[@type="search"])[1]').type('Extruder')
        cy.xpath('(//textarea[@type="search"])[1]').type('{enter}')
        cy.get('#filter-equipment').contains('Extruder').should('be.visible')
        cy.wait(1000)
        cy.xpath('(//textarea[@type="search"])[2]').type('line speed')
        cy.xpath('(//textarea[@type="search"])[2]').type('{enter}')
        cy.get('#filter-equipment_property').contains('Line speed').should('be.visible')
        cy.wait(1000)
        cy.xpath('(//textarea[@type="search"])[3]').type('%')
        cy.xpath('(//textarea[@type="search"])[3]').type('{enter}')
        cy.get('#filter-display_unit').contains('%').should('be.visible')
        cy.wait(1000)
        cy.xpath('(//textarea[@type="search"])[4]').type('Productivity')
        cy.xpath('(//textarea[@type="search"])[4]').type('{enter}')
        cy.get('#threshold_group_id').contains('Productivity').should('be.visible')
        cy.get('[title="Remove item"]').click({ multiple: true })
        cy.get('[type="search"]').should('have.value','')

   })
  
   

    // afterEach(function(){
    //     cy.logOut()
    // })
})
