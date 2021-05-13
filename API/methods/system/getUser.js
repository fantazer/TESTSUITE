const fetch = require('node-fetch')
const getToken = require('@api/methods/system/getToken.js')
const profileData = require('@api/methods/system/systemConfig.js')

//phone = 79261939959

let getProfileInfo = async () => {
	try {
		let token = await getToken
		//get USERDATA
		let resProfile = await fetch(profileData.urlPhone, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token.access_token
			}
		})
		if (resProfile.status != 204) {
			let resProfileData = await resProfile.text()
			profileData.data = await JSON.parse(resProfileData)
		} else {
			profileData.exception = resProfile.status
		}
		return profileData
	} catch (e) {
		console.log(e.message)
	}
}

module.exports = getProfileInfo
