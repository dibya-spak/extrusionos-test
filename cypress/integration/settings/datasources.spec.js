
describe('Testing Datasource modal(create/edit/delete datasource)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can create a camea datasource',() =>
     {
        cy.contains('Settings').click()
        cy.contains('Data Sources').click()
        cy.log('adding camea datasource')
        cy.get('#addDataSourceAction').click()
        cy.contains('Add Camea data source').click()
        cy.log('fill all the input fields')
        cy.get('#camea_data_source_data_source_attributes_name').clear().type('camea testing datasource')
        cy.get('#camea_data_source_data_source_attributes_description').clear().type('no description')
        cy.get('#camea_data_source_smb_host').clear().type('120.0.0.0')
        cy.get('#camea_data_source_smb_share').clear().type('testdata')
        cy.get('#camea_data_source_smb_user').clear().type('automate user')
        cy.get('#camea_data_source_smb_password').clear().type('password')
        cy.get('#camea_data_source_width').should('have.value','3500').clear().type('500')
        cy.log('selecting asset')
        cy.get('span.select2-selection__rendered').click()
        cy.get('span>ul>li:nth-child(2)').click()
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Camea data source was successfully created.")
    }) 
    it('verify the user can edit the camea datasource',() =>
    {
        cy.visit('/data_sources')
        cy.log('click datasource edit button')
        cy.get('table>tbody>tr').contains('camea testing datasource').click()
        cy.get('#camea_data_source_data_source_attributes_description').clear({force:true}).type('description updated')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"Camea data source was successfully updated.")
   })
   it.skip('verify the user can mapping the camea datasource',() =>
    {
        cy.visit('/data_sources')
        cy.get('table>tbody>tr:nth-child(1)>td>a:nth-child(1)').click()
        cy.contains('Configure record mappings').click()
        cy.get('a.add_fields').click()
        cy.wait(2000)
        cy.get('#data_sourceable_structured_record_mappings_attributes_1641300348092_name').type('class n')
        cy.get('#data_sourceable_structured_record_mappings_attributes_1641300348092_color').should('have.value','#FF0000')
        cy.get('#data_sourceable_structured_record_mappings_attributes_1641300348092_external_id').type('10')
        cy.get('#data_sourceable_structured_record_mappings_attributes_1641300348092_id_type').should('contain','Defect Class')
        cy.get('input.btn-primary').click()
        cy.wait(2000)
        cy.contains('Back')
        cy.get('a.btn-outline-dark').click()
        cy.get('div#toast-container').should('have.text',"Camea data source was successfully updated.")
   })
    it('verify the user can delete a camea datasource',() =>
     {
        cy.visit('/data_sources')
        cy.log('click datasource delete button')
        cy.get('table>tbody>tr:nth-child(1)>td>a:nth-child(2)').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Camea data source was successfully destroyed.")
    })
    
    afterEach(function(){
        cy.logOut()
    })
})