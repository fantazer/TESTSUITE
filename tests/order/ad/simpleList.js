/*
	Описание теста: Проверка UTM меток
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')

describe('TEST', function() {
	describe('Order', function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('OrderAd', function() {
			mainConfig.server.ad.forEach(itemAd => {
				it('orderAd - ' + itemAd.label, function() {
					const generatePhone = require('@api/methods/system/generatePhone.js')
					let generatePhoneVal = generatePhone()
					let browser = this.browser
					return (
						browser
							.url(mainConfig.server.urls.test + '?new&ISTEST')
							.url(mainConfig.server.urls.test + itemAd.url)
							.windowHandleSize({width: 1920, height: 1200})
							.waitForExist('.page', 50000)
							.pause(5000)

							//Enter phone
							.getUser(generatePhoneVal.phone, false)
							.regUser(generatePhoneVal.phone, false)
							.insertPhone(query.phoneInput, false, generatePhoneVal.array)

							.pause(3000)
							.isElement(query.orderBtn, 'Error:Начало заказа')
							//.isElement(query.modalOrder, 'Error:Ожидаю окно')
							//.pause(1500)
							//.click(query.modalOrderBtnSpeed)
							//.isElement('.order-success-head', 'Error:Подтверждение заказа')
							.isElement(query.fullOrder.orderTitle, 'Error:Оформление заказа')
							.pause(5000)
							.setValue(query.fullOrder.name, 'GEROME')

							.click(query.fullOrder.btnConfirm)
							.pause(5000)

							.isElement(query.contract, 'Error:Конец оплаты')
							.pause(2000)
							//CHECK ORDER
							.getOrderInfo(generatePhoneVal.phone, false)
							.then(data => {
								try {
									let orderDataValue = JSON.parse(data)
									let adItem = orderDataValue.orders[0].marketingSourceInfo
									if (adItem !== itemAd.label) {
										throw 'AD LABEL ERROR - ' + itemAd.label
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
							.deleteCookie()
							.then(() => {
								console.log(
									'=== TEST Order/orderAd-' + itemAd.label + 'END TRUE ==='
								)
							})
					)
				})
			})
		})
	})
})
