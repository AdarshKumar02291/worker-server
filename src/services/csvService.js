const csv = require('csv-parser');
const fs = require('fs');

class CsvService {
  static validateAndParseCsv(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv({
          mapHeaders: ({ header }) => header.trim(),
          separator: ',',
        }))
        .on('data', (data) => {
          if (this.isValidRow(data)) {
            results.push({
              serialNumber: data['Serial Number'],
              productName: data['Product Name'],
              imageUrls: data['Image URLs'].split(';'),
            });
          }
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  static isValidRow(data) {
    return (
      data['Serial Number'] &&
      data['Product Name'] &&
      data['Image URLs'] &&
      data['Image URLs'].includes('http')
    );
  }
}

module.exports = CsvService;