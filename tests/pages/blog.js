/*
	Описание теста: Проверка страницы /blog/
	- Скрин всей страницы
	- Проверка всех тегов
	- Проверка полей формы на валидацию
	- Отправка формы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.blog.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('БлогСписок', function() {
					let browser = this.browser
					return (
						browser
							.url(serverStateURL)
							.url(serverStateURL + '?ISTEST')
							.windowHandleSize({width: 1920, height: 1024})
							.waitForExist('.page', 50000)
							.pause(2000)
							//Check all tags
							/*.$$(query.blog.list)
				.then(data => {
					return (async data => {
						for (let item of data) {
							await browser
								.element(`${item.selector}:nth-child(${item.index + 1})`)
								.click()
								.pause(2000)
								.assertView('TAG - ' + (item.index + 1), '.content', {
									...mainConfig.tolerance
								})
						}
					})(data)
				})*/
							.pause(2000)
							//Check false form
							.click(query.blog.formBtn)
							.pause(2000)
							.assertView('formFalse', query.blog.form, mainConfig.tolerance)
							.pause(1000)
							//Set name
							.setValue(query.blog.mail, fakeData.mailTrue)
							.pause(1000)
							.click(query.blog.formBtn)
							//check modal
							.pause(2500)
							.assertView('modal', query.blog.modalTrue, {
								...mainConfig.tolerance
							})
							.click(query.blog.modalTrueBtn)
							.pause(2000)
							.assertView('finish', query.blog.form, {
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
