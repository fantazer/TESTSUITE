/*
	Описание теста: Проверка Авторизации
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/simpleOrder.json')

const getUser = require('@api/methods/system/getUser.js')
const getUserInfo = require('@api/methods/system/getUserInfo.js')
const regUser = require('@api/methods/system/regUser.js')
const getOrderInfo = require('@api/methods/system/getOrderInfo.js')
const profileData = require('@api/methods/system/systemConfig.js')

describe('Order', function() {
	beforeEach(function(done) {
		//return jsonData;
	})
	it('orderSimple', function() {
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
				.then(() => {
					return (async () => {
						await getUser()
						for (item of profileData.phoneArray) {
							await browser.addValue(query.phoneInput, item)
						}
					})()
				})

				//REG USER
				.then(() => {
					return (async () => {
						await regUser()
					})()
				})

				.pause(1000)
				//Click checkbox
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
										tolerance: 8,
										antialiasingTolerance: 4,
										allowViewportOverflow: true,
										captureElementFromTop: true,
										compositeImage: true,
										screenshotDelay: 10,
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
					tolerance: 8,
					antialiasingTolerance: 4,
					allowViewportOverflow: true,
					captureElementFromTop: true,
					compositeImage: true,
					screenshotDelay: 10,
					ignoreElements: [query.totalOrderPhone]
				})
				.pause(5000)
				.then(data => {
					//console.log('===userData===', userData)
					return (async () => {
						try {
							let orderData = await getOrderInfo(profileData.phone)
							console.log('===CHECK USER===')
							console.log(JSON.parse(orderData))
							console.log('===CHECK USER===')
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

// hermione gui --update-refs
// selenium-standalone start
