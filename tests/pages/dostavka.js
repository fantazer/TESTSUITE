/*
	Описание теста: Проверка страницы /dostavka/
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.delivery.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			it('Доставка', function() {
				let browser = this.browser
				return browser
					.url(serverStateURL)
					.url(serverStateURL + '?ISTEST')
					.windowHandleSize({width: 1920, height: 1024})
					.waitForExist('.page', 50000)
					.pause(2000)
					.assertView('page', '.page', mainConfig.tolerance)
					.pause(2000)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
