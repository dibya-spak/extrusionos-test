
describe('Testing assets & equipments modal',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it.only('verify the user can add an asset',() =>
     {
        cy.contains('Settings').click()
        cy.contains('Assets & Equipment').click()
        cy.log('add an asset')
        cy.get('a#dropdownMenuLink').click()
        cy.get('div>a.dropdown-item:nth-child(2)').click()
        cy.get('#equipment_groups_beam_index_option_1_selected_template').select('Spunbond beam')
        //cy.get('#equipment_groups_take_offs_bf_index_option_1_selected_template').select('Take-Off')
        //cy.get('#equipment_groups_winder_bf_index_option_1_selected_template').select('Winder (BF)')
        //cy.get('#equipment_groups_pre_haul_offs_index_option_1_selected_template').select('Pre Haul-Off')
        cy.get('[value="Continue"]').click()
        cy.get('[value="Continue"]').click()
        cy.get('#create_asset').click()
        cy.log('validating the new asset image')
        cy.get('img[src="/images/blown_film.jpg"]').should('be.visible')
        cy.get('div#toast-container').should('have.text',"Asset created.")
    }) 
    it('verify the user can edit the name/description of an asset',() =>
     {
        cy.visit('/inventory_assets')
        cy.log('select the 1st asset in the list')
        cy.get('Table>tbody>tr').contains('New Blown Film').click()
        cy.get('input#asset_name').clear({force:true}).type('Automate Blown Film')
        cy.get('input#asset_description').clear({force:true}).type('Automatic testing asset')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Asset was successfully updated.")
    })
    it.skip('verify the user can mapping an equipment properties',() =>
     {
        cy.visit('/inventory_assets')
        cy.log('select 1st asset in the list')
        cy.get('table>tbody>tr').contains('testing Sheet').click()
        cy.log('select 1st equipment in the list')
        cy.get('table>tbody>tr').contains('Extruder (cont. Dosing) CSC E').click({force:true})
        cy.log('select 1st property in the list')
        cy.get('table>tbody>tr').contains('1 Side Component Ratio').click({force:true})
        cy.log('click act value mapping button')
        cy.get('a.btn-secondary').contains('act_value').click()  
        cy.get('tbody>tr:nth-child(1)').click()
        cy.contains('Use selected data series').click()
        cy.get('h6.mb-3').contains('BF Simulation').should('be.visible')
        cy.get('input[value="Update Equipment Property"]').click()
        // cy.get('div#toast-container').should('have.text',"Equipment Property was successfully updated.")
    })
    it('verify user can add an equipments to an asset',() =>
     {
        cy.visit('/inventory_assets')
        cy.log('select an asset in the list')
        cy.get('table>tbody>tr').contains('testing Sheet').click()
        cy.get('span.custom-dropdown').click()
        cy.get('input[type="search"]').type('Calander')
        cy.get('input[type="search"]').type('{enter}')
        cy.get('#equipment_name').should('have.text','New Calander').clear().type('automatic added')
        cy.get('input[type="submit"]').click()
        })
    
    it.skip('verify the user can delete an asset',() =>
     {
        cy.visit('/inventory_assets')
        cy.log('click delete button for an asset ')
        cy.get('tbody>tr:nth-child(1)>td>a.destroy-asset').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Asset was successfully destroyed.")
    })

    // afterEach(function(){
    //     cy.logOut()
    // })
})
