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
						.click(`${item.selector}:nth-child(${item.index + 1})`)
						.pause(1000)
						//.isElement(query.contract)
						.assertView(
							'totalOrder' + (item.index + 1),
							query.contract,
							mainConfig.tolerance
						)
					//console.log(`${item.selector}:nth-child(${item.index + 1})`)
				}
			})(data)
		})

		//Check Day Off
		//Check dayOfCheckBox
		.isVisible(query.checkBoxExcludeDayOff)
		.then(data => {
			if (data[0]) {
				return awaitBrowser
					.click(query.checkBoxExcludeDayOff)
					.pause(2000)
					.assertView(
						'ExcludeDayModal',
						query.ExcludeDayModal,
						mainConfig.tolerance
					)
					.click(query.ExcludeDayModalBtn)
					.pause(2000)
					.$$(query.listSize)
					.then(data => {
						return (async data => {
							for (let item of data) {
								await awaitBrowser
									.click(`${item.selector}:nth-child(${item.index + 1})`)
									.pause(2000)
									//.isElement(query.contract)
									.assertView(
										'totalOrderDayOff' + (item.index + 1),
										query.contract,
										mainConfig.tolerance
									)
							}
						})(data)
					})
			} else {
				return data
			}
		})

		//Check empty phone
		.pause(1000)
		.isElement(query.orderBtn, 'Error:Проверка пустого заказа')
		.getText(query.phoneInputMsg)
		.then(text => {
			mainConfig.assert.equal(text, 'Введите корректный телефон')
		})

		//Enter phone
		.insertPhone(query.phoneInput, false, generatePhoneVal)

		//Click checkbox
		//.isShowLoader('.loader')
		.isElement(query.checkBox, 'Error:После ввода телефона')
		.setValue(query.couponInput, query.couponVal)
		.isElement(query.couponBtn, 'Error:После ввода купона')
		//Check all cost + coupon

		//Check dayOfCheckBox

		.isShowLoader('.loader')
		.isVisible(query.checkBoxExcludeDayOff)
		.then(data => {
			if (data[0]) {
				return awaitBrowser
					.isElement(query.checkBoxExcludeDayOff, 'Error:Исключить выходные')
					.isShowLoader('.loader', 10000)
			} else {
				return data
			}
		})
		.pause(1000)
		.$$(query.listSize)
		.then(data => {
			return (async data => {
				for (let item of data) {
					await awaitBrowser
						.click(`${item.selector}:nth-child(${item.index + 1})`)
						.pause(5000)
						//.isShowLoader('.loader', 10000)
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
		.click(query.orderBtn, 'Error:Начало заказа')
}
