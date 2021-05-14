/*
	Описание теста: Проверка Авторизации
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/simpleOrder.json')

const getUser = require('@api/methods/system/getUser.js')
const regUser = require('@api/methods/system/regUser.js')
const getOrderInfo = require('@api/methods/system/getOrderInfo.js')

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
					.then(() => {
						return (async () => {
							await getUser(generatePhoneVal.phone)
							for (let item of generatePhoneVal.array) {
								await browser.addValue(query.phoneInput, item)
							}
						})()
					})
					//REG USER
					.then(() => {
						return (async () => {
							await regUser(generatePhoneVal.phone)
						})()
					})
					.pause(1000)
					.isElement(query.orderBtn, 'Error:Начало заказа')
					.isElement(query.modalOrder, 'Error:Ожидаю окно')
					.pause(1500)
					.click(query.modalOrderBtnSpeed)
					.isElement('.order-success-head', 'Error:Подтверждение заказа')
					.pause(5000)
					//CHECK ORDER
					.then(() => {
						return (async () => {
							try {
								let orderData = await getOrderInfo(generatePhoneVal.phone)
								let orderDataValue = JSON.parse(orderData)
								let adItem = orderDataValue.orders[0].marketingSourceInfo
								console.log('===CHECK USER AD===')
								console.log(orderDataValue)
								console.log(adItem)
								console.log('===CHECK USER AD===')
								if (adItem !== itemAd.label) {
									throw 'AD LABEL ERROR - ' + itemAd.label
								}
								return orderData
							} catch (e) {
								console.log(e)
								throw new Error(e)
							}
						})()
					})
					.pause(2000)
			)
		})
	})
})
// hermione gui --update-refs
// selenium-standalone start
