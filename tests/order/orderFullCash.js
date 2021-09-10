/*
	Описание теста:
	- Проверка полного заказа
	- Проверка без оплаты
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		describe('Order', function() {
			describe('OrderPay', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('OrderPayCash', function() {
					const generatePhone = require('@api/methods/system/generatePhone.js')
					let generatePhoneVal = generatePhone()
					let browser = this.browser
					return (
						browser
							.url(serverStateURL + '?ISTEST')
							.windowHandleSize({width: 1920, height: 1200})
							.waitForExist('.page', 50000)
							.scroll('#order')
							.selectorExecute('.modal-filter', function(el) {
								return el[0].setAttribute('style', 'background-color: black;')
							})
							.assertView('contractForm', query.contract, mainConfig.tolerance)
							.then(data => {
								return (async () => {
									if (serverState.name == 'PRODUCTION') {
										await browser.insertPhone(
											query.phoneInput,
											false,
											fakeData.phoneTrue
										)
									} else {
										//Create User + Enter phone
										await browser.getUser(generatePhoneVal.phone, false)
										//.regUser(generatePhoneVal.phone, false)
										await browser.insertPhone(
											query.phoneInput,
											false,
											generatePhoneVal.array
										)
									}
								})()
							})

							//Send form
							.pause(1000)
							.isElement(query.orderBtn, 'Error:Начало заказа')

							//Check modal + send
							.pause(4000)
							.assertView(
								'modalOrderStart',
								query.modalOrder,
								mainConfig.tolerance
							)
							.isElement(query.modalOrderBtnNormal, 'Error:Ожидаю окно')
							//Check modal + send === end

							//Start form test
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.assertView('totalOrder', query.contract, {
								...mainConfig.tolerance,
								ignoreElements: [
									query.fullOrder.phone,
									query.fullOrder.selectConditionDelivery
								]
							})
							.pause(1000)
							.setValue(query.fullOrder.name, 'GEROME')

							//check mail validation
							.setValue(query.fullOrder.mail, fakeData.mailFalse)
							.click(query.fullOrder.btnConfirm)
							.pause(1000)
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.assertView(
								'fullOrderValidateEmailFalse',
								query.fullOrder.mailContainer,
								{
									...mainConfig.tolerance
								}
							)
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.setValue(query.fullOrder.mail, fakeData.mailTrue)
							//check mail validation === end
							.pause(1000)

							//Check friend phone
							.click(query.fullOrder.checkFriend)
							.pause(1000)
							.insertPhone(
								query.fullOrder.friendPhone,
								false,
								fakeData.phoneFalse
							)
							.pause(1500)
							.click(query.fullOrder.btnConfirm)
							.pause(1500)
							.assertView(
								'fullOrderValidateFriendPhone',
								query.fullOrder.friendPhone,
								{
									...mainConfig.tolerance
								}
							)
							.insertPhone(
								query.fullOrder.friendPhone,
								false,
								fakeData.phoneTrue
							)
							.pause(1000)
							//Check friend phone === end

							//Check size program
							.click(query.fullOrder.toggleSizeProgram)
							.pause(2000)
							.$$(query.fullOrder.orderChooseRangeEl)
							.then(data => {
								return (async data => {
									for (let item of data) {
										let elName = await browser.getText(
											`${item.selector}:nth-child(${item.index +
												1}) .style-input-text`
										)
										await browser
											.element(`${item.selector}:nth-child(${item.index + 1})`)
											.click()
											.pause(2000)
											.isElement(query.orderTitle, 'Error:Оформление заказа')
											.assertView(
												elName,
												query.fullOrder.orderTotal,
												mainConfig.tolerance
											)
									}
								})(data)
							})
							//Check size program === end
							.pause(1000)

							//Check Box + Spoon
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.click(query.fullOrder.checkRefreshBox)
							.click(query.fullOrder.checkNeedSpoon)
							//Check Box + Spoon === end

							//Set address
							.setValue(query.fullOrder.address, fakeData.address)

							//Set pay card
							//.click(query.fullOrder.payCard)

							//Check coupon cost
							.click(query.fullOrder.checkCoupon)
							.pause(1000)
							.isElement(query.orderTitle, 'Error:Промокод не доступен')
							//false coupon
							.setValue(query.fullOrder.orderCouponVal, fakeData.couponFalse)
							.click(query.fullOrder.orderCouponBtn)
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.pause(3000)
							.assertView(
								'Check coupon false',
								query.fullOrder.couponContainer,
								mainConfig.tolerance
							)
							//true coupon
							.setValue(query.fullOrder.orderCouponVal, fakeData.couponTrue)
							.click(query.fullOrder.orderCouponBtn)
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.pause(3000)
							.scroll(query.fullOrder.orderTotal)
							.assertView(
								'Check coupon TRUE',
								query.fullOrder.orderTotal,
								mainConfig.tolerance
							)
							.pause(3000)
							//Check coupon cost === end

							//Set MSG
							.click(query.fullOrder.checkComment)
							.pause(1000)
							.setValue(query.fullOrder.commentText, fakeData.comment)
							//Set MSG === end

							.click(query.fullOrder.btnConfirm)
							.pause(2000)

							//Payment
							/*.isElement(query.payment.cardNumber, 'Error:Оплата картой')
				.assertView('PaymentPage', query.payment.page, mainConfig.tolerance)
				.pause(1000)
				.setValue(query.payment.cardNumber, fakeData.cardNumber)
				.pause(1000)
				.setValue(query.payment.cardDate, fakeData.cardDate)
				.pause(1000)
				.setValue(query.payment.cardCVS, fakeData.cardCVS)
				.pause(2000)
				.click(query.payment.cardBtn)*/

							//FINISH
							.isElement(query.contract, 'Error:Конец оплаты')
							.pause(2000)
							.assertView('Finish', query.contract, {
								...mainConfig.tolerance,
								ignoreElements: [query.totalOrderPhone]
							})
							.then(data => {
								return (async () => {
									if (serverState.name != 'PRODUCTION') {
										await browser.getOrderInfo(generatePhoneVal.phone, false)
									}
								})()
							})
							.pause(2000)
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
