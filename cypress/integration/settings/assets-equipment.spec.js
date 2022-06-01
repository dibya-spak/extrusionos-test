
describe('Testing assets & equipments modal',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add an asset',() =>
     {
        cy.contains('Settings').click()
        cy.contains('Assets & Equipment').click()
        cy.log('add a sheet asset')
        cy.get('a#dropdownMenuLink').click()
        cy.get('div>a.dropdown-item:nth-child(3)').click()
        cy.log('select Extruder E')
        cy.get('#equipment_groups_extrusion_csc_index_option_5_selected_template').select('Batch Dosing')
        cy.log('click continue button twice')
        cy.get('[value="Continue"]').click({force:true})
        cy.get('[value="Continue"]').click({force:true})
        cy.get('#create_asset').click({force:true})
        cy.get('div#toast-container').should('have.text',"Asset created")
        cy.log('validate the new asset image')
        cy.get('img[src="/images/sheet.jpg"]').should('be.visible')
        cy.contains('Back').click()
    }) 
    it('verify the user can edit the name/description of an asset',() =>
     {
        cy.visit('/inventory_assets')
        cy.log('select the 1st asset in the list')
        cy.get('Table>tbody>tr').contains('New Sheet').click()
        cy.log('update the name & description')
        cy.get('input#asset_name').clear({force:true}).type('Automate sheet')
        cy.get('input#asset_description').clear({force:true}).type('Automatic testing sheet asset')
        cy.log('save asset')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Asset was successfully updated.")
    })

    it('verify the automated mapping for an asset',() =>
    {
       cy.visit('/inventory_assets')
       cy.log('select the 1st asset in the list')
       cy.get('tbody>tr:nth-child(1)').click()
       cy.contains('Automated Mapping').click()
       cy.get('[value="Auto map and show results"]').should('be.disabled')
       cy.log('select a datasource')
       cy.get('div.form-multi-select').click()
       cy.get('div.form-multi-select-option-with-checkbox:nth-child(1)').click()
       cy.get('[value="Auto map and show results"]').should('be.enabled').click()
       cy.get('#automated-mapping-results').should('be.visible')
       cy.log('click create mapping button')
       cy.get('[name="create_mappings"]').should('be.enabled').click({force:true})
       cy.get('div#toast-container').should('have.text',"Mappings have been created!")
   })

    it('verify the user can mapping an equipment properties',() =>
     {
        cy.visit('/inventory_assets')
        cy.log('select 1st asset in the list')
        cy.get('tbody>tr:nth-child(1)').click()
        cy.wait(1000)
        cy.log('select 1st equipment in the list')
        cy.get('tbody>tr:nth-child(1)').click({force:true})
        cy.wait(1000)
        cy.log('select 1st property in the list')
        cy.get('tbody>tr:nth-child(1)').click({force:true})
        cy.wait(1000)
        cy.log('click act value mapping button')
        cy.xpath('(//a[@class="btn btn-secondary ms-2"])[2]').click()
        cy.log('Choose Act value')
        cy.get('tbody>tr:nth-child(1)').click()
        cy.contains('Use selected data series').click()
        cy.get('h6.mb-3').contains('BF Simulation').should('be.visible')
        cy.get('[value="Update Equipment property"]').click()
        cy.get('div#toast-container').should('have.text',"Equipment property was successfully updated.")
    })

    it('verify the user can unmap an equipment properties',() =>
    {
       cy.visit('/inventory_assets')
       cy.log('select 1st asset in the list')
       cy.get('tbody>tr:nth-child(1)').click()
       cy.wait(1000)
       cy.log('select 1st equipment in the list')
       cy.get('tbody>tr:nth-child(1)').click({force:true})
       cy.wait(1000)
       cy.log('select 1st property in the list')
       cy.get('tbody>tr:nth-child(1)').click({force:true})
       cy.wait(1000)
       cy.log('click unmap button')
       cy.get('[data-confirm="Are you sure?"]').click()
       cy.wait(1000)
       cy.contains('Confirm').click()
       cy.get('div#toast-container').should('have.text',"Equipment property mapping was successfully destroyed.")
       cy.get('[value="Update Equipment property"]').click()
       cy.get('div#toast-container').should('have.text',"Equipment property was successfully updated.")
   })

    // it('verify user can add an equipments to an asset',() =>
    //  {
    //     cy.visit('/inventory_assets')
    //     cy.log('select an asset in the list')
    //     cy.get('table>tbody>tr').contains('testing Sheet').click()
    //     cy.get('span.custom-dropdown').click()
    //     cy.get('input[type="search"]').type('Calander')
    //     cy.get('input[type="search"]').type('{enter}')
    //     cy.get('#equipment_name').should('have.text','New Calander').clear().type('automatic added')
    //     cy.get('input[type="submit"]').click()
    //     })
    
    it('verify the user can delete an asset',() =>
     {
        cy.visit('/inventory_assets')
        cy.log('click delete button for an asset ')
        cy.get('tbody>tr:nth-child(1)>td>a.destroy-asset').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Asset was successfully destroyed.")
    })

    afterEach(function(){
        cy.logOut()
    })
})
