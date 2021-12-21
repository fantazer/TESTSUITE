/*
	Описание теста: Проверка страницы /faq/
	- Скрин всей страницы
	- Проверка всех табов с раскрытием первого
	- Проверка полей формы на валидацию
	- Отправка формы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

let serverState = mainConfig.server.stateTest['production']
let serverStateURL = serverState.url
describe(serverState.name, function() {
	describe('Scenario', function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		it('allPageCheckProgram', function() {
			let browser = this.browser
			return browser
				.url(serverStateURL)
				.url(serverStateURL + '?ISTEST')
				.windowHandleSize({width: 1920, height: 1024})
				.waitForExist('.page', 50000)
				.then(data => {
					return (async data => {
						for (let item of mainConfig.server.program) {
							await browser
								.url(serverStateURL + item.url + '?ISTEST')
								.waitForExist('.program-list-container', 50000)
								.pause(3000)
								.$$('.program-el')
								.then(data => {
									if (data.length < 2) {
										console.log(`=== PROGRAM ${item.name} FALSE!!!! ===`)
									} else {
										console.log(`=== PROGRAM ${item.name} TRUE ===`)
									}
								})
						}
					})(data)
				})
			/*.then(data => {
					mainConfig.server.program.forEach(async el => {
						await browser
							.url(serverStateURL + el.url + '?ISTEST')
							.waitForExist('.page', 50000)
							.pause(5000)
							.$('#program')
							.getCssProperty('height')
							.then(data => {
								if (parseInt(data.value) < 10000) {
									console.log(`=== PROGRAM ${el.name} FALSE!!!! ===`)
								} else {
									console.log(`=== PROGRAM ${el.name} TRUE ===`)
								}
								return data
							})
					})
				})*/
		})
	})
})
// hermione gui --update-refs
// selenium-standalone start
