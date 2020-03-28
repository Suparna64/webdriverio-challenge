BasePage = require ('../pages/base.page')
WebTablesPage = require ('../pages/webtables.page')

class AddUserForm {
    cellPhoneField = `[name='Mobilephone']`
    emailField = `[name='Email']`
    firstNameField = `[name='FirstName']`
    lastNameField = `[name='LastName']`
    passwordField = `[name='Password']`
    customerAAARadioOption = `//label[text()='Company AAA']`
    customerBBBRadioOption = `//label[text()='Company BBB']`
    roleDropDownMenu = `[name='RoleId']`
    saveButton = '.btn-success'
    usernameField = `[name='UserName']`

    fillAddUserForm(firstName, username, role, cellphone, lastName, password, customer, email) {
        BasePage.setElementValue(this.firstNameField, firstName)

        // App Bug2 - If you've created a user, then click Add User, the form is populated with the previous user's data
        // Consider updating this code when the bug is fixed
        if (browser.$(this.usernameField).getValue() !== username) {
            console.log('WARNING ===> Add new user form has existing data!!!')
        }

        BasePage.setElementValue(this.usernameField, username)
        BasePage.selectFromDropDownMenu(this.roleDropDownMenu, role)
        BasePage.setElementValue(this.lastNameField, lastName)
        BasePage.setElementValue(this.passwordField, password)
        BasePage.setElementValue(this.emailField, email)

        // App Bug3 - The Edit User dialog doesn't display the cellphone field, preventing the user from changing the number
        // fillAddUserForm() now only interacts with the field if it's present
        // Once the bug is fixed, consider updating fillAddUserForm()
        if(cellphone) {
            BasePage.setElementValue(this.cellPhoneField, cellphone)
        }

        // Customer isn't a required field, if it's not passed we don't want a failure
        // If it is passed, we want to handle it
        if (customer) {
            this.selectRadioOption(customer)
        }
    }

    saveUser() {
        BasePage.clickElement(this.saveButton)
    }

    selectRadioOption(customer){
        if (customer === "Company AAA") {
            BasePage.clickElement(this.customerAAARadioOption)
        } else {
            BasePage.clickElement(this.customerBBBRadioOption)
        }
    }
}

module.exports = new AddUserForm()