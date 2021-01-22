const cheerio = require('cheerio');
const chalk = require('chalk');

const arrayFromLength  = require( './helpers/common');
const getPageContent = require('./helpers/puppeteer');
const listItemsHandler = require('./handlers/listItemsHandler')
const saveData = require('./handlers/saver.js');

// example url = 'https://www.aliexpress.com/store/5410049/search/1.html';
// example SITE = 'https://www.aliexpress.com/store/5410049/search'
const SITE = ''
const CATALOG_PAGE_LENGTH = 1;

(async function main() {
    try {
        for(const page of arrayFromLength(CATALOG_PAGE_LENGTH)) {
            const url = `${SITE}/${page}.html`;
            const pageContent = await getPageContent(url);
            const $ = cheerio.load(pageContent);
            const items = [];

            $('#node-gallery .items-list .item').each((i, item) => {
                console.log(i);
                const url = $('.detail h3 a').attr('href');
                const title = $('.detail h3 a').attr('title');
                const price = $('.cost b').text();
                items.push({
                    url,
                    title,
                    price
                });
            });

            await saveData(items);
        }
    } catch (err) {
        console.log(chalk.red('An error has occurred'));
        console.log(err);
    }
})();