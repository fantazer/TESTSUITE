let FormData = require('form-data')
const fetch = require('node-fetch')
let urlTestServer = 'http://148.251.246.45:1444'

let connectInfo = new FormData()
connectInfo.append('client_id', 'clientApp')
connectInfo.append('grant_type', 'password')
connectInfo.append('password', 'Passw0rd!')
connectInfo.append('scope', 'openid offline_access BeFit profile roles')
connectInfo.append('username', 'api@test.com')

let getToken = async () => {
	//get TOKEN
	try {
		let response = await fetch(urlTestServer + '/connect/token', {
			method: 'POST',
			body: connectInfo,
			redirect: 'follow'
		})
		response = await response.text()
		let token = await JSON.parse(response)
		return token
	} catch (e) {
		console.log(e)
	}
}

module.exports = getToken()
