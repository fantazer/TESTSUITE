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
let urlPage = mainConfig.server.urls.test + mainConfig.server.pages.faq.url

describe('Pages', function() {
	it('FAQ', function() {
		let browser = this.browser
		return (
			browser
				.url(urlPage)
				.url(urlPage + '?ISTEST')
				.windowHandleSize({width: 1920, height: 1024})
				.waitForExist('.page', 50000)
				.pause(1000)
				.assertView('page', '.page', mainConfig.tolerance)
				.pause(1000)
				//Check all tabs
				.pause(2000)
				.$$(query.faq.list)
				.then(data => {
					return (async data => {
						for (let item of data) {
							await browser
								.element(`${item.selector}:nth-child(${item.index + 1})`)
								.click()
								.pause(1500)
								.click(query.faq.elQuestion)
								.pause(1500)
								.assertView('TAB - ' + (item.index + 1), '.js-tab-wrap', {
									...mainConfig.tolerance
								})
						}
					})(data)
				})
				.pause(2000)
				//Check false form
				.click(query.faq.formBtn)
				.pause(1000)
				.assertView('formFalse', query.faq.form, mainConfig.tolerance)
				.pause(1000)
				//Set name
				.setValue(query.faq.name, 'GEROME')
				//Check false|true phone
				.insertPhone(query.faq.phone, false, fakeData.mailTrue)
				.pause(1000)
				.setValue(query.faq.text, fakeData.comment)
				.click(query.faq.formBtn)
				//check modal
				.pause(1500)
				.assertView('modal', query.faq.modalTrue, {
					...mainConfig.tolerance
				})
				.click(query.faq.modalTrueBtn)
				.pause(2000)
				.assertView('finish', query.faq.form, {
					...mainConfig.tolerance
				})
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
