/*
	Описание теста: Проверка страницы /aktsii/
	- Скрин всей страницы
	- Вызов подробной акции
	- Скрин модального окна
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')

describe('Pages', function() {
	it('Акции', function() {
		let browser = this.browser
		return (
			browser
				.url(mainConfig.server.urls.test + mainConfig.server.pages[1].url)
				.url(
					mainConfig.server.urls.test +
						mainConfig.server.pages[1].url +
						'?ISTEST'
				)
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
