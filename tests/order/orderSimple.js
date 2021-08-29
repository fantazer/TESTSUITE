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
				const generatePhone = require('@api/methods/system/generatePhone.js')
				let generatePhoneVal = generatePhone()
				let browser = this.browser
				return (
					browser
						.url(serverStateURL + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1024})
						.waitForExist('.page', 50000)
						.pause(2000)
						.scroll(query.contract)
						.then(() => {
							//Check all tabs + Cost + Promocode
							return createOrderTabPromo(browser, generatePhoneVal.phone)
						})
						.pause(3500)
						.click(query.modalOrderBtnSpeed)
						.pause(3000)
						//.isElement('.order-success-head', 'Error:Подтверждение заказа')
						.assertView('totalOrder', query.totalOrder, {
							...mainConfig.tolerance,
							ignoreElements: [query.totalOrderPhone]
						})
						.pause(7000)
						.getUser(generatePhoneVal.phone, false)
						.regUser(generatePhoneVal.phone, false)
						.getOrderInfo(generatePhoneVal.phone, false)
						.pause(2000)
				)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
// webdriver-manager start
