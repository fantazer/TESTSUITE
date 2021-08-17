/*
	Описание теста: Проверка UTM меток
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')

describe('Order', function() {
	hermione.skip.notIn('clientChrome', 'Only Desktop')
	describe('orderCouponList', function() {
		/*	beforeEach(function(done) {
		//return jsonData;
	})*/
		mainConfig.couponList.forEach(itemCoupon => {
			it('couponList - ' + itemCoupon, function() {
				const generatePhone = require('@api/methods/system/generatePhone.js')
				let generatePhoneVal = generatePhone()
				let browser = this.browser
				return (
					browser
						.url(mainConfig.server.urls.test + '?new')
						.url(mainConfig.server.urls.test + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1200})
						.waitForExist('.page', 50000)
						.pause(2000)

						//Enter phone
						.getUser(generatePhoneVal.phone, false)
						.regUser(generatePhoneVal.phone, false)
						.insertPhone(query.phoneInput, false, generatePhoneVal.array)

						//Checkbox + enter phone + promocode
						.isElement(query.checkBox, 'Error:После ввода телефона')
						.setValue(query.couponInput, itemCoupon)
						.isElement(query.couponBtn, 'Error:После ввода купона')
						.pause(4000)
						.assertView(`contractForm - ${itemCoupon}`, query.contract, {
							...mainConfig.tolerance,
							ignoreElements: [query.phoneInputAddPromo]
						})

						.isElement(query.orderBtn, 'Error:Начало заказа')
						.isElement(query.modalOrder, 'Error:Ожидаю окно')
						.pause(1500)
						.click(query.modalOrderBtnSpeed)
						.isElement('.order-success-head', 'Error:Подтверждение заказа')
						.pause(5000)
						//CHECK ORDER
						.getOrderInfo(generatePhoneVal.phone, false)
						.then(data => {
							try {
								let orderDataValue = JSON.parse(data)
								let adItem = orderDataValue.orders[0].coupon
								console.log(adItem)
								if (adItem !== itemCoupon) {
									throw '!!!COUPON ERROR - ' + itemCoupon
								} else {
									console.log('UTM Label - TRUE ', adItem)
								}
								return data
							} catch (e) {
								console.log(e)
								throw new Error(e)
							}
						})
						.pause(2000)
				)
			})
		})
	})
})
