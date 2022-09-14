
describe('Testing snapshot modal(create/edit/delete snapshots)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can create a snapshot',() =>
     {
        cy.log('click on create snapshot button at top')
        cy.get('[href="/production_snapshots/new.js"]').click()
        cy.log('fill all the input fields')
        cy.get('#production_snapshot_asset_id').select('Reicofil')
        cy.get('#submit').click()
        cy.get('thead>tr>th').should(($lis) => {
            expect($lis).to.have.length(7)
            expect($lis.eq(0)).to.contain('Equipment')
            expect($lis.eq(1)).to.contain('Property name')
            expect($lis.eq(2)).to.contain('Unit')
            expect($lis.eq(3)).to.contain('Act value')
            expect($lis.eq(4)).to.contain('Set point')
            expect($lis.eq(5)).to.contain('Target')
            expect($lis.eq(6)).to.contain('ThresholdGroup')
          })
        cy.log('save snapshot')
        cy.get('#next').click()
        cy.get('#production_snapshot_name').clear().type('Automate snapshot')
        cy.get('#production_snapshot_comment').clear().type('Automatic description')
        cy.get('#submit').click()
        cy.get('div#toast-container').should('have.text',"Snapshot was created")

    })
    it.skip('verify the search bar in the snapshot overview',() =>
    {
       cy.visit('/production_snapshots')
       cy.get('[type="search"]').type('Automate snapshot')
       cy.get('tbody>tr>td:nth-child(2)').should('have.text','Automate snapshot')
       cy.get('[type="search"]').clear()
       cy.get('tbody>tr').should('have.length.greaterThan', 1)
 
   }) 

    it('verify the user can navigate to snapshot details page',() =>
     {
        cy.log('naviagte snapshot tab') 
        cy.contains('Benchmark Tool').click()
        cy.get('[href="/production_snapshots"]').click()
        cy.get('[name="snapshots_datatable_length"]').select('100')
        cy.log('select a snapshot')
        cy.get('table>tbody>tr').contains('Automate snapshot').click()
        cy.get('.header_title').should('have.text','Automate snapshot')
        cy.get('thead>tr>th').should(($lis) => {
            expect($lis).to.have.length(9)
            expect($lis.eq(1)).to.contain('Equipment')
            expect($lis.eq(2)).to.contain('Equipment property')
            expect($lis.eq(3)).to.contain('Display unit')
            expect($lis.eq(4)).to.contain('Act value')
            expect($lis.eq(5)).to.contain('Set point')
            expect($lis.eq(6)).to.contain('Set vs act')
            expect($lis.eq(7)).to.contain('Target value')
            expect($lis.eq(8)).to.contain('Threshold groups')
          })
        cy.get('[type="search"]').type('fghg')
        cy.get('.dataTables_empty').should('have.text',"No matching records found")
        cy.get('[type="search"]').clear()
        cy.get('tbody>tr').should('have.length.greaterThan', 1)
        cy.xpath('(//*[@href="/production_snapshots"])[2]').click()
        cy.get('.header_title').should('have.text',"Snapshots")

    })
 
    it('verify the user can delete a snapshot',() =>
     {
        cy.visit('/production_snapshots')
        cy.get('[name="snapshots_datatable_length"]').select('100')
        cy.log('click delete button for a snapshot')
        cy.get('[data-title="Delete Production snapshot Automate snapshot"]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Production snapshot was successfully destroyed.")

    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
