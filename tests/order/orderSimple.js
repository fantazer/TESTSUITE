/*
	Описание теста:
	- Проверка дефолтной программы
	- Проверка промокода
	- Проверка телефона
	- Проверка всех цен
	- Проверка заказа быстрое оформление
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')
const createOrderTabPromo = require('@api/methods/order.js')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		describe('Order', function() {
			it('orderSimple', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				const generatePhone = require('@api/methods/system/generatePhone.js')
				let generatePhoneVal = generatePhone()
				let browser = this.browser
				return browser
					.url(serverStateURL + '?ISTEST')
					.windowHandleSize({width: 1920, height: 1024})
					.waitForExist('.page', 50000)
					.pause(1000)
					.scroll(query.contract)
					.then(() => {
						//Check all tabs + Cost + Promocode
						return createOrderTabPromo(browser, generatePhoneVal.phone)
					})
					.pause(1500)
					.click(query.modalOrderBtnSpeed)
					.isElement('.order-success-head', 'Error:Подтверждение заказа')
					.assertView('totalOrder', query.totalOrder, {
						...mainConfig.tolerance,
						ignoreElements: [query.totalOrderPhone]
					})
					.pause(5000)
					.getUser(generatePhoneVal.phone, false)
					.regUser(generatePhoneVal.phone, false)
					.getOrderInfo(generatePhoneVal.phone, false)
					.pause(1000)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
// webdriver-manager start
