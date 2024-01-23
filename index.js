const puppeteer = require('puppeteer');

function openWebPage() {
  return puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.doctoralia.cl/buscar?q=Psiquiatra&loc=Santiago&filters%5Bspecializations%5D%5B%5D=55');
    await page.click('button[id="onetrust-accept-btn-handler"]')
    await page.screenshot({path: 'example.png'});
    await browser.close();
  });
}

module.exports = {
  openWebPage
};
