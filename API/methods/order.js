let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')

module.exports = async function createOrderTabPromo(
	awaitBrowser,
	generatePhoneVal
) {
	// Create screen contract
	await awaitBrowser
		.$$(query.listSize)
		.then(data => {
			return (async data => {
				for (let item of data) {
					await awaitBrowser
						.element(`${item.selector}:nth-child(${item.index + 1})`)
						.click()
						.pause(2000)
						.isElement(query.contract)
						.assertView(
							'totalOrder' + (item.index + 1),
							query.contract,
							mainConfig.tolerance
						)
				}
			})(data)
		})

		//Check empty phone
		.isElement(query.orderBtn, 'Error:Проверка пустого заказа')
		.getText(query.phoneInputMsg)
		.then(text => {
			mainConfig.assert.equal(text, 'Введите корректный телефон')
		})

		//Enter phone
		.insertPhone(query.phoneInput, false, generatePhoneVal.array)

		//Click checkbox
		.pause(3000)
		.isElement(query.checkBox, 'Error:После ввода телефона')
		.setValue(query.couponInput, query.couponVal)
		.isElement(query.couponBtn, 'Error:После ввода купона')

		//Check all cost + coupon
		.$$(query.listSize)
		.then(data => {
			return (async data => {
				for (let item of data) {
					await awaitBrowser
						.element(`${item.selector}:nth-child(${item.index + 1})`)
						.click()
						.pause(1000)
						.isElement('.contract-head', 'Error:Проверка промокодов')
						.assertView(
							'contractForm + COUPON' + (item.index + 1),
							query.contract,
							{
								...mainConfig.tolerance,
								ignoreElements: [query.phoneInputAddPromo]
							}
						)
				}
			})(data)
		})
		.pause(1000)
		.isElement(query.orderBtn, 'Error:Начало заказа')
		.isElement(query.modalOrder, 'Error:Ожидаю окно')
}
