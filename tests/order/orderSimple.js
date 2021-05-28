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

describe('Order', function() {
	beforeEach(function(done) {
		//return jsonData;
	})
	it('orderSimple', function() {
		const generatePhone = require('@api/methods/system/generatePhone.js')
		let generatePhoneVal = generatePhone()
		let browser = this.browser
		return browser
			.url(mainConfig.server.urls.test + '?new')
			.url(mainConfig.server.urls.test + '?ISTEST')
			.windowHandleSize({width: 1920, height: 1024})
			.waitForExist('.page', 50000)
			.pause(2000)
			.scroll(query.contract)
			.then(() => {
				//Check all tabs + Cost + Promocode
				return createOrderTabPromo(browser, generatePhoneVal)
			})
			.pause(1500)
			.assertView('modalOrderStart', query.modalOrder, mainConfig.tolerance)
			.click(query.modalOrderBtnSpeed)
			.pause(2000)
			.isElement('.order-success-head', 'Error:Подтверждение заказа')
			.assertView('totalOrder', query.totalOrder, {
				...mainConfig.tolerance,
				ignoreElements: [query.totalOrderPhone]
			})
			.pause(7000)
			.getOrderInfo(generatePhoneVal.phone, false)
			.pause(2000)
	})
})

// hermione gui --update-refs
// selenium-standalone start
