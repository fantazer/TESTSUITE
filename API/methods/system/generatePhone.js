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
			array: randomPhoneVal.toString().split(''),
			phone: '7' + randomPhoneVal
		}
	}
}

//let generateNumberVal = generateNumber()
//let phone = '7' + generateNumberVal.number

module.exports = generateNumber
