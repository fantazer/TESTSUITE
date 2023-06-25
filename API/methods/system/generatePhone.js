let generateNumber = function() {
	let getRandomPhone = () => Math.floor(Math.random() * Math.pow(8, 7))
	let randomPhoneVal = getRandomPhone()
	let phoneToString = randomPhoneVal.toString()
	//console.log(phoneToString.length)
	if (phoneToString.length <= 6) {
		//console.log('FIND ZERO!')
		return generateNumber()
	} else {
		randomPhoneVal = '222' + randomPhoneVal
		console.log('TEST PHONE ===> ', randomPhoneVal)
		return {
			number: randomPhoneVal,
			array: randomPhoneVal.toString().split(''),
			phone: '7' + randomPhoneVal
		}
	}
}

module.exports = generateNumber
