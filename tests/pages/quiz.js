/*
	Описание теста: Проверка страницы /retail/
	- Скрин всей страницы
	- Расскрытие всех блюд
	- Проверка формы на валидацию
	- Ввод Имени
	- Ввод неправильного телефона
	- Ввод правильного телефона
	- Ввод сообщения
	- Отправка формы
	- Модальное окно о согласии
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.quiz.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			describe('FORM - Pages', function() {
				if (serverState.name === 'PRODUCTION') {
					hermione.skip.notIn('clientChrome', 'Only Desktop')
				}
				it('Опрос после заказа', function() {
					let browser = this.browser
					return (
						browser
							.url(serverStateURL)
							.url(serverStateURL + '?ISTEST')
							.windowHandleSize({width: 1920, height: 1024})
							.waitForExist('.page', 50000)
							.pause(1000)
							.assertView('page', '.content', mainConfig.tolerance)
							//check validate
							.click(query.quiz.formBtn)
							.pause(500)
							.assertView('pageValidate', '.content', mainConfig.tolerance)
							//choose questions
							.click(query.quiz.formBtn)
							.click(query.quiz.howKnow)
							.click(query.quiz.recommend)
							.setValue(query.quiz.whatLikeText, fakeData.comment)
							.setValue(query.quiz.whatBad, fakeData.comment)
							.setValue(query.quiz.whatRival, fakeData.comment)
							.click(query.quiz.whyChoose)
							.click(query.quiz.howOften)
							.click(query.quiz.howLong)
							.click(query.quiz.formBtn)
							.pause(5000)
							.assertView('pageFinish', '.content', mainConfig.tolerance)
					)
				})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start
