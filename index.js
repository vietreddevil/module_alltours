const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const prompt = require("prompt-async");
const XLSX = require('xlsx');
const firefox = require('selenium-webdriver/firefox');


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
function module1FillForm(from, to, adult_num, child_num, baby_num) {
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
        let randomPlace;
        if (from == "") {
            randomPlace = Math.floor(Math.random() * Number(places.length))
        } else {
            randomPlace = from;
        }
        await wait(1000);
        await places[randomPlace].click();
        //random địa điểm đến
        places = await driver.
        findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
        let randomToPlace;
        if (to == "") {
            randomToPlace = await getArrivedPlace(places.length)
        } else {
            randomToPlace = to;
        }
        await wait(1000);
        while (randomToPlace == randomPlace) {
            console.log('vui lòng không chọn điểm đi và đến giống nhau')
            randomToPlace = await getArrivedPlace(places.length);
        }
        console.log('chọn địa điểm thành công')
        await places[randomToPlace].click();
        //chọn ngày giờ
        let openDatePickers = await driver.findElements(webdriver.By.css(".hasDatepicker"));
        await openDatePickers[0].click();
        await wait(2000);
        let pickDate = await driver.findElements(webdriver.By.css(".ui-datepicker-calendar td:not(.ui-state-disabled)"));
        let randomDates = Math.floor(Math.random() * Number(pickDate.length));
        await pickDate[1].click();
        await wait(2000);
        let pickDateComeBack = await driver.findElements(webdriver.By.css("#ui-datepicker-div td:not(.ui-state-disabled)"));
        await pickDateComeBack[3].click();
        let adult = await driver.findElement(By.xpath("//select[@id='IBEAldultSelect']//option[contains(text(),'" + adult_num + "')]"))
        await adult.click();
        let child = await driver.findElement(By.xpath("//select[@id='IBEChildSelect']//option[contains(text(),'" + child_num + "')]"))
        await child.click();
        let baby = await driver.findElement(By.xpath("//select[@id='IBEInfantSelect']//option[contains(text(),'" + baby_num + "')]"))
        await baby.click();
        await wait(2000);
        let chat = await driver.findElements(webdriver.By.css(".vgc_ic.vgc_client_close_polls"));
        if(chat.length > 0) {
            await chat[0].click();
            await wait(2000)
        }
            
        let searchFlight = await driver.findElements(webdriver.By.css(".IBESearchButton"));
        await searchFlight[0].click();
        await driver.wait(until.elementLocated(By.css('#lbtSortByAirlines'), 10000));
        await wait(2000);
        resolve(1);
    });
}

function module1() {
    return new Promise(async (resolve, reject) => {
        let _openPage = await openPage();
        let _fillForm = await module1FillForm('', '', 7, 7, 0);
        await wait(2000);
        resolve(1);
    });
}
// end module 1

