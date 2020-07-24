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
    return new Promise(async (resolve, reject) => {
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

// module 1
function module1FillForm() {
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
        await places[2].click();
        //random địa điểm đến
        places = await driver.
        findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
        let randomToPlace = await getArrivedPlace(places.length);
        while (randomToPlace == randomPlace) {
            console.log('vui lòng không chọn điểm đi và đến giống nhau')
            randomToPlace = await getArrivedPlace(places.length);
        }
        console.log('chọn địa điểm thành công')
        await places[8].click();
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
        let adult_num = 2,
            child_num = 1,
            baby_num = 0;
        let adult = await driver.findElement(By.xpath("//select[@id='IBEAldultSelect']//option[contains(text(),'" + adult_num + "')]"))
        await adult.click();
        let child = await driver.findElement(By.xpath("//select[@id='IBEChildSelect']//option[contains(text(),'" + child_num + "')]"))
        await child.click();
        let baby = await driver.findElement(By.xpath("//select[@id='IBEInfantSelect']//option[contains(text(),'" + baby_num + "')]"))
        await baby.click();
        if (adult_num + child_num + baby_num > 9) {
            console.log('không được chọn quá 9 người');
            resolve(0)
        } else {
            await wait(2000);
            let searchFlight = await driver.findElements(webdriver.By.css(".IBESearchButton"));
            await searchFlight[0].click();
            resolve(1);
        }

    });
}

function module1() {
    return new Promise(async (resolve, reject) => {
        let _openPage = await openPage();
        let _fillForm = await module1FillForm();
        await wait(2000);
    });
}
// end module 1

// module 2
function module1_1chieuFillForm() {
    return new Promise(async (resolve, reject) => {
        //mở list địa điểm
        let placesInput = await driver.findElements(webdriver.By.css('.IBESearchAutoCompleteWrapper input'));
        await placesInput[0].click();
        // random địa điểm đi
        let places = await driver.
        findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
        let randomPlace = Math.floor(Math.random() * Number(places.length));
        await places[2].click();
        //random địa điểm đến
        places = await driver.
        findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
        let randomToPlace = await getArrivedPlace(places.length);
        while (randomToPlace == randomPlace) {
            console.log('Bạn không được chọn điểm đến và điểm đi giống nhau.');
            console.log('Đang chọn lại')
            randomToPlace = await getArrivedPlace(places.length);
        }
        // await places[randomToPlace].click();
        await places[8].click();
        //chọn ngày giờ
        let openDatePickers = await driver.findElements(webdriver.By.css(".hasDatepicker"));
        await openDatePickers[0].click();
        await wait(2000);
        let pickDate = await driver.findElements(webdriver.By.css(".ui-datepicker-calendar td:not(.ui-state-disabled)"));
        let randomDates = Math.floor(Math.random() * Number(pickDate.length));
        await pickDate[2].click();
        let adult_num = 2,
            child_num = 1,
            baby_num = 0;
        let adult = await driver.findElement(By.xpath("//select[@id='IBEAldultSelect']//option[contains(text(),'" + adult_num + "')]"))
        await adult.click();
        let child = await driver.findElement(By.xpath("//select[@id='IBEChildSelect']//option[contains(text(),'" + child_num + "')]"))
        await child.click();
        let baby = await driver.findElement(By.xpath("//select[@id='IBEInfantSelect']//option[contains(text(),'" + baby_num + "')]"))
        await baby.click();
        if (adult_num + child_num + baby_num > 9) {
            console.log('không được chọn quá 9 người');
            resolve(0)
        } else {
            await wait(2000);
            let searchFlight = await driver.findElements(webdriver.By.css(".IBESearchButton"));
            await searchFlight[0].click();
            await driver.wait(until.elementLocated(By.css('#lbtSortByAirlines'), 10000))
            await wait(2000);
            resolve(1);
        }

    });
}

function module1_1chieu() {
    return new Promise(async (resolve, reject) => {
        let _openPage = await openPage();
        let _fillForm = await module1_1chieuFillForm();
        resolve(1)
    });
}

function module2() {
    return new Promise(async (resolve, reject) => {
        let sortByBrand = await driver.findElements(webdriver.By.css('#lbtSortByAirlines'));
        await sortByBrand[0].click();
        await wait(2000);
        let sortByDepatureTime = await driver.findElements(webdriver.By.css('#lbtSortByDepatureTime'));
        await sortByDepatureTime[0].click();
        await wait(2000);
        let sortByArrivalTime = await driver.findElements(webdriver.By.css('#lbtSortByArrivalTime'));
        await sortByArrivalTime[0].click();
        await wait(2000);
        let sortByDuration = await driver.findElements(webdriver.By.css('#lbtSortByFlightDuration'));
        await sortByDuration[0].click();
        await wait(2000);
        let sortByPrice = await driver.findElements(webdriver.By.css('#IBEPriceType .BoxContent label'));
        await sortByPrice[1].click();
        await wait(4000);

        // lọc theo giá chưa gồm thuế
        let sortByPriceType = await driver.findElements(webdriver.By.css('#IBEPriceType .BoxContent label'));
        await sortByPriceType[1].click();
        await wait(2000);

        let choiceBrand = await driver.findElements(webdriver.By.css('.IBEHasCheckbox.ckbIBEListAirlines label'));
        if (choiceBrand.length < 2) {
            console.log("Không có chuyến bay nào");
            resolve(0);
        } else {
        	choiceBrand = await driver.findElements(webdriver.By.css('.IBEHasCheckbox.ckbIBEListAirlines label'));
        	await choiceBrand[1].click();
        	await wait(2000);

            let choiceFlight = await driver.findElements(webdriver.By.css("#IBEDOMDepartureFlight .IBESelectFlight"));
            await choiceFlight[0].click();

            await driver.wait(until.elementLocated(By.css('#IBEPnBaggagesSelect'), 10000));
            resolve(1);
        }
    })
}
// end module 2  

function module3() {
	return new Promise(async (resolve, reject) => {
		
	})
}
async function start() {
    // await module1();
    await module1_1chieu();
    let module2_rs = await module2();
    if(module2_rs == 0) {
    	console.log('Không có chuyến bay nào'); 
    } else {
    	await module3();
    } 
    
};

start();