const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function saveData(data) {
    const { title } = data;
    const fileName = `${title}.json`;
    const savePath = path.join(__dirname, '..', 'data', fileName);

    return new Promise( (resolve, reject ) => {
        fs.writeFile(savePath, data, err => {
            if (err) {
                return reject(err);
            }

            console.log(chalk.blue('File was saved successfully: ' + chalk.blue.bold(fileName) + '\n'));

            resolve();
        });
    });
};
