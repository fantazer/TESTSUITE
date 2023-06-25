module.exports = function() {
	let path = require('path')
	const moduleAlias = require('module-alias')
	moduleAlias.addAlias('@config', path.resolve('./config/'))
	moduleAlias.addAlias('@querySelector', path.resolve('./querySelector/'))
	moduleAlias.addAlias('@api', path.resolve('./API/'))
	const assert = require('chai').assert

	let resolution = {
		pc: {name: 'xl', size: {width: 1920, height: 1024}},
		tabletLand: {name: 'lg', size: {width: 1024, height: 768}},
		tabletPort: {name: 'md', size: {width: 768, height: 640}},
		mobile: {name: 'sm', size: {width: 375, height: 480}}
	}

	//URLS

	//let urlTestSystem = 'http://vds46.b2b-group.org:1444/'
	let urlTestSystem = 'http://148.251.246.45:1444'

	let server = {
		couponUrlList: {
			befitYandex: {
				name: 'befitYandex',
				value: '&coupon=BEFITYANDEX'
			}
		},
		stateTest: {
			test: {
				name: 'TEST',
				url: 'http://test.letbefit.ru',
				urlSPB: 'http://spbtest.letbefit.ru/'
			},
			production: {
				name: 'PRODUCTION',
				url: 'https://letbefit.ru',
				urlSPB: 'https://spb.letbefit.ru/'
			}
		},
		urls: {
			test: 'http://test.letbefit.ru',
			testSpb: 'http://spbtest.letbefit.ru/'
			/*test: 'https://letbefit.ru',
			testSpb: 'https://spb.letbefit.ru/'*/
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
				url: '?utm_source=marka',
				label: 'EMS'
			},
			{
				url:
					'?utm_campaign=111111&utm_medium=social_referral&utm_source=Flocktory',
				label: 'flocktory'
			},
			{
				url:
					'?utm_source=cityads&utm_medium=cpa&click_id=%7Bclick_id%7D&utm_campaign=%7Bwm_id%7D',
				label: 'CityAds'
			}
		],
		program: [
			{
				url: '/programmy/light/',
				name: 'Extralight'
			},
			{
				url: '/programmy/extralightpremium/',
				name: 'Extralight Premium'
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
				url: '/programmy/vegetarian/',
				name: 'Vegetarian'
			},
			{
				url: '/programmy/fish/',
				name: 'Fish'
			},
			{
				url: '/programmy/fishpremium/',
				name: 'Fish premium'
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
			{
				url: '/programmy/lightpremium/',
				name: 'Light Premium',
				param: '&elp'
			},
			{
				url: '/programmy/normalpremium/',
				name: 'Normal Premium',
				param: '&elp'
			},
			{
				url: '/programmy/balancepremium/',
				name: 'Balance Premium'
			},
			/*		{
				url: '/programmy/slim/',
				name: 'Slim',
				param: '&complex'
			},*/
			{
				url: '/programmy/middlesea/',
				name: 'middleSea'
			},
			{
				url: '/programmy/gluten_free/',
				name: 'Gluten'
			},
			{
				url: '/programmy/post/',
				name: 'post'
			}
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
			blogItem: {
				url: '/blog/top-poleznyh-produktov/',
				name: 'Блог подробная'
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
			},
			bonus: {
				url: '/aktsii/bonus/',
				name: 'Бонусы'
			},
			calcTiming: {
				url: '/calc_timing/',
				name: 'Калькулятор времени'
			},
			slimming: {
				url: '/slimming/',
				name: 'Истории похудения'
			},
			comparison: {
				url: '/comparison/',
				name: 'Сравнение рационов'
			},
			recipe: {
				url: '/recipe/',
				name: 'Рецепты'
			},
			newyear: {
				url: '/newyear/',
				name: 'Новый год'
			},
			oferta: {
				url: '/oferta/',
				name: 'Оферта'
			},
			politika: {
				url: '/politika/',
				name: 'Политика'
			},
			apps: {
				url: '/apps/',
				name: 'Скачать приложение'
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
		tolerance: 2.5,
		antialiasingTolerance: 0,
		ignoreAntialiasing: true,
		ignoreCaret: true,
		allowViewportOverflow: true,
		captureElementFromTop: true,
		compositeImage: true,
		screenshotDelay: 300,
		ignoreElements: ['.loader']
	}

	let couponList = [
		'POLINKA',
		'BEFITNEW',
		'SURVEY',
		'PRIMEZONE',
		'BEFITAUGUST',
		'BEFITCHOICE'
	]

	return {
		path,
		assert,
		moduleAlias,
		tolerance,
		server,
		apiUrlList,
		couponList,
		resolution,
		urlTestSystem
	}
}
