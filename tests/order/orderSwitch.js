/*
	Описание теста: Проверка Авторизации
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')

const getUser = require('@api/methods/system/getUser.js')
const getUserInfo = require('@api/methods/system/getUserInfo.js')
const regUser = require('@api/methods/system/regUser.js')
const getOrderInfo = require('@api/methods/system/getOrderInfo.js')

describe('OrderList', function() {
	/*	beforeEach(function(done) {
		//return jsonData;
	})*/
	for (let i = 1; i <= 12; ++i) {
		it('orderSwitch' + i, function() {
			let browser = this.browser
			return (
				browser
					.url(mainConfig.server.urls.test + '?new')
					//.url(mainConfig.server.urls.test + '?ISTEST')
					.windowHandleSize({width: 1920, height: 1200})
					.waitForExist('.page', 50000)
					.scroll('#program')
					.pause(1000)
					.click('.action-dropmenu')
					.pause(2000)
					.click('.action-dropmenu .dropdown-menu__el:nth-child(' + i + ')')
					.pause(5000)
					.assertView('Order', '#order', mainConfig.tolerance)
			)
		})
	}
})
// hermione gui --update-refs
// selenium-standalone start
