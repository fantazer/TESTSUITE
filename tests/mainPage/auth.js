let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))();

const config = require('@config/config.json');
const query = require('@querySelector/mainPage/header.json');
const url = config.urls.client;

describe('mainPage', function () {
		it("authModal", function () {
		let browser = this.browser
		return browser.url(url.root)
				.waitForExist(query.auth.authStart, 50000)
				.click(query.auth.authStart)
				.pause(1000)

				.setValue(query.auth.authPhone, "001000000")
				.pause(1000)
				.click(query.auth.authPhoneSendBtn)
				.isElement(query.auth.authName,"test isElement")
				.setValue(query.auth.authName,'GEROME')
				.click(query.auth.authNameSendBtn)
				.pause(1000)
				.getCookie('SmsCode')
				.then((data)=>{
					console.log(data);
				})
				.pause(5000)
				;
	});

});

// hermione gui --update-refs
// selenium-standalone start