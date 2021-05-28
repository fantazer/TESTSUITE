/*
	Описание теста:
	- Проверка полного заказа
	- Проверка оплата картой
	- Проверка без оплаты
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')
const fakeData = require('@querySelector/fakeData.json')

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

				//Create User + Enter phone
				.getUser(generatePhoneVal.phone, false)
				//.regUser(generatePhoneVal.phone, false)
				.insertPhone(query.phoneInput, false, generatePhoneVal.array)
				//Send form
				.pause(1000)
				.isElement(query.orderBtn, 'Error:Начало заказа')

				//Check modal + send
				.isElement(query.modalOrder, 'Error:Ожидаю окно')
				.pause(1500)
				.assertView('modalOrderStart', query.modalOrder, mainConfig.tolerance)
				.click(query.modalOrderBtnNormal)
				.pause(2000)
				//Check modal + send === end

				//Start form test
				.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
				.assertView('totalOrder', query.contract, {
					...mainConfig.tolerance,
					ignoreElements: [query.fullOrder.phone]
				})
				.pause(2000)
				.setValue(query.fullOrder.name, 'GEROME')

				//check mail validation
				.setValue(query.fullOrder.mail, fakeData.mailFalse)
				.click(query.fullOrder.btnConfirm)
				.pause(2000)
				.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
				.assertView(
					'fullOrderValidateEmailFalse',
					query.fullOrder.mailContainer,
					{
						...mainConfig.tolerance
					}
				)
				.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
				.setValue(query.fullOrder.name, fakeData.mailTrue)
				.click(query.fullOrder.btnConfirm)
				.assertView(
					'fullOrderValidateEmailTrue',
					query.fullOrder.mailContainer,
					{
						...mainConfig.tolerance
					}
				)
				//check mail validation === end

				.pause(2000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
