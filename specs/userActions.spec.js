shortid = require ('shortid')

AddUserForm = require ('../pages/webtables.addUser.form')
WebTablesPage = require ('../pages/webtables.page')

userData = require('../mockData/users')

describe('User Actions', function () {
    // Each time we open/refresh the page, our app starts in a clean state
    beforeEach(() => {
        WebTablesPage.openPage()
    })

    // App Bug1 - The Add User dialog only indicates the First Name and Role as required
    // However, the minimum required fields are: First Name, username, role, cellphone
    // We should update this tests when the bug is fixed
    it('should allow us to create a user with the minimum required form fields', () => {
        // Create the user
        newUser = userData.minRequiredFieldsUser
        WebTablesPage.createUser(newUser.firstName, newUser.username, newUser.role, newUser.cellphone)

        // Validate it was created
        expect(WebTablesPage.searchTableRowsForUser(newUser.username)).to.be.true
    })

    it('should update pagination when we have 11 or more user results', () => {
        // Setup - Initially, our app has 7 users and we need to create at least 4 more to pass the 10 result threshold for pagination
        WebTablesPage.createMultipleGenericUsers(4)

        // Move to the next page
        // This would fail if we only had 1 page instead of the 2 we expect
        WebTablesPage.advancePageResults()
    })

    // App Bug2 - If you've created a user, then click Add User, the form is populated with the previous user's data
    // fillAddUserForm() logs a warning about this and should be updated when the bug is fixed
    it('should allow us to create TWO users with the minimum required form fields', () => {
        // Setup - We need to create a user so that we aren't relying on the state of the app or our previous tests
        newUser = userData.minRequiredFieldsUser
        WebTablesPage.createUser(newUser.firstName, newUser.username, newUser.role, newUser.cellphone)
        expect(WebTablesPage.searchTableRowsForUser(newUser.username)).to.be.true

        // Add a second user
        WebTablesPage.createUser('second', 'seconduser', 'Customer', '8017538223')
        expect(WebTablesPage.searchTableRowsForUser('seconduser')).to.be.true
    })

    it('should allow us to create a user using all form fields', () => {
        newUser = userData.allFieldsUser
        WebTablesPage.createUser(newUser.firstName, newUser.username, newUser.role, newUser.cellphone, newUser.lastName, newUser.password, newUser.customer, newUser.email)
        expect(WebTablesPage.searchTableRowsForUser(newUser.username)).to.be.true
    })

    it('should confirm that users we haven\'t created do not exist in the app', () => {
        expect(WebTablesPage.searchTableRowsForUser('idonotexistintheapp')).to.be.false
    })

    // App Bug3 - The Edit User dialog doesn't display the cellphone field, preventing the user from changing the number
    // fillAddUserForm() now only interacts with the field if it's present
    // Once the bug is fixed, fillAddUserForm() should be updated

    // App Bug4 - If an existing user is edited and the customer value is changed
    // then no value will be displayed under the customer column in the table for the user
    // Table validation should be updated once the bug is fixed
    it('should allow us to edit a user that was created with the minimum required form fields', () => {
        // Setup - We need to create a user so that we aren't relying on the state of the app or our previous tests
        newUser = userData.minRequiredFieldsUser
        WebTablesPage.createUser(newUser.firstName, newUser.username, newUser.role, newUser.cellphone)
        expect(WebTablesPage.searchTableRowsForUser(newUser.username)).to.be.true

        // Edit User
        editedUser = userData.editedMinRequiredFieldsUser
        WebTablesPage.editUser(editedUser.firstName, editedUser.username, editedUser.role)
        expect(WebTablesPage.searchTableRowsForUser(editedUser.username)).to.be.true
    })

    it('should allow us to delete a user', () => {
        // Setup - We need to create a user so that we aren't relying on the state of the app or our previous tests
        newUser = userData.minRequiredFieldsUser
        WebTablesPage.createUser(newUser.firstName, newUser.username, newUser.role, newUser.cellphone)
        expect(WebTablesPage.searchTableRowsForUser(newUser.username)).to.be.true

        // Delete a user
        WebTablesPage.removeUser(newUser.username)

        // Validate the user was deleted
        expect(WebTablesPage.searchTableRowsForUser(newUser.username)).to.be.false
    })

    // App Bug5 - found in App captured in Limelight Health Jira issue5: Deleting a user from any page but the first
    // does NOT actually remove the user from the web table
    // This comment or code can be updated once the issue is fixed
    it.skip('should allow us to delete a user from ANY page', () => {
        // Setup - Initially, our app has 7 users and we need to create at least 4 more to pass the 10 result threshold for pagination
        WebTablesPage.createMultipleGenericUsers(4)
        WebTablesPage.advancePageResults()

        // Delete the user from page 2
        WebTablesPage.removeUser('testsale')

        // This validation code works as expected, however App Bug5 causes this to fail
        // To see the issue, add a browser.pause(3000) before WebTabPage.removeUser() and then one after
        // Once the issue is fixed in the app, this can be uncommented
        // Validate the user was deleted
        // expect(WebTablesPage.searchTableRowsForUser('testsale')).to.be.false
    })
})
