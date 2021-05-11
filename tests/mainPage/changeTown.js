let path = require('path')
let mainConfig = require(path.resolve(
	'mainConfig.js'
))()

const config = require('@config/config.json')
const query = require('@querySelector/mainPage/header.json')
const url = config.urls.client

describe('Header', function() {
	it('changeTown', function() {
		let browser = this.browser
		return (
			browser
				.url(url.root + '?new')
				.waitForExist(
					query.changeTown
						.changeTownStart,
					50000
				)
				//Проверка текущего города
				.getText(
					query.changeTown
						.changeTownStartName
				)
				.then(function(text) {
					mainConfig.assert.equal(
					text,
					'Москва'
				)
			})
					//Открытие окна
					.click(
						query.changeTown
								.changeTownStart
						)
						.pause(3000)
						.assertView(
							'changeTownModal',
					query.changeTown
						.changeTownModal,
					mainConfig.tolerance
				)
				//Проверка города куда
				.getText(
					query.changeTown
						.changeTownModalTitle
				)
				.then(function(text) {
					mainConfig.assert.equal(
						text,
						'Вы в Санк-Петербурге?'
					)
				})
				//Отмена действия
				.click(
					query.changeTown
						.changeTownModalFalse
				)
				.pause(3000)
				//Новое открытие окна
				.click(
					query.changeTown
						.changeTownStart
				)
				.pause(3000)
				//Смена города
				.click(
					query.changeTown
						.changeTownModalTrue
				)
				.pause(3000)
				.getText(
					query.changeTown
						.changeTownStartName
				)
				.then(function(text) {
					console.log(
						'text=========',
						text[0]
					)
					mainConfig.assert.equal(
						text[0],
						'Санкт-Петербург'
					)
				})
				.pause(3000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