// module 2
function module1_1chieuFillForm(from, to, adult_num, child_num, baby_num) {
    return new Promise(async (resolve, reject) => {
        //mở list địa điểm
        let placesInput = await driver.findElements(webdriver.By.css('.IBESearchAutoCompleteWrapper input'));
        await placesInput[0].click();
        // random địa điểm đi
        let places = await driver.
        findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
        let randomPlace;
        if (from == "") {
            randomPlace = Math.floor(Math.random() * Number(places.length))
        } else {
            randomPlace = from;
        }
        await wait(1000);
        await places[randomPlace].click();
        //random địa điểm đến
        places = await driver.
        findElements(webdriver.By.css('#IBESelectAirPortWrapper ul#IBESelectAirPortRegion ul li'));
        let randomToPlace;
        if (to == "") {
            randomToPlace = await getArrivedPlace(places.length)
        } else {
            randomToPlace = to;
        }
        await wait(1000);
        while (randomToPlace == randomPlace) {
            console.log('Bạn không được chọn điểm đến và điểm đi giống nhau.');
            console.log('Đang chọn lại')
            randomToPlace = await getArrivedPlace(places.length);
        }
        // await places[randomToPlace].click();
        await places[randomToPlace].click();
        //chọn ngày giờ
        let openDatePickers = await driver.findElements(webdriver.By.css(".hasDatepicker"));
        await openDatePickers[0].click();
        await wait(2000);
        let pickDate = await driver.findElements(webdriver.By.css(".ui-datepicker-calendar td:not(.ui-state-disabled)"));
        let randomDates = Math.floor(Math.random() * Number(pickDate.length));
        await pickDate[2].click();
        let adult = await driver.findElement(By.xpath("//select[@id='IBEAldultSelect']//option[contains(text(),'" + adult_num + "')]"))
        await adult.click();
        let child = await driver.findElement(By.xpath("//select[@id='IBEChildSelect']//option[contains(text(),'" + child_num + "')]"))
        await child.click();
        let baby = await driver.findElement(By.xpath("//select[@id='IBEInfantSelect']//option[contains(text(),'" + baby_num + "')]"))
        await baby.click();
        await wait(2000); 
        let chat = await driver.findElements(webdriver.By.css(".vgc_ic.vgc_client_close_polls"));
        if(chat.length > 0) {
            await chat[0].click();
            await wait(2000)
        }
        
    //

        let searchFlight = await driver.findElements(webdriver.By.css(".IBESearchButton"));
        await searchFlight[0].click();
        await driver.wait(until.elementLocated(By.css('#lbtSortByAirlines'), 10000));
        await wait(2000);
        resolve(1);
    });
}

function module1_1chieu() {
    return new Promise(async (resolve, reject) => {
        await openPage();
        await module1_1chieuFillForm('', '', 7, 7, 0);
        resolve(1)
    });
}

function checkModule1Error() {
    return new Promise(async (resolve, reject) => {
        let screenName = new Date().toISOString().replace(/-/g, '_').replace(/:/g, '_').replace(/\./g, '_');
        driver.takeScreenshot().then(
            async function(image, err) {
                require('fs').writeFile('./output/' + screenName + '.png', image, 'base64', function(e) {
                    if (e) { console.log(e) };
                });
                await wait(2000);
                // await openPage();
                // await module1_1chieuFillForm(2, 8, 1, 0, 0);
                await module1FillForm(2, 8, 1, 0, 1);
                resolve(1);
            }
        );
    })
}

function module2() {
    return new Promise(async (resolve, reject) => {
        console.log('md2');
        // let sortByBrand = await driver.findElements(webdriver.By.css('#lbtSortByAirlines'));
        // await sortByBrand[0].click();
        // await wait(2000);
        // let sortByDepatureTime = await driver.findElements(webdriver.By.css('#lbtSortByDepatureTime'));
        // await sortByDepatureTime[0].click();
        // await wait(2000);
        // let sortByArrivalTime = await driver.findElements(webdriver.By.css('#lbtSortByArrivalTime'));
        // await sortByArrivalTime[0].click();
        // await wait(2000);
        // let sortByDuration = await driver.findElements(webdriver.By.css('#lbtSortByFlightDuration'));
        // await sortByDuration[0].click();
        // await wait(2000);
        // let sortByPrice = await driver.findElements(webdriver.By.css('#IBEPriceType .BoxContent label'));
        // await sortByPrice[0].click();
        await wait(2000);

        // lọc theo giá chưa gồm thuế
        let sortByPriceType = await driver.findElements(webdriver.By.css('#IBEPriceType .BoxContent label'));
        await sortByPriceType[1].click();
        await wait(2000);
        let chat = await driver.findElements(webdriver.By.css(".vgc_ic.vgc_client_close_polls"));
        if(chat.length > 0) {
            await chat[0].click();
            await wait(2000)
        }
        let choiceBrand = await driver.findElements(webdriver.By.css('.IBEHasCheckbox.ckbIBEListAirlines label'));
        if (choiceBrand.length < 2) {
            console.log("Không có chuyến bay nào");
            resolve(0);
        } else {
            for await (let brand of choiceBrand) {
                await brand.click();
                await wait(2000);
            }

            for await (let brand of choiceBrand) {
                let text = await brand.getAttribute('innerHTML');
                if (text.trim() != 'Chọn tất cả') {
                    await brand.click();
                    await wait(2000);
                }
            }


            let isHasVJ = await driver.findElements(webdriver.By.css('.VJ'));
            if (isHasVJ.length > 0) {
                await isHasVJ[0].click();
            } else {
                choiceBrand = await driver.findElements(webdriver.By.css('.IBEHasCheckbox.ckbIBEListAirlines label'));
                await choiceBrand[1].click();
            }

            await saveInfo();
            await wait(2000);
            let choiceFlight = await driver.findElements(webdriver.By.css('#IBEDOMDepartureFlight .FlightItem:not([style*="display: none"]) .IBESelectFlight'));
            await choiceFlight[0].click();
            let returnFlight = await driver.findElements(webdriver.By.css('#IBEDOMReturnFlight .FlightItem:not([style*="display: none"]) .IBESelectFlight'));
            if (returnFlight.length > 0) {
                await returnFlight[0].click()
            }
            resolve(1);
        }
    })
}

