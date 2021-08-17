/*
	Описание теста: Проверка цен в фиксированной шапке
	- Скрол для появления шапки
	- Перебор всех програм + скрин
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/mainPage/header.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		describe('Header', function() {
			it('fixHeader', function() {
				let browser = this.browser
				return browser
					.url(serverStateURL)
					.windowHandleSize({width: 1920, height: 1200})
					.waitForExist('.page', 50000)
					.pause(1000)
					.scroll(query.fixHeader.initScrollEl)
					.pause(1000)
					.then(data => {
						return (async data => {
							for (let i = 1; i <= 12; ++i) {
								await browser
									.click(query.fixHeader.dropMenu)
									.pause(1500)
									.click(`${query.fixHeader.dropMenuEL}:nth-child(${i})`)
									.pause(2000)
									.assertView(
										i + ' - Program',
										query.fixHeader.headerContent,
										mainConfig.tolerance
									)
							}
						})(data)
					})
					.then(() => {
						console.log('=== TEST Header/fixHeader END TRUE ===')
					})
			})
		})
	})
}
