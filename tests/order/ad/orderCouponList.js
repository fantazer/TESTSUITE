/*
	Описание теста: Проверка UTM меток
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')

describe('TEST', function() {
	describe('Order', function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('orderCouponList', function() {
			it('couponList', function() {
				const generatePhone = require('@api/methods/system/generatePhone.js')
				let generatePhoneVal = generatePhone()
				let browser = this.browser
				return (
					browser
						//.url(mainConfig.server.urls.test + '?new')
						.url(mainConfig.server.urls.test + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1200})
						//.waitForExist('.page', 50000)
						.pause(2000)

						//Enter phone
						.getUser(generatePhoneVal.phone, false)
						.regUser(generatePhoneVal.phone, false)
						.insertPhone(query.phoneInput, false, generatePhoneVal.array)

						//Checkbox + enter phone + promocode
						.isElement(query.checkBox, 'Error:После ввода телефона')
						.then(data => {
							return (async data => {
								for (let el of mainConfig.couponList) {
									await browser
										.setValue(query.couponInput, el)
										.isElement(query.couponBtn, 'Error:После ввода купона')
										.isShowLoader('.loader', 20000)
										.$$(query.listSize)
										.then(data => {
											return (async data => {
												for (let item of data) {
													let elName = await browser.getText(
														`${item.selector}:nth-child(${item.index +
															1}) .style-input-text`
													)
													await browser
														.click(
															`${item.selector}:nth-child(${item.index + 1})`
														)
														.isShowLoader('.loader', 5000)
														.assertView(
															el + ' - ' + elName,
															query.contractTotalWrap,
															mainConfig.tolerance
														)
												}
											})(data)
										})
										.pause(3000)
								}
							})(data)
						})
				)
			})
		})
	})
})
