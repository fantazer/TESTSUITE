/*
	Описание теста: Проверка страницы /coach-promo/
	- Скрин всей страницы
	- Авторизация тренера
	- скрин окна авторизации тренера
	- неверный телефон тренера
	- верный телефон тренера
	- ввод неверной sms
	- ввод верного sms
	- Проверка формы заявки
	- все поля пустые
	- неверный телефон
	- все поля заполнены
	- отправи формы
	- Проверка окна успеха
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.coach.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				hermione.skip.notIn('clientChrome', 'Only Desktop')
				it('Тренеры', function() {
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
							.pause(2000)
							.assertView('banner', query.retail.banner, {
								...mainConfig.tolerance,
								ignoreElements: [query.retail.items]
							})
							.assertView('page', '.content', mainConfig.tolerance)

							//enter LK
							.click(query.coach.enterModalBtnOpen)
							.pause(2000)
							.assertView(
								'enterModal',
								query.coach.enterModal,
								mainConfig.tolerance
							)
							.click(query.coach.enterModalBtnSend)
							.assertView(
								'enterModalCheckValidation',
								query.coach.enterModal,
								mainConfig.tolerance
							)

							//False coach
							.insertPhone(
								query.coach.enterModalPhone,
								false,
								query.coach.coachNumberFalse
							)
							.click(query.coach.enterModalBtnSend)
							.pause(1500)
							.assertView(
								'enterModalCheckFalseCoach',
								query.coach.enterModal,
								mainConfig.tolerance
							)

							//True coach
							.setValue(query.coach.enterModalPhone, ' ')
							.insertPhone(
								query.coach.enterModalPhone,
								false,
								query.coach.coachNumberTrue
							)
							.pause(500)
							.click(query.coach.enterModalBtnSend)
							.pause(2500)
							.assertView(
								'coachSmsModal',
								query.coach.coachSmsModal,
								mainConfig.tolerance
							)

							//False SMS
							.setValue(query.coach.coachSmsModalInput, fakeData.smsFalse)
							.click(query.coach.coachSmsModalBtn)
							.pause(2000)
							.assertView(
								'coachSmsModalFalse',
								query.coach.coachSmsModal,
								mainConfig.tolerance
							)
							//NO SMS
							.click(".modal[data-modal='getSms'] .modal-close")
							.pause(2000)
							//NO SMS

							//Сheck request form
							.click(query.coach.formBtn)
							.pause(1000)
							.assertView(
								'formInvalidation',
								query.coach.form,
								mainConfig.tolerance
							)

							//Set name
							.setValue(query.coach.name, 'GEROME')

							//Check false phone/mail
							.insertPhone(query.coach.phone, false, fakeData.phoneFalse)
							.setValue(query.coach.mail, fakeData.mailFalse)
							.click(query.coach.formBtn)
							.pause(1000)
							.assertView(
								'formInvalidationMailPhone',
								query.coach.form,
								mainConfig.tolerance
							)

							//Check true phone/mail
							.insertPhone(query.coach.phone, false, fakeData.phoneTrue)
							.setValue(query.coach.mail, fakeData.mailTrue)
							.setValue(query.coach.text, fakeData.comment)
							.click(query.coach.formBtn)

							//check modal
							.pause(3500)
							.assertView('modal', query.coach.modalTrue, {
								...mainConfig.tolerance
							})
							.click(query.coach.modalTrueBtn)
							.pause(2000)

							//finish
							.assertView('finish', '.page', mainConfig.tolerance)
							.pause(1000)
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
