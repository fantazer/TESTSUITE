/*
	Описание теста: Проверка страницы /sertificat/
	- Скрин всей страницы
	- Вызов формы для подарочного сертификата
	- Заполнение всех данных
	- Скрин формы
	- Скрин страницы заказа
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')
const order = require('@querySelector/order/order.json')

describe('Pages', function() {
	it('Sertificat', function() {
		const generatePhone = require('@api/methods/system/generatePhone.js')
		let generatePhoneVal = generatePhone()
		let browser = this.browser
		return (
			browser
				.url(mainConfig.server.urls.test + mainConfig.server.pages[0].url)
				.url(
					mainConfig.server.urls.test +
						mainConfig.server.pages[0].url +
						'?ISTEST'
				)
				.windowHandleSize({width: 1920, height: 1024})
				.waitForExist('.page', 50000)
				.pause(2000)
				.assertView('page', '.page', mainConfig.tolerance)
				//Check all tabs + Cost + Promocode
				.click(query.sertificat.getSertBtn)
				.pause(2000)
				.assertView('modal', query.sertificat.modal, mainConfig.tolerance)
				.setValue(query.sertificat.modalName, fakeData.name)
				.insertPhone(query.sertificat.modalPhone, false, generatePhoneVal.array)
				.pause(1000)
				.click(query.sertificat.modalBtn)
				.pause(2000)
				.isElement(order.totalOrder, 'Error:Подтверждение заказа')
				.assertView('totalOrder', order.totalOrder, {
					...mainConfig.tolerance,
					ignoreElements: [
						order.fullOrder.phone,
						order.fullOrder.selectConditionDelivery
					]
				})
				.pause(2000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
