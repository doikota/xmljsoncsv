import { Parser } from 'json2csv';

function convertJson() {
  // Convert JSON to CSV
  const jsonText = document.getElementById('jsonInput').value;
  const jsonData = JSON.parse(jsonText);
  console.log(jsonData);
  const fieldNames = {};

  jsonData.forEach(item => {
    recursiveExtract(fieldNames, item);
  });

  const fields = Object.keys(fieldNames);
  console.log(fields);
  const json2csvParser = new Parser({ fields: fields, header: true , withBOM: true, flatten: true, flattenArrays: true});
  const csvData = json2csvParser.parse(jsonData);
  console.log(csvData);

  // Display the converted CSV data
  const csvInput = document.getElementById('csvInput');
  csvInput.value = csvData;
}

window.convertJson = convertJson;

function recursiveExtract(fieldNames, item, parentKey = '') {
  console.log(item);
  console.log(Object.keys(item));
  Object.keys(item).forEach((key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (item[key] === null || item[key] === undefined) {
      // null または undefined の場合
      fieldNames[newKey] = null;
    } else if (typeof item[key] === 'object' && !Array.isArray(item[key])) {
      // オブジェクトの場合は再帰呼び出し
      recursiveExtract(fieldNames, item[key], newKey);
    } else if (Array.isArray(item[key])) {
      // 配列の場合
      item[key].forEach((subItem, index) => {
        if (typeof subItem === 'object') {
          // オブジェクトの場合は再帰呼び出し
          recursiveExtract(fieldNames, subItem, `${newKey}.${index}`);
        } else {
          // プリミティブ値の場合
          fieldNames[`${newKey}.${index}`] = null;
        }
      });
    } else {
      // プリミティブ値の場合
      fieldNames[newKey] = null;
    }
  });
}

module.exports = { recursiveExtract };
