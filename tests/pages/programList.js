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
//const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('program', function() {
			mainConfig.server.program.forEach(el => {
				it('program - ' + el.name, function() {
					let url = serverStateURL + el.url
					let urlParam = el.param ? el.param : ''
					let browser = this.browser
					return (
						browser
							.url(url + '?ISTEST' + urlParam)
							.windowHandleSize({width: 1920, height: 1024})
							.waitForExist('.page', 50000)
							//.deleteCookie()

							.pause(6000)
							.selectorExecute('.modal-filter', function(el) {
								return el[0].setAttribute('style', 'background-color: black;')
							})
							.assertView('program - ' + el.name, '.page', {
								...mainConfig.tolerance,
								ignoreElements: [
									'.program-days',
									'.program-el',
									'.size',
									'.schedule-list',
									'.header',
									'.footer',
									'.js-header-banner-newclient'
								]
							})
							//check advant
							.isVisible(query.advantHasPopUp)
							.then(data => {
								if (data[0]) {
									console.log(data[0])
									return browser.$$(query.advant).then(data => {
										return (async data => {
											for (let item of data) {
												await browser
													.element(
														`${item.selector}:nth-child(${item.index + 1})`
													)
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
								} else {
									return data
								}
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
							.pause(3000)
							//create order
							.isElement(query.fullOrder.orderTitle, 'Error:Оформление заказа')
							.pause(1000)
							.setValue(query.fullOrder.name, 'GEROME')
							.click(query.fullOrder.btnConfirm)
							.pause(2000)

							.isElement('.order-success-head', 'Error:Подтверждение заказа')
							.assertView('totalOrder', query.totalOrder, {
								...mainConfig.tolerance,
								ignoreElements: [query.totalOrderPhone]
							})
							.pause(7000)
							.then(data => {
								return (async data => {
									for (let item in mainConfig.server.couponUrlList) {
										let coupon = mainConfig.server.couponUrlList[item]
										await browser
											.url(url + '?ISTEST' + coupon.value)
											.waitForExist('.page', 50000)
											.pause(6000)
											.assertView(
												'mainBanner - ' + coupon.name,
												query.mainBanner,
												mainConfig.tolerance
											)
											.assertView(
												'programListBanner - ' + coupon.name,
												query.programListBanner,
												mainConfig.tolerance
											)
											.assertView(
												'programContract - ' + coupon.name,
												query.contractNav,
												mainConfig.tolerance
											)
									}
								})(data)
							})
							.deleteCookie()
							.then(() => {
								console.log(`=== TEST PROGRAM/${el.name} END TRUE ===`)
							})
						//.getOrderInfo(generatePhoneVal.phone, false)
						//check cost coupon
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
