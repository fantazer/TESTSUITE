/*
	Описание теста: Проверка страницы /blog/ovsyanoblin-ndash-retsept-dlya/
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.blogItem.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('Блог подробная', function() {
					let browser = this.browser
					return (
						browser
							.url(serverStateURL)
							.url(serverStateURL + '?ISTEST')
							.windowHandleSize({width: 1920, height: 1024})
							.waitForExist('.page', 50000)
							.selectorExecute('.modal-filter', function(el) {
								return el[0].setAttribute('style', 'background-color: black;')
							})
							/*.assertView('page', '.page > .f-grow', {
								...mainConfig.tolerance,
								ignoreElements: [query.blogItem.readMoreEl]
							})*/

							.click(query.blogItem.formBtn)
							.assertView('form', query.blogItem.form, mainConfig.tolerance)
							//Set name
							.setValue(query.blogItem.name, fakeData.name)
							//Check false|true phone
							.insertPhone(query.blogItem.phone, false, fakeData.phoneTrue)
							.pause(1000)
							.click(query.blogItem.formBtn)
							.isShowLoader('.loader', 20000)
							.pause(2000)
							.assertView(
								'modalState',
								query.blogItem.modalTrue,
								mainConfig.tolerance
							)
							.click(query.blogItem.modalTrueBtn)
							.pause(1000)
							.assertView(
								'formSuccess',
								query.blogItem.form,
								mainConfig.tolerance
							)
							.pause(2000)

							//check countDown
							.url(serverStateURL + '?ISTEST&initModal=blogCountDown')
							.waitForExist('.page', 50000)
							.selectorExecute('.modal-filter', function(el) {
								return el[0].setAttribute('style', 'background-color: black;')
							})
							.pause(2000)
							.assertView(
								'countDownFormDefault',
								query.blogItem.countDownForm,
								{
									...mainConfig.tolerance,
									ignoreElements: [query.blogItem.timer]
								}
							)
							.click(query.blogItem.countDownFormBtn)
							.assertView(
								'countDownFormValidate',
								query.blogItem.countDownForm,
								{
									...mainConfig.tolerance,
									ignoreElements: [query.blogItem.timer]
								}
							)
							.setValue(query.blogItem.countDownFormName, fakeData.name)
							.insertPhone(
								query.blogItem.countDownFormPhone,
								false,
								fakeData.phoneTrue
							)
							.pause(1000)
							.click(query.blogItem.countDownFormBtn)
							.pause(2000)
							.assertView(
								'countDownFormTrue',
								query.blogItem.countDownFormModalTrue,
								mainConfig.tolerance
							)
							.click(query.blogItem.countDownFormModalTrueBtn)

							//check countDown === end*/

							//check telegram + bubble
							.pause(2000)
							.url(
								serverStateURL +
									'?ISTEST&REGION=OUTREGION&initModal=telegramSubs'
							)
							.pause(2000)
							.selectorExecute('.modal-filter', function(el) {
								return el[0].setAttribute('style', 'background-color: black;')
							})
							.pause(2000)
							.assertView(
								'telegramForm',
								query.blogItem.telegramForm,
								mainConfig.tolerance
							)
							.click(query.blogItem.telegramFormClose)
							/*.then(data => {
								console.log(hermione)
								if (hermione.skip._currentBrowserId === 'clientChrome') {
									return browser
										.pause(20000)
										.assertView(
											'bubble',
											query.blogItem.bubble,
											mainConfig.tolerance
										)
										.click(query.blogItem.bubbleBtn)
										.pause(3000)
										.assertView(
											'recipe',
											'.bg--mark.mb-100',
											mainConfig.tolerance
										)
								}
							})*/
							.pause(2000)
						//check telegram + bubble === end
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
