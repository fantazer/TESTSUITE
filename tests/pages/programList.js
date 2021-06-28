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
					.pause(2000)
					.assertView('program - ' + el.name, '.page', {
						...mainConfig.tolerance,
						ignoreElements: ['.program-days', '.program-el', '.size']
					})
					.scroll(query.contract)
					//Check all tabs + Cost + Promocode
					.then(() => {
						return createOrderTabPromo(browser, generatePhoneVal)
					})
					.pause(1500)
					.assertView('modalOrderStart', query.modalOrder, mainConfig.tolerance)
					.click(query.modalOrderBtnSpeed)
					.pause(2000)
					.isElement('.order-success-head', 'Error:Подтверждение заказа')
					.assertView('totalOrder', query.totalOrder, {
						...mainConfig.tolerance,
						ignoreElements: [query.totalOrderPhone]
					})
					.pause(7000)
			)
		})
	})
})

// hermione gui --update-refs
// selenium-standalone start
