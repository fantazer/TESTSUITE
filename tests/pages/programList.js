/*
	Описание теста: Проверка всех подробных страниц программ
	- Скрин всей страницы
	- Обход по всем размерностям дней
	- Обход по всем размерностям + промокод
	- Оформление заказа
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')
const createOrderTabPromo = require('@api/methods/order.js')

describe('program', function() {
	mainConfig.server.program.forEach(el => {
		it('program - ' + el.name, function() {
			const generatePhone = require('@api/methods/system/generatePhone.js')
			let generatePhoneVal = generatePhone()
			let browser = this.browser
			return (
				browser
					.url(mainConfig.server.urls.test + el.url)
					.url(mainConfig.server.urls.test + el.url + '?ISTEST')
					.windowHandleSize({width: 1920, height: 1024})
					.waitForExist('.page', 50000)
					.pause(1000)
					.assertView('program - ' + el.name, '.page', {
						...mainConfig.tolerance,
						ignoreElements: [
							'.program-days',
							'.program-el',
							'.size',
							'.schedule-list'
						]
					})
					.scroll(query.contract)
					.pause(1000)
					//Check all tabs + Cost + Promocode
					.then(() => {
						return createOrderTabPromo(browser, generatePhoneVal)
					})
					//.getUser(generatePhoneVal.phone, false)
					//.regUser(generatePhoneVal.phone, false)
					.pause(1500)
					.assertView('modalOrderStart', query.modalOrder, mainConfig.tolerance)
					.click(query.modalOrderBtnSpeed)
					.isElement('.order-success-head', 'Error:Подтверждение заказа')
					.assertView('totalOrder', query.totalOrder, {
						...mainConfig.tolerance,
						ignoreElements: [query.totalOrderPhone]
					})
					.pause(2000)
					//.getOrderInfo(generatePhoneVal.phone, false)
					.pause(2000)
			)
		})
	})
})

// hermione gui --update-refs
// selenium-standalone start
