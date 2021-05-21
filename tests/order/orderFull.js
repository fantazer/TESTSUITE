/*
	Описание теста:
	- Проверка полного заказа
	- Проверка оплата картой
	- Проверка без оплаты
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')

describe('Order', function() {
	beforeEach(function(done) {
		//return jsonData;
	})
	it('orderFull', function() {
		const generatePhone = require('@api/methods/system/generatePhone.js')
		let generatePhoneVal = generatePhone()
		let browser = this.browser
		return (
			browser
				.url(mainConfig.server.urls.test + '?new')
				.url(mainConfig.server.urls.test + '?ISTEST')
				.windowHandleSize({width: 1920, height: 1200})
				.waitForExist('.page', 50000)
				.scroll('#order')

				.assertView('contractForm', query.contract, mainConfig.tolerance)

				//Enter phone
				.getUser(generatePhoneVal.phone, false)

				.insertPhone(query.phoneInput, false, generatePhoneVal.array)

				.pause(1000)
				.isElement(query.orderBtn, 'Error:Начало заказа')
				.isElement(query.modalOrder, 'Error:Ожидаю окно')
				.pause(1500)
				.assertView('modalOrderStart', query.modalOrder, mainConfig.tolerance)
				.click(query.modalOrderBtnNormal)
				.pause(2000)
				.isElement('#order-full .title.title--xl', 'Error:Подтверждение заказа')
				.assertView('totalOrder', query.totalOrder, {
					...mainConfig.tolerance,
					ignoreElements: [query.regFullOrderPhone]
				})
				.pause(2000)
				.setValue(query.regFullOrderName, 'GEROME')
				.pause(2000)
				.regUser(generatePhoneVal.phone, false)
				.getOrderInfo(generatePhoneVal.phone, false)
				.pause(2000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
