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

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.cert.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('Сертификат', function() {
					const generatePhone = require('@api/methods/system/generatePhone.js')
					let generatePhoneVal = generatePhone()
					let browser = this.browser
					return browser
						.url(serverStateURL)
						.url(serverStateURL + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1024})
						.waitForExist('.page', 50000)
						.selectorExecute('.modal-filter', function(el) {
							return el[0].setAttribute('style', 'background-color: black;')
						})
						.pause(2000)
						.assertView('page', '.page', mainConfig.tolerance)
						.click(query.sertificat.getSertBtn)
						.pause(2000)
						.assertView('modal', query.sertificat.modal, mainConfig.tolerance)
						.setValue(query.sertificat.modalName, fakeData.name)
						.insertPhone(
							query.sertificat.modalPhone,
							false,
							generatePhoneVal.array
						)
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
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
