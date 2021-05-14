const fetch = require('node-fetch')
const getToken = require('@api/methods/system/getToken.js')
const profileData = require('@api/methods/system/systemConfig.js')

let getOrderInfo = async () => {
	try {
		let token = await getToken
		//get USERDATA
		let resOrder = await fetch(
			profileData.urlOrder + profileData.phone + '&orderCount=10',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token.access_token
				}
			}
		)
		let resOrderData = await resOrder.text()
		let resOrderDataVal = await JSON.parse(resOrderData)
		if (resOrderDataVal.name === undefined) {
			throw '=== USER HAS NOT ORDER ==='
		}
		return resOrderData
	} catch (e) {
		console.log(e)
		throw new Error(e)
	}
}

module.exports = getOrderInfo

//getProfileInfo().then(()=>{console.log(profileData.data)})
