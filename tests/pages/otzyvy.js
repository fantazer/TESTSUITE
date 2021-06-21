/*
	Описание теста: Проверка страницы /otzyvy/
	- Скрин всей страницы
	- Вызов подробной акции
	- Скрин модального окна
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

describe('Pages', function() {
	it('Отзывы', function() {
		const generatePhone = require('@api/methods/system/generatePhone.js')
		let generatePhoneVal = generatePhone()
		let browser = this.browser
		return (
			browser
				.url(mainConfig.server.urls.test + mainConfig.server.pages[2].url)
				.url(
					mainConfig.server.urls.test +
						mainConfig.server.pages[2].url +
						'?ISTEST'
				)
				.windowHandleSize({width: 1920, height: 1024})
				.waitForExist('.page', 50000)
				.pause(1000)
				.assertView('page', '.page', mainConfig.tolerance)
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
				.assertView('selectProgram', query.otzyvy.form, {
					...mainConfig.tolerance
				})
				.pause(1000)
				//Set Select Programs
				.click(query.otzyvy.selectVal)
				.pause(1000)
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

// hermione gui --update-refs
// selenium-standalone start
