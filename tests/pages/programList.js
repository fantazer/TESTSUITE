/*
	Описание теста: Проверка всех подробных страниц программ
	- Скрин всей страницы
	- Обход по всем размерностям дней
	- Обход по всем размерностям + промокод
	- Оформление заказа
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')
const createOrderTabPromo = require('@api/methods/order.js')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('program', function() {
			mainConfig.server.program.forEach(el => {
				it('program - ' + el.name, function() {
					let browser = this.browser
					return (
						browser
							.url(serverStateURL + el.url + '?ISTEST')
							.windowHandleSize({width: 1920, height: 1024})
							.waitForExist('.page', 50000)
							//.deleteCookie()
							.pause(2000)
							.assertView('program - ' + el.name, '.page', {
								...mainConfig.tolerance,
								ignoreElements: [
									'.program-days',
									'.program-el',
									'.size',
									'.schedule-list'
								]
							})
							//check advant
							.$$(query.advant)
							.then(data => {
								return (async data => {
									for (let item of data) {
										await browser
											.element(`${item.selector}:nth-child(${item.index + 1})`)
											.click()
											.pause(2000)
											.assertView(
												'advant - ' + (item.index + 1),
												query.advantBlockModal,
												{
													...mainConfig.tolerance
												}
											)
											.click(query.advantBlockModalClose)
									}
								})(data)
							})
							.scroll(query.contract)
							.pause(1000)
							//Check all tabs + Cost + Promocode
							.then(() => {
								return createOrderTabPromo(browser, [
									5,
									5,
									5,
									4,
									4,
									4,
									4,
									5,
									5,
									5
								])
							})
							//.getUser(generatePhoneVal.phone, false)
							//.regUser(generatePhoneVal.phone, false)
							.pause(1500)
							.assertView(
								'modalOrderStart',
								query.modalOrder,
								mainConfig.tolerance
							)
							.click(query.modalOrderBtnSpeed)
							.isElement('.order-success-head', 'Error:Подтверждение заказа')
							.assertView('totalOrder', query.totalOrder, {
								...mainConfig.tolerance,
								ignoreElements: [query.totalOrderPhone]
							})
							.pause(2000)
							.deleteCookie()
							//.getOrderInfo(generatePhoneVal.phone, false)
							.pause(2000)
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
