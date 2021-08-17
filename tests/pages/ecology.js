/*
	Описание теста: Проверка страницы /ecology/
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.ecology.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			it('Экология', function() {
				let browser = this.browser
				return browser
					.url(serverStateURL)
					.url(serverStateURL + '?ISTEST')
					.windowHandleSize({width: 1920, height: 1024})
					.waitForExist('.page', 50000)
					.pause(2000)
					.assertView('page', '.page', {
						...mainConfig.tolerance,
						ignoreElements: [query.ecology.video, query.ecology.map]
					})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
