let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()

const fetch = require('node-fetch')
const getToken = require('@api/methods/system/getToken.js')

//phone = 79261939959

let getProfileInfo = async phoneVal => {
	try {
		let token = await getToken
		//get USERDATA
		let resProfile = await fetch(mainConfig.apiUrlList.urlPhone + phoneVal, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token.access_token
			}
		})

		if (resProfile.status !== 204) {
			console.log('Get User - FALSE')
			throw '===PHONE IS PRESENT==='
		} else {
			//console.log('Get User - TRUE')
		}
		return resProfile
	} catch (e) {
		throw new Error(e)
	}
}

module.exports = getProfileInfo
