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
		if (resProfile.status !== 204) {
			throw '===PHONE IS PRESENT==='
		}
		return profileData
	} catch (e) {
		throw new Error(e)
	}
}

module.exports = getProfileInfo
