module.exports = function() {
	let path = require('path')
	const moduleAlias = require('module-alias')
	moduleAlias.addAlias('@config', path.resolve('./config/'))
	moduleAlias.addAlias('@querySelector', path.resolve('./querySelector/'))
	moduleAlias.addAlias('@api', path.resolve('./API/'))
	const assert = require('chai').assert

	let tolerance = {
		tolerance: 8,
		antialiasingTolerance: 4,
		allowViewportOverflow: true,
		captureElementFromTop: true,
		compositeImage: true,
		screenshotDelay: 10,
		ignoreElements: ['.spinner_block']
	}

	let server = {
		urls: {
			test: 'http://test.letbefit.ru/',
			testSpb: 'http://spbtest.letbefit.ru'
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
			}
		],
		timeouts: {
			waitForShow: 1000
		}
	}

	let urlTestServer = 'http://148.251.246.45:1444'
	let apiUrlList = {
		urlToken: urlTestServer + '/connect/token',
		urlPhone: urlTestServer + '/api/account/getCustomerByPhone?phone=',
		urlGetProfileInfo: urlTestServer + '/api/account/getCustomerByPhone?phone=',
		urlRegUser: urlTestServer + '/api/account/register',
		urlOrder:
			urlTestServer + '/api/customers/GetCustomerOrdersHistory?phoneNumber='
	}

	return {
		path,
		assert,
		moduleAlias,
		tolerance,
		server,
		apiUrlList
	}
}
