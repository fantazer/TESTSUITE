/*
	Описание теста: Проверка страницы /contact/
	- Скрин всей страницы
	- Проверка формы заявки
	- все поля пустые
	- неверный телефон
	- все поля заполнены
	- отправи формы
	- Проверка окна успеха
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.bonus.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			it('Бонусы', function() {
				let browser = this.browser
				return browser
					.url(serverStateURL + '?ISTEST')
					.waitForExist('.page', 50000)
					.pause(2000)
					.assertView('page', '.page', {
						...mainConfig.tolerance
					})
					.pause(1000)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
