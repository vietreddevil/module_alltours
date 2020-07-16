const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const prompt = require("prompt-async");

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const driver = new webdriver.Builder().forBrowser('chrome').build();

const baseURL = 'https://alltours.vn/';

function openPage() {
    return new Promise(async (resolve, reject) => {
        await driver.get(baseURL);
        await driver.manage().window().maximize();
        await driver.wait(until.elementLocated(By.className('IBESearchAutoCompleteWrapper'), 8000))
        resolve(1);
    });
}

function getArrivedPlace(len) {
	return new Promise(async (resolve, reject) =>{
		let rs = Math.floor(Math.random() * Number(len));
		resolve(rs);
	})
}

function wait(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(1);
		}, ms)
	})
}

function fillForm() {
	return new Promise(async (resolve, reject) => {
		// chọn bay khứ hồi
		let flightType = await driver.findElements(webdriver.By.css(".IBERadioGroup.IBEProcessed label"));
		await flightType[0].click();
		//mở list địa điểm
		let placesInput = await driver.findElements(webdriver.By.css('.IBESearchAutoCompleteWrapper input'));
		await placesInput[0].click();
		// random địa điểm đi
		let places = await driver.
		findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
		let randomPlace = Math.floor(Math.random() * Number(places.length));
		await places[randomPlace].click();
		//random địa điểm đến
		places = await driver.
		findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
		let randomToPlace = await getArrivedPlace(places.length);
		while (randomToPlace == randomPlace) {
			randomToPlace = await getArrivedPlace(places.length);
		}
		await places[randomToPlace].click();
		//chọn ngày giờ
		let openDatePickers = await driver.findElements(webdriver.By.css(".hasDatepicker"));
		await openDatePickers[0].click(); 
		await wait(2000);
		let pickDate = await driver.findElements(webdriver.By.css(".ui-datepicker-calendar td:not(.ui-state-disabled)"));
		let randomDates = Math.floor(Math.random() * Number(pickDate.length));
		await pickDate[randomDates].click();
		await wait(2000);
		let pickDateComeBack = await driver.findElements(webdriver.By.css("#ui-datepicker-div td:not(.ui-state-disabled)"));
		let randomDatesComeback = await getArrivedPlace(pickDateComeBack.length); 
		await pickDateComeBack[randomDatesComeback].click(); 
		let adult = await driver.findElement(By.xpath("//select[@id='IBEAldultSelect']//option[contains(text(),'7')]"))
    	await adult.click();
    	let child = await driver.findElement(By.xpath("//select[@id='IBEChildSelect']//option[contains(text(),'2')]"))
	    await child.click();
	    let baby = await driver.findElement(By.xpath("//select[@id='IBEInfantSelect']//option[contains(text(),'2')]"))
	    await baby.click();
	    await wait(2000);
	    let searchFlight = await driver.findElements(webdriver.By.css(".IBESearchButton"));
	    await searchFlight[0].click();
	    resolve(1);
	});
}

function module1() {
    return new Promise(async (resolve, reject) => {
        let _openPage = await openPage();
        let _fillForm = await fillForm();
    });
}

async function start() {
    await module1();
};

start();