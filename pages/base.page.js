class BasePage {
    clickElement(selector) {
        browser.$(selector).waitForDisplayed()
        browser.$(selector).click()
        console.log('Clicked ===> ', selector)
    }

    setElementValue(selector, value) {
        browser.$(selector).waitForDisplayed()
        browser.$(selector).setValue(value)
        console.log('Set value for ===> ', selector)
    }

    selectFromDropDownMenu(selector, selection) {
        browser.$(selector).waitForDisplayed()
        browser.$(selector).selectByVisibleText(selection)
    }
}

module.exports = new BasePage()