module.exports = function() {
	let path = require('path')
	const moduleAlias = require('module-alias')
	moduleAlias.addAlias('@config', path.resolve('./config/'))
	moduleAlias.addAlias('@querySelector', path.resolve('./querySelector/'))
	moduleAlias.addAlias('@api', path.resolve('./API/'))
	const assert = require('chai').assert

	//URLS

	let urlTestSystem = 'http://148.251.246.45:1444'

	let server = {
		urls: {
			test: 'http://letbefit.ru',
			testSpb: 'http://spbtest.letbefit.ru/'
		},
		ad: [
			{
				url: '?admitad_uid=fea1bf6ff244195dc4fceb7091e32169&utm_source=admitad',
				label: 'Admitad'
			},
			{
				url:
					'?gsaid=98467&_gs_ref=613ff07839d603cd20a25a022df3daea2e12771a&_gs_cttl=30&utm_source=Gdeslon',
				label: 'GdeSlon'
			},
			{
				url:
					'?utm_source=yandex_rsy&utm_campaign=my&utm_term=my&utm_content=my',
				label: 'Яндекс-сотрудники'
			},
			{
				url: '?utm_source=EMS',
				label: 'EMS'
			}
		],
		program: [
			{
				url: '/programmy/light/',
				name: 'Extralight'
			},
			{
				url: '/programmy/normal/',
				name: 'Normal'
			},
			{
				url: '/programmy/balance/',
				name: 'Balance'
			},
			{
				url: '/programmy/strong/',
				name: 'Strong'
			},
			{
				url: '/programmy/veggi/',
				name: 'Vegan'
			},
			{
				url: '/programmy/veggi/',
				name: 'Vegetarian'
			},
			{
				url: '/programmy/fish/',
				name: 'Fish'
			},
			{
				url: '/programmy/daily/',
				name: 'Daily'
			},
			{
				url: '/programmy/everydaily/',
				name: 'Everydaily'
			},
			{
				url: '/programmy/detox/',
				name: 'Detox'
			},
			{url: '/programmy/post/', name: 'Post'}
		],

		pages: {
			cert: {
				url: '/sertificat/',
				name: 'Подарочный сертификат'
			},
			sale: {
				url: '/aktsii/',
				name: 'Акции'
			},
			review: {
				url: '/otzyvy/',
				name: 'Отзывы'
			},
			delivery: {
				url: '/dostavka/',
				name: 'Доставка'
			},
			payment: {
				url: '/oplata/',
				name: 'Оплата'
			},
			faq: {
				url: '/faq/',
				name: 'FAQ'
			},
			blog: {
				url: '/blog/',
				name: 'Блог'
			},
			whatIsBefit: {
				url: '/chto-takoe-befit/',
				name: 'Что такое бефит'
			},
			cooperation: {
				url: '/informatsiya/',
				name: 'Сотрудничество'
			},
			production: {
				url: '/proizvodstvo/',
				name: 'Наше производство'
			},
			about: {
				url: '/o-kompanii/',
				name: 'О компании'
			},
			smi: {
				url: '/smi/',
				name: 'СМИ'
			},
			coach: {
				url: '/coach-promo/',
				name: 'Тренеры'
			},
			franshiza: {
				url: '/franshiza/',
				name: 'Франшиза'
			},
			contact: {
				url: '/kontakty/',
				name: 'Контакты'
			},
			corp: {
				url: '/programmy/corp/',
				name: 'Корпоративные заказы'
			},
			micromarkets: {
				url: '/micromarkets/',
				name: 'Микромаркеты'
			},
			retail: {
				url: '/retail/',
				name: 'Ретейл'
			},
			quiz: {
				url: '/poll/whydidyouorder/',
				name: 'Опрос после заказа'
			},
			ecology: {
				url: '/ecology/',
				name: 'Экология'
			}
		}
	}

	let apiUrlList = {
		urlToken: urlTestSystem + '/connect/token',
		urlPhone: urlTestSystem + '/api/account/getCustomerByPhone?phone=',
		urlGetProfileInfo: urlTestSystem + '/api/account/getCustomerByPhone?phone=',
		urlRegUser: urlTestSystem + '/api/account/register',
		urlOrder:
			urlTestSystem + '/api/customers/GetCustomerOrdersHistory?phoneNumber='
	}
	//URLS === end

	let tolerance = {
		tolerance: 8,
		antialiasingTolerance: 4,
		allowViewportOverflow: true,
		captureElementFromTop: true,
		compositeImage: true,
		screenshotDelay: 10,
		ignoreElements: ['.spinner_block']
	}

	let couponList = ['KATERINAFFIT', 'POLINKA']

	return {
		path,
		assert,
		moduleAlias,
		tolerance,
		server,
		apiUrlList,
		couponList
	}
}
