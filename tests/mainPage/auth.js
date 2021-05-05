/*
	Описание теста: Проверка Авторизации
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))();

const config = require('@config/config.json');
const query = require('@querySelector/mainPage/header.json');
const url = config.urls.client;

describe('Header', function () {
		it("Auth", function () {
		let browser = this.browser
		return browser.url(url.root)
				.waitForExist(query.auth.authStart, 50000)
				.click(query.auth.authStart)
				.pause(2000)
				//Ввод телефона
				.assertView("enterAuth", query.auth.authModal,mainConfig.tolerance)
				.setValue(query.auth.authPhoneInput, "001000000")
				.pause(1000)
				.click(query.auth.authPhoneSendBtn)
				//Ввод Имени
				.isElement(query.auth.authNameInput,"test isElement")
				.pause(2000)
				.assertView("authModalName", query.auth.authModalName,mainConfig.tolerance)
				.setValue(query.auth.authNameInput,'GEROME')
				.click(query.auth.authNameSendBtn)
				.pause(1000)
				//Ввод кода из CMC
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