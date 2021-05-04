let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))();

const config = require('@config/config.json');
const query = require('@querySelector/mainPage/header.json');
const url = config.urls.client;

describe('mainPage2', function () {
		it("callBack", function () {
		let browser = this.browser
		return browser.url(url.root)
				.waitForExist(query.callBack, 50000)
				.click(query.callBack)
				.pause(5000)
	});

});

// hermione gui --update-refs
// selenium-standalone start