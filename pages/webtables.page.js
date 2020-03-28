shortid = require ('shortid')

AddUserForm = require ('../pages/webtables.addUser.form')
BasePage = require ('../pages/base.page')

class WebTablesPage {
    addUserButton = `[type='add']`
    deleteConfirmOkButton = ".btn-primary"
    deleteUserButton = '.icon-remove'
    editUserButton = `[type='edit']`
    advancePageButton = `//a[text()='>']`
    tableRow = 'tbody tr'

    openPage () {
        browser.url('/angularjs-protractor/webtables/')
    }

    advancePageResults() {
        BasePage.clickElement(this.advancePageButton)
    }

    // Only First Name, username, role and cellphone are required
    createUser(firstName, username, role, cellphone, lastName, password, customer, email) {
        BasePage.clickElement(this.addUserButton)
        AddUserForm.fillAddUserForm(firstName, username, role, cellphone, lastName, password, customer, email)
        AddUserForm.saveUser()
    }
    createMultipleGenericUsers(numberOfGenericUsers) {
        for (let numberOfGenericUsersLeftToCreate = 0; numberOfGenericUsersLeftToCreate < numberOfGenericUsers; numberOfGenericUsersLeftToCreate++) {
            let uniqueId = shortid.generate()
            this.createUser(`user${numberOfGenericUsersLeftToCreate+1}`, `${uniqueId}`, 'Sales Team', '8017224938')
            expect(this.searchTableRowsForUser(`${uniqueId}`)).to.be.true
        }
    }

    editUser(firstName, username, role) {
        if (this.searchTableRowsForUser(username) === true) {
            BasePage.clickElement(this.editUserButton)
            AddUserForm.fillAddUserForm(firstName, username, role)
            AddUserForm.saveUser()
        } else {
            console.log (`Could not edit ===> ${username} because they were not found`)
        }
    }

    removeUser(username) {
        if (this.searchTableRowsForUser(username) === true) {
            BasePage.clickElement(this.deleteUserButton)
            BasePage.clickElement(this.deleteConfirmOkButton)
        } else {
            console.log (`Could not delete ===> ${username} because they were not found`)
        }
    }

    searchTableRowsForUser(username) {
        let userFound = false
        const tableRows = browser.$$(this.tableRow)
        for (let row = 0; row < tableRows.length; row++) {
            let rowText = tableRows[row].getText()
            if (rowText.includes(username)) {
                console.log(`Found user ===> ${username} on row ${row + 1} of the table `)
                userFound = true
                break
            } else {
                console.log(`Did not find ===> ${username}`)
            }
        }
        return userFound
    }
}

module.exports = new WebTablesPage()