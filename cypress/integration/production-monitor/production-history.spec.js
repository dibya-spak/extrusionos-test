
describe('Testing production history modal',{"scrollBehavior": false},()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
     
    it('verify user can navigate to production history tab & verify the table content',() =>
    {
        cy.log('navigate production history tab')
        cy.contains('Machine Monitor').click()
        cy.get('[href="/production_overview/history"]').click() 
        cy.contains('History').should('be.visible')
        cy.log('select an asset')
        cy.get('#asset_id').select('Reicofil')
        cy.get('#range').click()
        cy.contains('Last 7 Days').click()
        cy.log('validate production history table')
        cy.get('#DataTables_Table_0>thead>tr>th').should(($lis) => {
            expect($lis).to.have.length(8)
            expect($lis.eq(0)).to.contain('Start')
            expect($lis.eq(1)).to.contain('End')
            expect($lis.eq(2)).to.contain('Duration')
            expect($lis.eq(3)).to.contain('Product')
            expect($lis.eq(4)).to.contain('Product Specification')
            expect($lis.eq(5)).to.contain('Production Order')
            expect($lis.eq(6)).to.contain('Status')
          })
   })
   it('verify user can filter the history by asset & time range',() =>
    {
        cy.log('navigate live monitor tab')
        cy.visit('/production_overview/history')
        cy.get('#asset_id').select('Reicofil')
        cy.get('#range').click()
        cy.contains('Last 7 Days').click()
        cy.log('type in search bar')
        cy.get('[type="search"]').type('nodata')
        cy.get('.dataTables_empty').should('have.text','No matching records found')
        cy.get('[type="search"]').clear()
        cy.get('#DataTables_Table_1>tbody>tr').should('have.length.greaterThan',1)


    })
  
   

    afterEach(function(){
        cy.logOut()
    })
})
