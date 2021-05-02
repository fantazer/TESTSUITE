module.exports = {
	sets: {
		desktop: {
			files: 'tests/'
		}
	},

	browsers: {
		chrome: {
			desiredCapabilities: {
				browserName: 'chrome', // this browser should be installed on your OS

			}
		},
	},
	plugins:{
		'html-reporter/hermione':{
			path:'hermione-html-reporter'
		}
	},
	windowSize: '1920x2000',
	prepareBrowser: (browser) => {
    browser.extendOptions({deprecationWarnings: false});
}
};