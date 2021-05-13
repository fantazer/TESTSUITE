let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/mainPage/header.json')

describe('Header', function() {
	it('changeTown', function() {
		let browser = this.browser
		return (
			browser
				.url(mainConfig.server.urls.test + '?new')
				.waitForExist(query.changeTown.changeTownStart, 50000)
				//Проверка текущего города
				.getText(query.changeTown.changeTownStartName)
				.then(function(text) {
					mainConfig.assert.equal(text, 'Москва')
				})
				//Открытие окна
				.click(query.changeTown.changeTownStart)
				.pause(3000)
				.assertView(
					'changeTownModal',
					query.changeTown.changeTownModal,
					mainConfig.tolerance
				)
				//Проверка города куда
				.getText(query.changeTown.changeTownModalTitle)
				.then(function(text) {
					mainConfig.assert.equal(text, 'Вы в Санк-Петербурге?')
				})
				//Отмена действия
				.click(query.changeTown.changeTownModalFalse)
				.pause(3000)
				//Новое открытие окна
				.click(query.changeTown.changeTownStart)
				.pause(3000)
				//Смена города
				.click(query.changeTown.changeTownModalTrue)
				.pause(3000)
				.getUrl()
				.then(data => {
					data = data.replace(/\/oct\/|\/\?newsite/gi, '')
					mainConfig.assert.equal(data, mainConfig.server.urls.testSpb)
				})
				.getText(query.changeTown.changeTownStartName)
				.then(function(text) {
					mainConfig.assert.equal(text[0], 'Санкт-Петербург')
				})
				.pause(3000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
