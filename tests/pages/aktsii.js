/*
	Описание теста: Проверка страницы /aktsii/
	- Скрин всей страницы
	- Вызов подробной акции
	- Скрин модального окна
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
let urlPage = mainConfig.server.urls.test + mainConfig.server.pages.sale.url
describe('Pages', function() {
	it('Акции', function() {
		let browser = this.browser
		return (
			browser
				.url(urlPage)
				.url(urlPage + '?ISTEST')
				.windowHandleSize({width: 1920, height: 1024})
				.waitForExist('.page', 50000)
				.pause(2000)
				.assertView('page', '.page', mainConfig.tolerance)
				//Check all tabs + Cost + Promocode
				.click(query.aktsii.getModal)
				.pause(2000)
				.assertView('modal', '.modal-layer', mainConfig.tolerance)
				.pause(2000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
