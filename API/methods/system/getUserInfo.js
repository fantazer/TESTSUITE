const fetch = require('node-fetch')
const getToken = require('@api/methods/system/getToken.js')
const profileData = require('@api/methods/system/systemConfig.js')

let getUserInfo = async () => {
	try {
		let token = await getToken
		//get USERDATA
		let resProfile = await fetch(profileData.urlOrder, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token.access_token
			}
		})
		let resProfileData = await resProfile.text()
		console.log(resProfileData)
		//profileData.data = await JSON.parse(resProfileData)
		/*if (resProfile.status != 204) {
		} else {
			profileData.exception = resProfile.status
		}*/
		return resProfileData
	} catch (e) {
		console.log(e)
	}
}

module.exports = getUserInfo

//getProfileInfo().then(()=>{console.log(profileData.data)})
