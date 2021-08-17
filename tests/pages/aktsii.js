/*
	Описание теста: Проверка страницы /aktsii/
	- Скрин всей страницы
	- Вызов подробной акции
	- Скрин модального окна
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.sale.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			//hermione.only.in('clientChromeMobile')
			it('Акции', function() {
				let browser = this.browser
				return (
					browser
						.url(serverStateURL)
						.url(serverStateURL + '?ISTEST')
						.isExisting('#notVisible')
						.then(data => {
							console.log(data)
						})
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
	})
}
// hermione gui --update-refs
// selenium-standalone start
