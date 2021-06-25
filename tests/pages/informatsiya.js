/*
	Описание теста: Проверка страницы /informatsiya/
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
let urlPage =
	mainConfig.server.urls.test + mainConfig.server.pages.cooperation.url
describe('Pages', function() {
	it('Сотрудничество', function() {
		let browser = this.browser
		return browser
			.url(urlPage)
			.url(urlPage + '?ISTEST')
			.windowHandleSize({width: 1920, height: 1024})
			.waitForExist('.page', 50000)
			.pause(2000)
			.assertView('page', '.page', mainConfig.tolerance)
			.pause(2000)
	})
})

// hermione gui --update-refs
// selenium-standalone start
