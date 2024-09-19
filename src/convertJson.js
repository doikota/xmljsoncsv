import { Parser } from 'json2csv';

function convertJson() {
  // Convert JSON to CSV
  const jsonText = document.getElementById('jsonInput').value;
  const jsonData = JSON.parse(jsonText);
  console.log(jsonData);
  const fieldArrays = {};

  jsonData.forEach(item => {
    Object.keys(item).forEach(key => {
        if (typeof item[key] === 'object' && !Array.isArray(item[key])) {
            Object.keys(item[key]).forEach(subKey => {
                fieldArrays[`${key}.${subKey}`] = null; // ドット区切りのキー
            });
        } else if (Array.isArray(item[key])) {
          item[key].forEach((subItem, index) => {
            if (typeof subItem === 'object') {
              Object.keys(subItem).forEach(subKey => {
                fieldArrays[`${key}.${index}.${subKey}`] = null; // ドット区切りのキー
              });
            } else {
                fieldArrays[`${key}.${index}`] = null; // ドット区切りのキー
            }
          });
        } else {
            fieldArrays[key] = null; // 直接のキー
        }
    });
  });

  // const fields = Object.keys(jsonData[0]);
  // const fields = 
  //   [
  //       'title',
  //       'author',
  //       'year',
  //       'genre',
  //       'chapter.title'
  //   ];
  const fields = Object.keys(fieldArrays);
  console.log(fields);
  const json2csvParser = new Parser({ fields: fields, header: true , withBOM: true, flatten: true, flattenArrays: true});
  const csvData = json2csvParser.parse(jsonData);
  console.log(csvData);

  // Display the converted CSV data
  const csvInput = document.getElementById('csvInput');
  csvInput.value = csvData;

}

window.convertJson = convertJson;
