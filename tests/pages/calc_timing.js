/*
	Описание теста: Проверка страницы /calc_timing/
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.calcTiming.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			it('Калькулятор времени', function() {
				let browser = this.browser
				return (
					browser
						.url(serverStateURL)
						.url(serverStateURL + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1024})
						.waitForExist('.page', 50000)
						.pause(2000)
						.assertView('page', '.page', mainConfig.tolerance)
						//Check all tabs + Cost + Promocode
						.pause(2000)
				)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
