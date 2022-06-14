/*
	Описание теста: Проверка UTM меток
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/order/order.json')
const fakeData = require('@querySelector/fakeData.json')

let urlList = [
	{
		name: 'TrenerRecomend',
		url: ['?default'],
		UTM: 'Тренер Полина',
		trainer: true,
		recommend: true
	},
	{
		name: 'TrenerRecomendYandex',
		url: [mainConfig.server.ad[2].url],
		UTM: 'Тренер Полина',
		trainer: true,
		recommend: true
	},
	{
		name: 'TrenerRecomendAdmitad',
		url: [mainConfig.server.ad[0].url],
		UTM: 'Тренер Полина',
		trainer: true,
		recommend: true
	},
	{
		name: 'RecomendYandex',
		url: [mainConfig.server.ad[2].url],
		UTM: 'Друзья',
		trainer: false,
		recommend: true
	},
	{
		name: 'RecomendAdmitad',
		url: [mainConfig.server.ad[0].url],
		UTM: 'Друзья',
		trainer: false,
		recommend: true
	},
	{
		name: 'RecomendFlocktory',
		url: [mainConfig.server.ad[4].url],
		UTM: 'Друзья',
		trainer: false,
		recommend: true
	},
	{
		name: 'YandexGoogle',
		url: [mainConfig.server.ad[2].url, mainConfig.server.ad[3].url],
		UTM: 'Яндекс-сотрудники',
		trainer: false,
		recommend: false
	},
	{
		name: 'YandexAdmitad',
		url: [mainConfig.server.ad[2].url, mainConfig.server.ad[0].url],
		UTM: 'Admitad',
		trainer: false,
		recommend: false
	},
	{
		name: 'YandexFlocktory',
		url: [mainConfig.server.ad[2].url, mainConfig.server.ad[4].url],
		UTM: 'flocktory',
		trainer: false,
		recommend: false
	},
	{
		name: 'AdmitadYandex',
		url: [mainConfig.server.ad[0].url, mainConfig.server.ad[2].url],
		UTM: 'Яндекс-сотрудники',
		trainer: false,
		recommend: false
	},
	{
		name: 'FlocktoryYandex',
		url: [mainConfig.server.ad[4].url, mainConfig.server.ad[2].url],
		UTM: 'Яндекс-сотрудники',
		trainer: false,
		recommend: false
	},
	{
		name: 'SlonAdmitad',
		url: [mainConfig.server.ad[1].url, mainConfig.server.ad[0].url],
		UTM: 'Admitad',
		trainer: false,
		recommend: false
	}
]
describe('TEST', function() {
	describe('Order', function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('OrderAd', function() {
			urlList.forEach((urlListEl, i) => {
				it(`${i + 1}-OrderAdUTM-${urlListEl.name}`, function() {
					const generatePhone = require('@api/methods/system/generatePhone.js')
					let generatePhoneVal = generatePhone()
					let browser = this.browser
					return (
						browser
							.then(data => {
								return (async data => {
									for (let item of urlListEl.url) {
										await browser
											.url(mainConfig.server.urls.test + item + '&ISTEST')
											.pause()
									}
								})(data)
							})
							//.url(mainConfig.server.urls.test + itemAd.url)
							.windowHandleSize({width: 1920, height: 1200})
							.waitForExist('.page', 50000)
							.pause(1000)

							//Reg User
							.getUser(generatePhoneVal.phone, false)
							.regUser(generatePhoneVal.phone, false)

							//set coupone
							.pause(1000)
							.isElement(query.checkBox, 'Error:После ввода телефона')
							.pause(1000)
							.insertPhone(
								query.phoneInputAddPromo,
								false,
								generatePhoneVal.array
							)
							.pause(3000)
							.then(data => {
								//console.log(urlListEl)
								if (urlListEl.trainer) {
									return browser
										.setValue(query.couponInput, mainConfig.couponList[1])
										.isElement(query.couponBtn, 'Error:После ввода купона')
								} else {
									return browser.click(query.checkBox)
									//.isElement(query.orderBtn, 'Error:После ввода телефона')
								}
							})
							.pause(3000)
							//Check friend phone
							.then(data => {
								if (urlListEl.recommend) {
									return browser
										.click(query.fullOrder.checkFriend)
										.pause(1000)
										.insertPhone(
											query.fullOrder.friendPhone,
											false,
											fakeData.phoneTrue
										)
										.pause(1000)
								} else {
									return data
								}
							})
							//Check friend phone === end

							.pause(4000)
							.click(query.orderBtn)

							//Check modal + send
							//.isElement(query.modalOrder, 'Error:Ожидаю окно')
							//.pause(4500)
							//.click(query.modalOrderBtnNormal)
							//.pause(4000)
							//Check modal + send === end

							//Start form test
							.isElement(query.fullOrder.orderTitle, 'Error:Оформление заказа')
							.pause(1000)
							.setValue(query.fullOrder.name, 'GEROME')

							.click(query.fullOrder.btnConfirm)
							.pause(2000)

							//FINISH
							.isElement(query.contract, 'Error:Конец оплаты')
							.pause(2000)
							/*.assertView('Finish', query.contract, {
								...mainConfig.tolerance,
								ignoreElements: [query.totalOrderPhone]
							})*/

							//CHECK ORDER
							.getOrderInfo(generatePhoneVal.phone, false)
							.then(data => {
								try {
									let orderDataValue = JSON.parse(data)
									let adItem = orderDataValue.orders[0].marketingSourceInfo
									console.log(adItem)
									if (adItem !== urlListEl.UTM) {
										throw 'AD LABEL ERROR - ' + urlListEl.UTM
									} else {
										console.log('UTM Label - TRUE ', urlListEl.UTM)
									}
									return data
								} catch (e) {
									console.log(e)
									throw new Error(e)
								}
							})
							.pause(2000)
							.deleteCookie()
							.then(() => {
								console.log(
									`=== TEST Order/orderAd- ${i + 1}-OrderAdUTM-${
										urlListEl.name
									} END TRUE ===`
								)
							})
					)
				})
			})
		})
	})
})
