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
	sessionsPerBrowser: 5,
	plugins: {
		'html-reporter/hermione': {
			path: 'report'
		},
		'hermione-create-el': true
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
