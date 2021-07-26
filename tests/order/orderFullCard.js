/*
	Описание теста:
	- Проверка полного заказа
	- Проверка без оплаты
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')
const fakeData = require('@querySelector/fakeData.json')

describe('Order', function() {
	describe('OrderPay', function() {
		it('OrderPayCard', function() {
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
					.click(query.modalOrderBtnNormal)
					.pause(2000)
					//Check modal + send === end

					//Start form test
					.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
					.pause(1000)
					.setValue(query.fullOrder.name, 'GEROME')

					.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
					.setValue(query.fullOrder.mail, fakeData.mailTrue)
					.pause(1000)

					//add program
					.click(query.fullOrder.orderAdd)
					.pause(2000)
					.assertView(
						'addProgramModal',
						query.fullOrder.orderAddModal,
						mainConfig.tolerance
					)
					.click(query.fullOrder.orderAddEl)
					.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
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
					.pause(1500)
					.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
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
					.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
					.assertView('addProgramChangeSecondRange', query.contract, {
						...mainConfig.tolerance,
						ignoreElements: [
							query.fullOrder.phone,
							query.fullOrder.selectConditionDelivery
						]
					})
					.pause(5000)

					//Check size program === end

					//Set address
					.setValue(query.fullOrder.address, fakeData.address)

					//Set pay card
					.click(query.fullOrder.payCard)

					//Check coupon cost
					.click(query.fullOrder.checkCoupon)
					.pause(1000)
					.isElement(
						'#order-full .title.title--xl',
						'Error:Промокод не доступен'
					)

					.setValue(query.fullOrder.orderCouponVal, fakeData.couponTrue)
					.click(query.fullOrder.orderCouponBtn)
					.isElement('#order-full .title.title--xl', 'Error:Оформление заказа')
					.pause(3000)
					.scroll(query.fullOrder.orderTotal)
					.assertView(
						'Check coupon TRUE',
						query.fullOrder.orderTotal,
						mainConfig.tolerance
					)
					.pause(3000)
					//Check coupon cost === end

					.click(query.fullOrder.btnConfirm)
					.pause(2000)

					//Payment
					.isElement(query.payment.cardNumber, 'Error:Оплата картой')
					.assertView('PaymentPage', query.payment.page, mainConfig.tolerance)
			)
		})
	})
})

// hermione gui --update-refs
// selenium-standalone start