function saveInfo() {
    return new Promise(async (resolve, reject) => {
        await openDetail();
        await wait(2000);
        let citiesDepart = await driver.findElements(webdriver.By.css('.FlightDetail.HasData .Depart .City'));
        let timesDepart = await driver.findElements(webdriver.By.css('.FlightDetail.HasData .Depart .FlightDate'));
        let citiesArrival = await driver.findElements(webdriver.By.css('.FlightDetail.HasData .Arrival .City'));
        let timesArrival = await driver.findElements(webdriver.By.css('.FlightDetail.HasData .Arrival .FlightDate'));
        let seatClass = await driver.findElements(webdriver.By.css('.FlightDetail.HasData .SeatClass div:nth-child(1) b'));
        let passengerANum = await driver.findElements(webdriver.By.css('.TablePrice tbody tr:nth-child(2) td:nth-child(2)'));
        let passengerCNum = await driver.findElements(webdriver.By.css('.TablePrice tbody tr:nth-child(3) td:nth-child(2)'));
        let passengerBNum = await driver.findElements(webdriver.By.css('.TablePrice tbody tr:nth-child(4) td:nth-child(2)'));
        let flnums = await driver.findElements(webdriver.By.css('.FltNum b'));
        let infos = [];
        for await (let [index, flnum] of flnums.entries()) {
            let departCity = await citiesDepart[index].getAttribute('innerHTML');
            let arrivalCity = await citiesArrival[index].getAttribute('innerHTML');
            let departTime = await timesDepart[index].getAttribute('innerHTML');
            let arrivalTime = await timesArrival[index].getAttribute('innerHTML');
            let seat = await seatClass[index].getAttribute('innerHTML');
            let adult = await passengerANum[index].getAttribute('innerHTML');
            let child = await passengerCNum[index].getAttribute('innerHTML');
            let baby = await passengerBNum[index].getAttribute('innerHTML');
            let flnum = await flnums[index].getAttribute('innerHTML');
            let info = {
                "Nơi đi": departCity.trim(),
                "Nơi đến": arrivalCity.trim(),
                "Thời gian đi": departTime,
                "Thời gian đến": arrivalTime,
                "Số hiệu máy bay": flnum,
                "Người lớn": adult.replace(/\\n/g, '').trim(),
                "Trẻ em": child.replace(/\\n/g, '').trim(),
                "Em bé": baby.replace(/\\n/g, '').trim(),
                "Loại ghế": seat
            };
            infos.push(info);
        }
        var newWB = XLSX.utils.book_new();
        var newWS = XLSX.utils.json_to_sheet(infos);
        XLSX.utils.book_append_sheet(newWB, newWS, 'Sheet 1');
        XLSX.writeFile(newWB, './output/output.xlsx');
        resolve(1);
    });
}

function openDetail() {
    return new Promise(async (resolve, reject) => {
        let details = await driver.findElements(webdriver.By.css('.FlightItem:not([style*="display: none"]) .Detail a'));
        for await (let detail of details) {
            await detail.click();
            await wait(2000);
        }
        resolve(1);
    })
}
// end module 2  FlightDetail HasData 

