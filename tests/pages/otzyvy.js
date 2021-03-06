/*
	Описание теста: Проверка страницы /otzyvy/
	- Скрин всей страницы
	- Проверка формы на валидацию
	- Ввод Имени
	- Ввод неправильного телефона
	- Ввод правильного телефона
	- Выбор программы
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
	let serverStateURL = serverState.url + mainConfig.server.pages.review.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('Отзывы', function() {
					const generatePhone = require('@api/methods/system/generatePhone.js')
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
							.assertView('page', '.content', mainConfig.tolerance)
							//Check false form
							.click(query.otzyvy.formBtn)
							.pause(1000)
							.assertView('formFalse', query.otzyvy.form, mainConfig.tolerance)
							.pause(1000)
							//Set name
							.setValue(query.otzyvy.name, 'GEROME')
							//Check false|true phone
							.insertPhone(query.otzyvy.phone, false, fakeData.phoneFalse)
							.pause(1500)
							.click(query.otzyvy.formBtn)
							.pause(1500)
							.assertView('falsePhone', query.otzyvy.form, {
								...mainConfig.tolerance
							})
							.insertPhone(query.otzyvy.phone, false, fakeData.phoneTrue)
							.pause(1000)
							//Open Select Programs
							.click(query.otzyvy.select)
							.pause(1000)
							.assertView('selectProgram', query.otzyvy.form, {
								...mainConfig.tolerance
							})
							.pause(2000)
							//Set Select Programs
							.click(query.otzyvy.selectVal)
							.pause(2000)
							.assertView('selectProgramChange', query.otzyvy.form, {
								...mainConfig.tolerance
							})
							.setValue(query.otzyvy.text, fakeData.comment)
							.click(query.otzyvy.formBtn)
							.pause(2000)
							.assertView('modal', query.otzyvy.modalTrue, {
								...mainConfig.tolerance
							})
							.click(query.otzyvy.modalTrueBtn)
							.pause(2000)
							.assertView('finish', query.otzyvy.form, {
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
