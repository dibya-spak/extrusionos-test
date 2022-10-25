
describe('Testing snapshot modal(create/edit/delete snapshots)',{"scrollBehavior": false},()=>
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
        const listitems = ['Equipment','Property Name','Unit','Act Value', 'Set Point','Target','ThresholdGroup']
        cy.get('thead>tr>th').should('have.length', 7).each(($ele, i) => {
            expect($ele).to.have.text(listitems[i])
        })
        cy.log('click next')
        cy.get('#next').click()
        cy.get('#production_snapshot_name').clear().type('Automate snapshot')
        cy.get('#production_snapshot_comment').clear().type('Automatic description')
        cy.get('#submit').click()
        cy.get('div#toast-container').should('have.text',"Snapshot was created")

    })
    it('verify the search bar in the snapshot overview',() =>
    {
       cy.visit('/production_snapshots')
       cy.get('#filters_search').type('Automate snapshot')
       cy.wait(1000)
       cy.get('tbody>tr>td:nth-child(2)').should('have.text','Automate snapshot')
       cy.get('#filters_search').clear()
       cy.get('tbody>tr').should('have.length.greaterThan', 1)
 
   }) 

    it('verify the user can navigate to snapshot details page & validate the contains',() =>
     {
        cy.log('naviagte snapshot tab') 
        cy.contains('Machine Monitor').click()
        cy.get('[href="/production_snapshots"]').click()
        cy.log('increase the row')
        cy.get('[name="snapshots_datatable_length"]').select('100')
        cy.log('select a snapshot')
        cy.get('table>tbody>tr').contains('Automate snapshot').click()
        cy.get('.header_title').should('have.text','Snapshot: Automate snapshot')
        const listitems = ['','Equipment','Equipment Property','Display Unit','Act Value', 'Set Point','Act vs. Set','Target Value','Threshold Groups']
        cy.get('thead>tr>th').each(($ele, i) => {
            //cy.log("====",$ele.text())
            expect($ele).to.have.text(listitems[i])
        })
        cy.log('search by name')
        cy.get('#snapshot_details_filter').type('fghg')
        cy.get('.dataTables_empty').should('have.text',"No matching records found")
        cy.get('#snapshot_details_filter').clear()
        cy.get('tbody>tr').should('have.length.greaterThan', 1)
        cy.log('click snapshot navigation')
        cy.get('.item-2').click()
        cy.get('.header_title').should('have.text',"Snapshots")

    })
 
    it('verify the user can delete a snapshot',() =>
     {
        cy.visit('/production_snapshots')
        cy.log('increase the row')
        cy.get('[name="snapshots_datatable_length"]').select('100')
        cy.log('click delete button for a snapshot')
        cy.get('[data-title="Delete Snapshot Automate snapshot"]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Snapshot was successfully destroyed.")

    })
  
    
    afterEach(function(){
        cy.logOut()
    })
})
