/*
	Описание теста: Проверка Авторизации
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))();
fetch = require('node-fetch')

const config = require('@config/config.json');
const query = require('@querySelector/order/simpleOrder.json');
const url = config.urls.client;

let courseData = {
	"extralight": {
		"ration_id": "294",
		"name": "Extralight",
		"name_course": "Extralight",
		"code": "extralight",
		"courseId": "a33c0746-b4d6-434f-b85f-08d83e0cf875",
		"kkal": "800-950",
		"xml": "9e4463dd-c5ae-4ddd-b9a6-08d8ac9f4ae9",
		"xml7": "23bce380-50ac-4f44-b9a5-08d8ac9f4ae9",
		"xml6": "3e8d4ed1-ed83-4470-8f4d-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-greenDark",
		"woman": "45335",
		"smile": "\/upload\/uf\/40e\/40efcd2d1af45907d8492bccc9b00d63.png",
		"podpis_smile": "стройность",
		"price_priem": {"day": "845", "priem": "211"},
		"price": "4700",
		"price7": "6500",
		"price6": "5400"
	},
	"light": {
		"ration_id": "2",
		"name": "Light",
		"name_course": "Light",
		"code": "light",
		"courseId": "d2b552d3-1698-4caf-b8d5-59befb96157d",
		"kkal": "1000-1200",
		"xml": "468c0a8e-b9df-46c2-a18f-a97e89964142",
		"xml7": "ab499ca6-b797-43c7-9d43-a5be46a83f14",
		"xml6": "0a8766b1-eb88-4044-8f4f-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-greenDark",
		"woman": "45879",
		"smile": "\/upload\/uf\/35c\/35ce67d14234807db043e88a44629a0d.png",
		"podpis_smile": "стройность",
		"price_priem": {"day": "872", "priem": "174"},
		"price": "4700",
		"price7": "6500",
		"price6": "5750"
	},
	"normal": {
		"ration_id": "1",
		"name": "Normal",
		"name_course": "Normal",
		"code": "normal",
		"courseId": "47649797-d3fb-4aaf-b2d7-5bfa600aa253",
		"kkal": "1300-1500",
		"xml": "c52d0e8f-aee1-464c-ba21-10196e120f4c",
		"xml7": "e5b77a57-f537-476a-872d-3d4a7470e097",
		"xml6": "be09a00e-3ca1-4f45-8f50-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-pink",
		"woman": "45328",
		"smile": "\/upload\/uf\/769\/769362a10c6ac98a795b5dda35621fae.png",
		"podpis_smile": "будь в форме",
		"price_priem": {"day": "872", "priem": "174"},
		"price": "4700",
		"price7": "6500",
		"price6": "5750"
	},
	"balance": {
		"ration_id": "257",
		"name": "Balance",
		"name_course": "Balance",
		"code": "balance",
		"courseId": "0d85db6c-214b-4055-98ce-467bd43155e3",
		"kkal": "1700-1900",
		"xml": "01f3ab43-5bb6-4612-a06d-fef985a46d17",
		"xml7": "c39de07e-8f65-4b23-a882-b20c2abb9605",
		"xml6": "945da43d-c285-41de-8f4c-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-violet",
		"woman": "45330",
		"smile": "\/upload\/uf\/958\/95812c3113eacbdff73620a1a2fa825e.png",
		"podpis_smile": "активность",
		"price_priem": {"day": "964", "priem": "160"},
		"price": "5200",
		"price7": "7200",
		"price6": "6200"
	},
	"strong": {
		"ration_id": "3",
		"name": "Strong",
		"name_course": "Strong",
		"code": "strong",
		"courseId": "97c0df72-77c0-47ee-b1a2-1b408a503bed",
		"kkal": "2100-2300",
		"xml": "73f5db89-d524-4b4d-b237-8301117cd43f",
		"xml7": "3b66a070-caa3-452e-8440-501160ff7e5b",
		"xml6": "a12df5fb-719f-4114-8f51-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-coral",
		"woman": "45327",
		"smile": "\/upload\/uf\/bd6\/bd688d25661a4081a140e28679800e5e.png",
		"podpis_smile": "сила",
		"price_priem": {"day": "1017", "priem": "145"},
		"price": "5500",
		"price7": "7600",
		"price6": "6600"
	},
	"veggi": {
		"ration_id": 256,
		"name": "Veggi",
		"name_course": "Vegan",
		"code": "veggi",
		"courseId": "08ced0e6-be5a-4b40-9919-c4a78a9c6965",
		"kkal": "1100-1300",
		"xml": "c5bd72b7-6ddb-47b6-92da-245ec649afb1",
		"xml7": "cafeedb0-dcdf-4347-b4d0-8943f8395ece",
		"xml6": "b93025d7-691e-4b87-8f52-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-swapm",
		"woman": "45326",
		"smile": "\/upload\/uf\/ad3\/ad3509dbdf6ecbac9b91911b31d948e9.png",
		"podpis_smile": "без мяса",
		"price_priem": {"day": "872", "priem": "174"},
		"price": "4700",
		"price7": "6500",
		"price6": "5750"
	},
	"vegetarian": {
		"ration_id": "289",
		"name": "Vegetarian",
		"name_course": "Vegetarian",
		"code": "vegetarian",
		"courseId": "7c805d47-f3e9-43ae-53c9-08d7dc68dd49",
		"kkal": "1100-1300",
		"xml": "b4be1523-9e25-4e88-640d-08d8e45b59c1",
		"xml7": "fa826929-b0a3-43e5-a129-ca532c674eae",
		"xml6": "b4090e9c-620b-4b7a-8f5a-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-swapm",
		"woman": "45336",
		"smile": "\/upload\/uf\/671\/671ba14a887ba79a69d34bd1017f12bd.png",
		"podpis_smile": "без мяса",
		"price_priem": {"day": "872", "priem": "174"},
		"price": "5100",
		"price7": "6400",
		"price6": "5750"
	},
	"fish": {
		"ration_id": "278",
		"name": "Fish",
		"name_course": "Fish",
		"code": "fish",
		"courseId": "cedc213a-34fb-411d-981f-08d73143821a",
		"kkal": "1200-1500",
		"xml": "2d0b842b-89d6-46db-5dc6-08d8d41b68a6",
		"xml7": "a1339229-7b4d-4e08-5dc7-08d8d41b68a6",
		"xml6": "2b6a9996-4cd3-4519-8f4e-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-sea",
		"woman": "45333",
		"smile": "\/upload\/uf\/820\/820c9df823130c1f295f791d227747f8.png",
		"podpis_smile": "энергия",
		"price_priem": {"day": "951", "priem": "190"},
		"price": "4600",
		"price7": "4900",
		"price6": "6700"
	},
	"daily": {
		"ration_id": "272",
		"name": "Daily",
		"name_course": "Daily",
		"code": "daily",
		"courseId": "70959538-c878-4eef-bf73-cb10815f7a4c",
		"kkal": "700-900",
		"xml": "84822251-11a8-436c-957b-23c439f49271",
		"xml7": "c642f2ee-175a-4012-b999-61cbf8974a78",
		"xml6": "84822251-11a8-436c-957b-23c439f49271",
		"xmlCorp": "3f14769a-7e98-4f65-9ffe-e935f83eb965",
		"color": "bg-blue",
		"woman": "45331",
		"smile": "\/upload\/uf\/434\/4344b4b0a3d2d139080be807182aa28d.png",
		"podpis_smile": "вкусно",
		"price_priem": {"day": "493", "priem": "164"},
		"price": "2900",
		"price7": "3430",
		"priceCorp": "2465",
		"price6": "2900"
	},
	"everydaily": {
		"ration_id": "276",
		"name": "Everydaily",
		"name_course": "Everydaily",
		"code": "everydaily",
		"courseId": "25d2384f-e72b-42d0-30d6-08d719087f49",
		"kkal": "500-1000",
		"xml": "2e833e5f-bcc2-4978-d809-08d8d278254d",
		"xml7": "9b288771-f53d-4def-d80a-08d8d278254d",
		"xml6": "2e833e5f-bcc2-4978-d809-08d8d278254d",
		"xmlCorp": "c1e25abc-5664-421e-d813-08d8d278254d",
		"color": "bg-violet",
		"woman": "45332",
		"smile": "\/upload\/uf\/3e8\/3e806ac753ac8cb450ac1ad9b4b85475.png",
		"podpis_smile": "по-домашнему",
		"price_priem": {"day": "493", "priem": "164"},
		"price": "1900",
		"price7": "2430",
		"priceCorp": "1450",
		"price6": "1900"
	},
	"detox": {
		"ration_id": "270",
		"name": "Detox",
		"name_course": "Detox",
		"code": "detox",
		"courseId": "0d04bc70-2ebb-420f-9d3c-4ec5bbd877ab",
		"kkal": "1100-1200",
		"xml": "27215f1c-fd0b-4c71-9db8-97f1940f884d",
		"xml7": "6599a7f2-2ec5-4ed6-9663-016ea15b2c25",
		"xml6": "27215f1c-fd0b-4c71-9db8-97f1940f884d",
		"xmlCorp": null,
		"color": "bg-orange",
		"woman": "45334",
		"smile": "\/upload\/uf\/707\/70745eeb223be6bf0c9abd09bf068f5f.png",
		"podpis_smile": "очищение",
		"price_priem": {"day": "2090", "priem": "298"},
		"price": "2090",
		"price7": "3490",
		"price6": "2090"
	},
	"post": {
		"ration_id": 256,
		"name": "Post",
		"name_course": "Пост",
		"code": "post",
		"courseId": "08ced0e6-be5a-4b40-9919-c4a78a9c6965",
		"kkal": "1100-1200",
		"xml": "b93025d7-691e-4b87-8f52-08d8d9639d5c",
		"xml7": "cafeedb0-dcdf-4347-b4d0-8943f8395ece",
		"xml6": "b93025d7-691e-4b87-8f52-08d8d9639d5c",
		"xmlCorp": null,
		"color": "bg-swapm",
		"woman": "45881",
		"smile": "\/upload\/uf\/4b2\/4b28d302f19222ab1a38e543184a60d3.png",
		"podpis_smile": "без мяса",
		"price_priem": {"day": "872", "priem": "174"},
		"price": "5750",
		"price7": "6500",
		"price6": "5750"
	}
}

//courseData = JSON.parse(courseData)
//let list = [query.size.size1.query, query.size.size4.query]
let list = [query.size.size1.query,query.size.size2.query,query.size.size3.query, query.size.size4.query]
describe('Order', function () {
	beforeEach(function (done) {

		//return jsonData;
	});
	it("orderSimple", function () {
		let browser = this.browser
		let heightEl
		return browser
				.url(url.root+"?new")
				.url(url.root+"?ISTEST")
				.windowHandleSize({width: 1920, height: 1200})
				//.waitForExist(query.contract, 50000)
				.waitForExist('.page', 50000)
				.then((data)=>{
					return (async ()=>{
						heightEl = await browser.getCssProperty(".page", 'height').value
						console.log(heightEl);
						return heightEl
					})()
				})
				//.assertView("contractForm", query.contract, mainConfig.tolerance)
				/*.$('.page')
				.then((data)=>{
					return (async ()=>{
						El.heightEl = await browser.getCssProperty(".page", 'height').value
						console.log(El.heightEl);
						return El.heightEl
					})()
				})*/
				.pause(1000)
				.assertView("page", ".page",mainConfig.tolerance)
			/*	.$$(".program-type__el")
				.then((data) => {
					return (async (data)=> {
						for (let item of data) {
							await browser.element(`${item.selector}:nth-child(${item.index+1})`).click().pause(2000)
						}
					})(data)
				})*/


				.pause(5000)
	});
});


// hermione gui --update-refs
// selenium-standalone start

//Промис 1
//Цикл промисов - ?
//Промис 2

