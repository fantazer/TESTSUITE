/*
	Описание теста: Проверка страницы /retail/
	- Скрин всей страницы
	- Расскрытие всех блюд
	- Проверка формы на валидацию
	- Ввод Имени
	- Ввод неправильного телефона
	- Ввод правильного телефона
	- Ввод сообщения
	- Отправка формы
	- Модальное окно о согласии
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.retail.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('Ретеил', function() {
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
							.pause(1000)
							.assertView('page', '.page', mainConfig.tolerance)
							//Check more dish
							//.click(query.retail.showMoreDish)
							//.pause(2000)
							//.assertView('pageMoreDish', '.page', mainConfig.tolerance)
							//Check false form
							.click(query.retail.formBtn)
							.pause(1000)
							.assertView('formFalse', query.retail.form, mainConfig.tolerance)
							.pause(1000)
							//Set name
							.setValue(query.retail.name, 'GEROME')
							//Check false|true phone
							.insertPhone(query.retail.phone, false, fakeData.phoneFalse)
							.pause(1500)
							.click(query.retail.formBtn)
							.pause(1500)
							.assertView('falsePhone', query.retail.form, {
								...mainConfig.tolerance
							})
							.insertPhone(query.retail.phone, false, fakeData.phoneTrue)
							.pause(1000)

							.setValue(query.retail.text, fakeData.comment)
							.click(query.retail.formBtn)
							.pause(2000)
							.assertView('modal', query.retail.modalTrue, {
								...mainConfig.tolerance
							})
							.click(query.retail.modalTrueBtn)
							.pause(2000)
							.assertView('finish', query.retail.form, {
								...mainConfig.tolerance
							})
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
