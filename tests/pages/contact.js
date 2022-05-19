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
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.contact.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('Контакты', function() {
					let browser = this.browser
					return (
						browser
							.url(serverStateURL)
							.url(serverStateURL + '?ISTEST')
							.windowHandleSize({width: 1920, height: 1024})
							.waitForExist('.page', 50000)
							.selectorExecute('.modal-filter', function(el) {
								return el[0].setAttribute('style', 'background-color: black;')
							})
							.pause(2000)
							.assertView('page', '.content', {
								...mainConfig.tolerance,
								ignoreElements: [query.contact.map]
							})
							//Сheck request form
							.click(query.contact.formBtn)
							.pause(1000)
							.assertView(
								'formInvalidation',
								query.contact.form,
								mainConfig.tolerance
							)

							//Set name
							.setValue(query.contact.name, 'GEROME')

							.setValue(query.contact.mail, fakeData.mailTrue)
							.setValue(query.contact.text, fakeData.comment)
							.click(query.contact.formBtn)

							//check modal
							.pause(3500)
							.assertView('modal', query.contact.modalTrue, {
								...mainConfig.tolerance
							})
							.click(query.contact.modalTrueBtn)
							.pause(2000)

							//finish
							.assertView('end', '.header', {
								...mainConfig.tolerance
							})
							.pause(1000)
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
