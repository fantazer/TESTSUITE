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
				it('OrderPayCard', function() {
					//const generatePhone = require('@api/methods/system/generatePhone.js')
					//let generatePhoneVal = generatePhone()
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
							//Create User + Enter phone
							//.getUser(generatePhoneVal.phone, false)
							//.regUser(generatePhoneVal.phone, false)
							.insertPhone(query.phoneInput, false, fakeData.phoneTrue)
							//Send form
							.isElement(query.orderBtn, 'Error:Начало заказа')

							//Check modal + send
							.pause(1500)
							//.click(query.modalOrderBtnNormal)
							//Check modal + send === end

							//Start form test
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.setValue(query.fullOrder.name, 'GEROME')

							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.setValue(query.fullOrder.mail, fakeData.mailTrue)

							//add program
							.click(query.fullOrder.orderAdd)
							.pause(1000)
							.assertView(
								'addProgramModal',
								query.fullOrder.orderAddModal,
								mainConfig.tolerance
							)
							.click(query.fullOrder.orderAddEl)
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.click(
								query.fullOrder.programSizeConfigEl +
									':nth-child(1) ' +
									query.fullOrder.toggleSizeProgram
							)
							.pause(2000)
							.click(
								query.fullOrder.programSizeConfigEl +
									':nth-child(2) ' +
									query.fullOrder.toggleSizeProgram
							)
							.pause(1500)
							.assertView('addProgram', query.contract, {
								...mainConfig.tolerance,
								ignoreElements: [
									query.fullOrder.phone,
									query.fullOrder.selectConditionDelivery
								]
							})
							//Check size program
							.click(
								query.fullOrder.programSizeConfigEl +
									':nth-child(1) ' +
									query.fullOrder.orderChooseRangeEl +
									':nth-child(4) '
							)
							.pause(3500)
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.assertView('addProgramChangeFirstRange', query.contract, {
								...mainConfig.tolerance,
								ignoreElements: [
									query.fullOrder.phone,
									query.fullOrder.selectConditionDelivery
								]
							})
							.click(
								query.fullOrder.programSizeConfigEl +
									':nth-child(2) ' +
									query.fullOrder.orderChooseRangeEl +
									':nth-child(4) '
							)
							.pause(1500)
							.isElement(query.orderTitle, 'Error:Оформление заказа')
							.assertView('addProgramChangeSecondRange', query.contract, {
								...mainConfig.tolerance,
								ignoreElements: [
									query.fullOrder.phone,
									query.fullOrder.selectConditionDelivery
								]
							})
							.pause(1000)

							//Check size program === end

							//Set address
							.setValue(query.fullOrder.address, fakeData.address)

							//Set pay card
							.click(query.fullOrder.payCard)

							//Check coupon cost
							.click(query.fullOrder.checkCoupon)
							.setValue(query.fullOrder.orderCouponVal, fakeData.couponTrue)
							.click(query.fullOrder.orderCouponBtn)
							.isShowLoader('.loader')
							.scroll(query.fullOrder.orderTotal)
							.assertView(
								'Check coupon TRUE',
								query.fullOrder.orderTotal,
								mainConfig.tolerance
							)
							.pause(1000)
							//Check coupon cost === end

							.click(query.fullOrder.btnConfirm)
							.pause(5000)

							//Payment
							.isElement('body', 'Error:Оплата картой')
							.assertView(
								'PaymentPage',
								query.payment.page,
								mainConfig.tolerance
							)
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
