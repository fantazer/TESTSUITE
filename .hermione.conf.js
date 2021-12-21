module.exports = {
	sets: {
		desktop: {
			files: 'tests/',
			browsers: ['clientChrome', 'clientChromeMobile']
		}
	},

	browsers: {
		clientChrome: {
			windowSize: {
				width: 1920,
				height: 1000
			},
			desiredCapabilities: {
				browserName: 'chrome', // this browser should be installed on your OS
				chromeOptions: {}
			}
		},
		clientChromeMobile: {
			desiredCapabilities: {
				windowSize: {
					width: 375,
					height: 812
				},
				browserName: 'chrome', // this browser should be installed on your OS
				chromeOptions: {
					mobileEmulation: {
						deviceName: 'iPhone X'
						//deviceName: 'Pixel 2'
					}
				}
			}
		}
	},
	sessionsPerBrowser: 1,
	//sessionsPerBrowser: 1,
	testTimeout: 3000000,
	testsPerSession: 1,
	httpTimeout: 3000000,
	plugins: {
		'html-reporter/hermione': {
			path: 'report'
		},
		'hermione-create-el': true,
		'hermione-insertPhone': true,
		'hermione-getUser': true,
		'hermione-regUser': true,
		'hermione-getUserInfo': true,
		'hermione-getOrderInfo': true,
		'hermione-isShowEL': true
		/*'hermione-wdio-migrator': {
			enabled: false
		}*/
	},
	windowSize: '1920x2000',
	//screenshotMode:'auto',
	//compositeImage:true,
	prepareBrowser: browser => {
		browser.extendOptions({
			deprecationWarnings: false
		})
	}
}
