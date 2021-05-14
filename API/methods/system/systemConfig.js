let generateNumber = function() {
	let getRandomPhone = () => Math.floor(Math.random() * Math.pow(10, 9))
	let randomPhoneVal = getRandomPhone()
	let phoneToString = randomPhoneVal.toString()
	console.log(phoneToString.length)
	if (phoneToString.length <= 8) {
		console.log('FIND ZERO!')
		return generateNumber()
	} else {
		randomPhoneVal = '9' + randomPhoneVal
		return {
			number: randomPhoneVal,
			array: randomPhoneVal.toString().split('')
		}
	}
}

let urlTestServer = 'http://148.251.246.45:1444'
let generateNumberVal = generateNumber()
let phone = '7' + generateNumberVal.number
let profileData = {
	urlToken: urlTestServer + '/connect/token',
	urlPhone: urlTestServer + '/api/account/getCustomerByPhone?phone=' + phone,
	urlGetProfileInfo: urlTestServer + '/api/account/getCustomerByPhone?phone=',
	urlRegUser: urlTestServer + '/api/account/register',
	urlOrder:
		urlTestServer + '/api/customers/GetCustomerOrdersHistory?phoneNumber=',
	phone: phone,
	phoneArray: generateNumberVal.array,
	data: null,
	exception: null,
	name: null,
	nameProgram: null
}

module.exports = profileData
