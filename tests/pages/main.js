/*
	Описание теста: Проверка страницы /aktsii/
	- Скрин всей страницы
	- Вызов подробной акции
	- Скрин модального окна
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	describe(serverState.name, function() {
		describe('Pages', function() {
			it('Главная', function() {
				let browser = this.browser
				return (
					browser
						.url(serverState.url)
						.url(serverState.url + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1024})
						.waitForExist('.page', 50000)
						.pause(2000)
						//Check all advant
						.$$(query.main.advantBlock)
						.then(data => {
							return (async data => {
								for (let item of data) {
									await browser
										.element(`${item.selector}:nth-child(${item.index + 1})`)
										.click()
										.pause(2000)
										.assertView(
											'advant - ' + (item.index + 1),
											query.main.advantBlockModal,
											{
												...mainConfig.tolerance
											}
										)
										.click(query.main.advantBlockModalClose)
								}
							})(data)
						})
						//Check all sales
						.$$(query.main.saleBlock)
						.then(data => {
							return (async data => {
								for (let item of data) {
									await browser
										.element(`${item.selector}:nth-child(${item.index + 1})`)
										.click()
										.pause(2000)
										.assertView(
											'sale - ' + (item.index + 1),
											query.main.saleBlockModal,
											{
												...mainConfig.tolerance
											}
										)
										.click(query.main.advantBlockModalClose)
								}
							})(data)
						})
						.pause(2000)
						.insertPhone(query.main.callBackInput, false, fakeData.phoneTrue)
						.click(query.main.callBackBnt)
						.pause(3000)
						.assertView('callbackModal', query.main.callBackModal, {
							...mainConfig.tolerance
						})
						.click(query.main.callBackModalBtn)
						.assertView('seoTextBlock', query.main.seoTextCont, {
							...mainConfig.tolerance
						})
						.click(query.main.seoTextContBtn)
						.pause(2000)
						.assertView('seoTextBlockOpen', query.main.seoTextCont, {
							...mainConfig.tolerance
						})
				)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
