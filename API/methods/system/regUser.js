let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()

const fetch = require('node-fetch')
const getToken = require('@api/methods/system/getToken.js')

let regUser = async numberPhone => {
	try {
		let token = await getToken
		//get USERDATA
		let regUserAction = await fetch(mainConfig.apiUrlList.urlRegUser, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token.access_token
			},
			body: JSON.stringify({
				name: 'GEROME',
				phone: numberPhone,
				email: '',
				addresses: [
					{
						cityId: 'B090DE0B-8550-6E17-70B2-BBBA152BCBD3',
						streetId: '44C509AD-8384-23A9-0155-8C76D62D0903',
						regionId: '07054AA4-BDB2-2B28-0160-4AAF9F05DC36',
						home: '5',
						apartment: '1'
					}
				]
			})
		})
		let regUserActionData = await regUserAction.text()
		let regUserActionDataVal = await JSON.parse(regUserActionData)
		if (regUserActionDataVal.name === undefined) {
			console.log('Reg User - FALSE')
			throw '=== REG USER FALSE! ==='
		} else {
			//console.log('Reg User - TRUE')
		}
		return regUserAction
	} catch (e) {
		console.log(e)
		throw new Error(e)
	}
}

module.exports = regUser
