import fs from 'fs';
import csv from 'csv-parser';

export async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}
export async function writeCSV(filePath, data) {
  return new Promise((resolve, reject) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(',')).join('\n');
    const content = `${headers}\n${rows}`;

    fs.writeFile(filePath, content, err => {
      if (err) reject(err);
      resolve();
    });
  });
}
