/*
	Описание теста: Проверка страницы /o-kompanii/
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.about.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('О компании', function() {
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
								ignoreElements: [query.about.video]
							})
							.pause(2000)

							//Open modal
							.click(query.about.getModalBtn)
							.pause(1500)
							.assertView('formEmpty', query.about.modal, mainConfig.tolerance)

							//check validation
							.click(query.about.modalBtn)
							.pause(1000)
							.assertView(
								'formInvalidation',
								query.about.modal,
								mainConfig.tolerance
							)

							//Set name
							.setValue(query.about.name, 'GEROME')

							//Check false phone/mail
							.insertPhone(query.about.phone, false, fakeData.phoneFalse)
							.setValue(query.about.mail, fakeData.mailFalse)
							.click(query.about.modalBtn)
							.pause(1000)
							.assertView(
								'formInvalidationMailPhone',
								query.about.modal,
								mainConfig.tolerance
							)

							//Check true phone/mail
							.insertPhone(query.about.phone, false, fakeData.phoneTrue)
							.setValue(query.about.mail, fakeData.mailTrue)
							.setValue(query.about.text, fakeData.comment)
							.click(query.about.modalBtn)

							//check modal
							.pause(3500)
							.assertView('modal', query.about.modalTrue, {
								...mainConfig.tolerance
							})
							.click(query.about.modalTrueBtn)
							.pause(2000)
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