function module3() {
    return new Promise(async (resolve, reject) => {
        console.log('md3');
        let workbook = XLSX.readFile('input.xlsx');
        let sheet_name_list = workbook.SheetNames;
        let sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        await driver.wait(until.elementLocated(By.css('#lblBasketGrandTotal'), 10000));
        let passengersFirstName = await driver.findElements(webdriver.By.css('.PersionFirstName'));
        for await (let [index, passenger] of passengersFirstName.entries()) {
            await passenger.sendKeys(sheet1[index].first_name);
        }
        let passengersLastName = await driver.findElements(webdriver.By.css('.PersionLastName'));
        for await (let [index, passenger] of passengersLastName.entries()) {
            await passenger.sendKeys(sheet1[index].last_name);
        }
        let babyBirths = await driver.findElements(webdriver.By.css('.PersionBirthday'));
        if(babyBirths.length > 0) {
            for await (let [index, babyBirth] of babyBirths.entries()) {
                await babyBirth.click();
                let next = await driver.findElements(webdriver.By.css('.ui-datepicker-next.ui-corner-all'));
                await next[0].click();
                await wait(2000);
                let pickDate = await driver.findElements(webdriver.By.css('.ui-datepicker-calendar td:not(.ui-state-disabled)'));
                await pickDate[pickDate.length - 1].click();
            } // 
        }

        let contactName = await driver.findElements(webdriver.By.css('#txtContactName'));
        await contactName[0].sendKeys(sheet1[0].interactor_name);
        await wait(1000);
        let phoneNumber = await driver.findElements(webdriver.By.css('#txtPhoneNumber'));
        await phoneNumber[0].sendKeys(sheet1[0].phone);
        await wait(1000);

        //btnBook
        let btnBook = await driver.findElements(webdriver.By.css('#btnBook'));
        await btnBook[0].click();
        await wait(2000);
        await takeScreenshot();
        let email = await driver.findElements(webdriver.By.css('#txtEmail'));
        await email[0].sendKeys(sheet1[0].email);
        await wait(1000);
        let baggages = await driver.findElements(webdriver.By.css('.baggagePickOption'));
        if (baggages.length > 0) {
            for await (let [index, passenger] of passengersFirstName.entries()) {
                let baggageOptions = await driver.findElements(webdriver.By.css('.baggagePickOption'));
                await baggageOptions[index * 7 + 1].click();
            }
        }
        let checkBox = await driver.findElements(webdriver.By.css('.Header.IBEHasCheckbox label'));
        await checkBox[0].click();
        let company = await driver.findElements(webdriver.By.css('#txtCompanyName'));
        await company[0].sendKeys(sheet1[0].company)
        await wait(1000);
        let txtCompanyAddress = await driver.findElements(webdriver.By.css('#txtCompanyAddress'));
        await txtCompanyAddress[0].sendKeys(sheet1[0].address)
        await wait(1000);
        let txtCompanyCity = await driver.findElements(webdriver.By.css('#txtCompanyCity'));
        await txtCompanyCity[0].sendKeys(sheet1[0].city)
        await wait(1000);
        let txtCompanyTaxCode = await driver.findElements(webdriver.By.css('#txtCompanyTaxCode'));
        await txtCompanyTaxCode[0].sendKeys(sheet1[0].vat)
        await wait(1000);
        let txtCompanyStaffName = await driver.findElements(webdriver.By.css('#txtCompanyStaffName'));
        await txtCompanyStaffName[0].sendKeys(sheet1[0].reciever)
        await wait(1000);

        btnBook = await driver.findElements(webdriver.By.css('#btnBook'));
        await btnBook[0].click();
        resolve(1);
    });
}

function takeScreenshot() {
    return new Promise(async (resolve, reject) => {
        let screenName = new Date().toISOString().replace(/-/g, '_').replace(/:/g, '_').replace(/\./g, '_');
        driver.takeScreenshot().then(
            async function(image, err) {
                require('fs').writeFile('./output/' + screenName + '.png', image, 'base64', function(e) {
                    if (e) { console.log(e) };
                });
                resolve(1);
            }
        );
    })
}

// baggagePickOption
async function start() {
    await module1();
    // await module1_1chieu();
    await checkModule1Error();
    await module2();
    await module3();
};

start();
