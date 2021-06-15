let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()

const fetch = require('node-fetch')
const getToken = require('@api/methods/system/getToken.js')

let getOrderInfo = async phoneVal => {
	try {
		let token = await getToken
		//get USERDATA

		let resOrder = await fetch(
			mainConfig.apiUrlList.urlOrder + phoneVal + '&orderCount=10',
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
		} else {
			console.log('Get Order - TRUE')
			//console.log(resOrderDataVal)
		}
		return resOrderData
	} catch (e) {
		console.log(e)
		throw new Error(e)
	}
}

module.exports = getOrderInfo

//getProfileInfo().then(()=>{console.log(profileData.data)})
