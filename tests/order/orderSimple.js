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

describe('Order', function() {
	beforeEach(function(done) {
		//return jsonData;
	})
	it('orderSimple', function() {
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

				// Create screen contract
				.$$(query.listSize)
				.then(data => {
					return (async data => {
						for (let item of data) {
							await browser
								.element(`${item.selector}:nth-child(${item.index + 1})`)
								.click()
								.pause(1000)
								.assertView(
									'contractForm' + (item.index + 1),
									query.contract,
									mainConfig.tolerance
								)
						}
					})(data)
				})

				//Check empty phone
				.click(query.orderBtn)
				.getText(query.phoneInputMsg)
				.then(text => {
					mainConfig.assert.equal(text, 'Введите корректный телефон')
				})

				//Enter phone
				.getUser(generatePhoneVal.phone, false)
				.regUser(generatePhoneVal.phone, false)
				.insertPhone(query.phoneInput, false, generatePhoneVal.array)

				//Click checkbox
				.pause(1000)
				.isElement(query.checkBox, 'Error:После ввода телефона')
				.setValue(query.couponInput, query.couponVal)
				.isElement(query.couponBtn, 'Error:После ввода купона')

				//Check all cost + coupon
				.$$(query.listSize)
				.then(data => {
					return (async data => {
						for (let item of data) {
							await browser
								.element(`${item.selector}:nth-child(${item.index + 1})`)
								.click()
								.pause(1000)
								.isElement('.contract-head', 'Error:Проверка промокодов')
								.assertView(
									'contractForm + COUPON' + (item.index + 1),
									query.contract,
									{
										...mainConfig.tolerance,
										ignoreElements: [query.phoneInputAddPromo]
									}
								)
						}
					})(data)
				})
				.pause(1000)
				.isElement(query.orderBtn, 'Error:Начало заказа')
				.isElement(query.modalOrder, 'Error:Ожидаю окно')
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
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
