const cheerio = require('cheerio');
const chalk = require('chalk');
const getPageContent = require('../helpers/puppeteer');

module.exports = async function listItemsHandler(data) {
    try {
        for (const initialData of data) {
            console.log(chalk.green('Getting data from: ' + chalk.green.bold(initialData.url)));
            const detailContent = await getPageContent(initialData.url);
            const $ = cheerio.load(detailContent);
            const initialDataUrl = initialData.url;

            const productTitle = $('.product-main .product-info .product-title-text').text();
            const productPrice = $('.product-main .product-info .product-price-value').text();
            const productSizes = $('.product-main .product-info .product-sku .sku-property-list').map(
                (i, item) => $('.sku-property-item .sku-property-text span', item).text()
            );
            const productImageUrl = $('.product-main-wrap .image-cover .maginfier-image').attr('src');

            await saveData({
                initialDataUrl,
                productTitle,
                productPrice,
                productSizes,
                productImageUrl,
            });
        }
    } catch (err) {
        throw err;
    }
}

