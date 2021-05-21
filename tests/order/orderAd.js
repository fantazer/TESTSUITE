/*
	Описание теста: Проверка UTM меток
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')

describe('OrderAd', function() {
	/*	beforeEach(function(done) {
		//return jsonData;
	})*/
	mainConfig.server.ad.forEach(itemAd => {
		it('orderAd - ' + itemAd.label, function() {
			const generatePhone = require('@api/methods/system/generatePhone.js')
			let generatePhoneVal = generatePhone()
			let browser = this.browser
			return (
				browser
					.url(mainConfig.server.urls.test + '?new')
					.url(mainConfig.server.urls.test + itemAd.url)
					.windowHandleSize({width: 1920, height: 1200})
					.waitForExist('.page', 50000)
					.pause(5000)

					//Enter phone
					.getUser(generatePhoneVal.phone, false)
					.regUser(generatePhoneVal.phone, false)
					.insertPhone(query.phoneInput, false, generatePhoneVal.array)

					.pause(1000)
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
			)
		})
	})
})
