


describe('Create/edit/delete user details',()=>
{
      beforeEach(function(){
        cy.adminLogIn()
        })

    it('verify creating an user as manager',() =>
     {
        cy.log('navigate user tab')
        cy.contains('Settings').click()
        cy.contains('User Management').click()
        cy.log('add new user')
        cy.get('[href="/users/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#user_first_name').clear().type('manager')
        cy.get('#user_last_name').clear().type('user')
        cy.get('#user_email').clear().type('automate@localhost')
        cy.get('#user_role').contains('admin').should('be.visible')
        cy.get('#user_role').select('manager')
        cy.get('#user_password').clear().type('admin123')
        cy.get('#user_password_confirmation').clear().type('admin123')
        cy.log('save user details')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"User was successfully created.")
    }) 

    it('verify editing user details',() =>
     {
        cy.visit('/users')
        cy.log('click the 1st user in the list')
        cy.get('table>tbody>tr').contains('automate@localhost').click()
        cy.log('change user role')
        cy.get('#user_role').select('viewer')
        cy.get('input[type="submit"]').click()
        cy.get('div#toast-container').should('have.text',"User was successfully updated.")
    })
    it('verify delete user account',() =>
     {  
        cy.visit('/users') 
        cy.log('click delete button for an user')
        cy.get('table>tbody>tr').contains('automate@localhost').get('[data-title="Delete User automate@localhost"]').click()
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"User was successfully destroyed.")
    })

        afterEach(function(){
        cy.logOut()
        })
    
})
