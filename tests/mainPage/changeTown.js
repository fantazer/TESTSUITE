let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/mainPage/header.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('Header', function() {
			it('changeTown', function() {
				let browser = this.browser
				return (
					browser
						.url(serverStateURL)
						.waitForExist(query.changeTown.changeTownStart, 50000)
						.selectorExecute('.modal-filter', function(el) {
							return el[0].setAttribute('style', 'background-color: black;')
						})
						//Проверка текущего города
						.getText(query.changeTown.changeTownStartName)
						.then(function(text) {
							mainConfig.assert.equal(text, 'Москва')
						})
						.assertView(
							'changeTownHeaderMSK',
							query.main.header,
							mainConfig.tolerance
						)

						//Открытие окна
						.click(query.changeTown.changeTownStart)
						.pause(3000)
						.assertView(
							'changeTownModalMSK',
							query.changeTown.changeTownModal,
							mainConfig.tolerance
						)

						//Проверка города куда
						.getText(query.changeTown.changeTownModalTitle)
						.then(function(text) {
							mainConfig.assert.equal(text, 'Вы в Санкт-Петербурге?')
						})

						//Отмена действия
						.click(query.changeTown.changeTownModalFalse)
						.pause(3000)

						//Новое открытие окна
						.click(query.changeTown.changeTownStart)
						.pause(3000)

						//Смена города
						.click(query.changeTown.changeTownModalTrue)
						.pause(3000)
						.getUrl()
						.then(data => {
							//data = data.replace(/\/oct\/|\/\?newsite/gi, '')
							//console.log(data)
							mainConfig.assert.equal(data, serverState.urlSPB)
						})

						.selectorExecute('.modal-filter', function(el) {
							return el[0].setAttribute('style', 'background-color: black;')
						})
						.getText(query.changeTown.changeTownStartName)
						.then(function(text) {
							mainConfig.assert.equal(text[0], 'Санкт-Петербург')
						})
						.assertView(
							'changeTownHeaderSPB',
							query.main.header,
							mainConfig.tolerance
						)

						//Возврат обратно в МСК
						//Открытие окна
						.url(serverStateURL + '?ISTEST')
						.pause(9000)
						.click(query.changeTown.changeTownStart)
						.pause(3000)
						.assertView(
							'changeTownModalSPB',
							query.changeTown.changeTownModal,
							mainConfig.tolerance
						)
						.pause(3000)
						.click(query.changeTown.changeTownModalTrue)
						.pause(3000)
						.then(() => {
							console.log('=== TEST Header/changeTown END TRUE ===')
						})
				)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
