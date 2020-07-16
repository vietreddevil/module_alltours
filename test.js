const audult = '7'
const child = '7'
const baby = '7'


const { Builder, By, Key, until } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
const { elementLocated } = require('selenium-webdriver/lib/until');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

async function goToWeb() {
    await driver.get('https://alltours.vn/')
    // console.log(await driver.getPageSource())
    await driver.manage().window().maximize();
    await driver.wait(until.elementLocated(By.className('IBESearchAutoCompleteWrapper'), 8000))
}

async function fillFrom() {
    let element = await driver.findElement(By.xpath("//body/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div[1]/div[2]/div[1]/input[1]"))
    await element.click()
    let option = await driver.findElement(By.xpath("//li[contains(@class,'IBESelectAirPortRegionItem IBEPresetLocation')]//li[1]"))
    //let option = await element.selectByIndex(1)
    console.log(await option.getText())
    await option.click()
    if (!option) {
        console.log("Failed")
        exit()
    }

    let option2 = await driver.findElement(By.xpath("//span[contains(text(),'Hồ')]"))
    option2.click()

    let dateStart = await driver.findElement(By.xpath("//div[contains(@class,'IBESearchBoxStartDate')]//input[contains(@class,'hasDatepicker')]"))
    await dateStart.click()

    let disabledDays = await driver.findElements(By.className('ui-state-disabled'))
    let currentDate = new Date().getDate()
    disabledDays.forEach(async (element) => {
        // console.log((await element.getText()).split(' ')[0])
        let day = await element.findElement(By.className('ui-datepicker-day'));
        let dayInt = parseInt(await day.getText(), '10');
        console.log("Date got", dayInt);
        if (parseInt(day, '10') > currentDate) {
            console.log("Failed");
            exit();
        }
    });

    await sleep(3000)
    let header = await driver.findElement(By.xpath("//div[contains(@class,'IBESearchBoxHeader')]"))
    header.click()

    console.log("selection")

    let audult = await driver.findElement(By.xpath("//select[@id='IBEAldultSelect']//option[contains(text(),'7')]"))
    await audult.click()

    let child = await driver.findElement(By.xpath("//select[@id='IBEChildSelect']//option[contains(text(),'2')]"))
    await child.click()

    let baby = await driver.findElement(By.xpath("//select[@id='IBEInfantSelect']//option[contains(text(),'2')]"))
    await baby.click()

    let findBtn = await driver.findElement(By.xpath("//span[contains(@class,'IBESearchButton')]"))
    await findBtn.click()

    console.log("end")
}

async function checkFound() {
    await driver.wait(until.elementLocated(By.xpath("//span[@id='lblDepartureTo']"), 8000))
    let departureTo = await driver.findElement(By.xpath("//span[@id='lblDepartureTo']"))

    if (departureTo != 0 && (audult + child) > 9) {
        console.log('Failed')
        exit()
    } else {
        console.log('Pass')
        exit()
    }
}

async function module1() {
    await goToWeb()
    await fillFrom()
    await checkFound()
}

async function main() {
    try {
        await module1()
    } catch {
        // await driver.quit()
    } finally {
        // driver.quit()
    }
}

main()






function exit() {
    driver.quit()
    process.exit()
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}