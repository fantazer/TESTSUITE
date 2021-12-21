/*
	Описание теста: Проверка страницы /recipe/
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.recipe.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('Рецепты', function() {
					let browser = this.browser
					return browser
						.url(serverStateURL)
						.url(serverStateURL + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1024})
						.waitForExist('.page', 50000)
						.pause(2000)
						.assertView('page', '.page', mainConfig.tolerance)
						.click(query.recipe.recipeGet)
						.pause(1000)
						.assertView(
							'ModalEmpty',
							query.recipe.recipeModal,
							mainConfig.tolerance
						)
						.click(query.recipe.recipeFormGet)
						.assertView(
							'ModalEmptyValidateError',
							query.recipe.recipeModal,
							mainConfig.tolerance
						)
						.insertPhone(query.recipe.recipePhone, false, fakeData.phoneTrue)
						.setValue(query.recipe.recipeName, fakeData.name)
						.setValue(query.recipe.recipeEmail, fakeData.mailTrue)
						.click(query.recipe.recipeFormGet)
						.pause(6000)
						.setValue(query.payment.cardNumber, fakeData.cardNumber)
						.setValue(query.payment.cardDate, fakeData.cardDate)
						.setValue(query.payment.cardCVS, fakeData.cardCVS)
						.click(query.payment.cardBtn)
						.pause(2000)
						.assertView('payment', 'body', mainConfig.tolerance)
						.pause(2000)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
