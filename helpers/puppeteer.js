const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
puppeteer.use(require('puppeteer-extra-plugin-anonymize-ua')())

const LAUNCH_PUPPETEER_OPTS = {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1920x1080',

    ],
    headless: false,
    // executablePath: '/usr/bin/google-chrome'
};

const PAGE_PUPPETEER_OPTS = {
    // networkIdle2Timeout: 5000,
    // waitUntil: 'networkidle2',
    // timeout: 3000000,
};


module.exports = async function getPageContent(url) {
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = await browser.newPage(PAGE_PUPPETEER_OPTS);
        // await page.setViewport({ width: 360, height: 640, isMobile: true});
        // await page.setUserAgent('Mozilla/5.0 (Android 9; Mobile; rv:81.0) Gecko/81.0 Firefox/81.0');
        await page.goto(url, PAGE_PUPPETEER_OPTS);
        const content = await page.content();
        // browser.close();

        return content;
    } catch (err) {
        throw(err);
    }
}
