let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()

const fetch = require('node-fetch')
const getToken = require('@api/methods/system/getToken.js')

let getUserInfo = async numberPhone => {
	try {
		let token = await getToken
		//get USERDATA
		let resProfile = await fetch(
			mainConfig.apiUrlList.urlGetProfileInfo + numberPhone,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token.access_token
				}
			}
		)
		let resProfileData = await resProfile.text()
		let resProfileDataValue = await JSON.parse(resProfileData)

		return resProfileData
	} catch (e) {
		console.log(e.message)
	}
}

module.exports = getUserInfo

//getProfileInfo().then(()=>{console.log(profileData.data)})
