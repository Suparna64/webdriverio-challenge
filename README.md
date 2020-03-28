# WebdriverIO Challenge

Created in response to a quick automation challenge to validate the [way2automation](http://www.way2automation.com/angularjs-protractor/webtables/) website.

#### Pre-reqs
Node.js - How to install node on [Windows](https://nodejs.org/en/) or [Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)

#### Setup
```
git clone git@github.com:sirdavesmith/webdriverio-challenge.git
cd webdriverio-framework
npm install
```

#### Running the Tests
`npm run test`

Note: multiple environments are supported, run with `npm run test-<env>` envs: [local | dev | qe | stage]

If [way2automation](http://www.way2automation.com/angularjs-protractor/webtables/) really used different urls, those would be updated in config/environments 

#### The Challenge
Write automation that validates 2 user actions of the a [way2automation](http://www.way2automation.com/angularjs-protractor/webtables/) website.

User actions to automate:
1. Add a user and validate the user has been added to the table
2. Delete user username: novak and validate user has been deleted

#### Tech leveraged
JavaScript, WebdriverIO, Mocha, Chai - additional details noted in package.json 

#### The approach and thought process
This framework was built with one goal in mind, keep things lightweight.

Page objects, mock data, environments and unique id generation were leveraged for their reusability, readability
and organization. Each test is atomic, ensuring it's isolated and does not rely on or get affected by the setup or 
execution results of a previous test. As a best practice, we would leverage database migrations, service layer calls
or perhaps local storage to do test setup and teardown. However, the [site under test](http://www.way2automation.com/angularjs-protractor/webtables/)
does not use cookies, local storage or network calls to a service or database. Therefore, test setup is done through the UI.

Both test scenarios require table validation and reusing search functions to traverse results. The second 
scenario asks us to delete a specific user. Each time we open or refresh our [site under test](http://www.way2automation.com/angularjs-protractor/webtables/),
the app starts in a clean state. We could delete the specific user: novak, but in the real world we shouldn't be hoping our app's
data is in the state we need it to be in. Therefore, we do test setup including creating a user we want to delete, then 
we delete that user, underscoring our need for atomic tests.
