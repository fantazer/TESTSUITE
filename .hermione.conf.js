module.exports = {
	sets: {
		desktop: {
			files: 'tests/',
			browsers: ['clientChrome']
		}
	},

	browsers: {
		clientChrome: {
			windowSize: '1920x1000',
			desiredCapabilities: {
				browserName: 'chrome' // this browser should be installed on your OS
			}
		}
	},
	sessionsPerBrowser: 2,
	testTimeout: 1000000,
	plugins: {
		'html-reporter/hermione': {
			path: 'report'
		},
		'hermione-create-el': true,
		'hermione-insertPhone': true,
		'hermione-getUser': true,
		'hermione-regUser': true,
		'hermione-getUserInfo': true,
		'hermione-getOrderInfo': true
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
