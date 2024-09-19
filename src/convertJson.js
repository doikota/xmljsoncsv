import { Parser } from 'json2csv';

function convertJson() {
  // Convert JSON to CSV
  // const jsonData = document.getElementById('jsonInput').value;
  const jsonData = [
    {
        "title": "吾輩は猫である",
        "author": "夏目 漱石",
        "year": 1905,
        "genre": "小説",
        "chapter": {
          "title": "第一章", "page": 1
        }
    },
    {
        "title": "ノルウェイの森",
        "author": "村上 春樹",
        "year": 1987,
        "genre": "小説",
        "chapter": {
          "title": "第一部", "page": 1
        }
    }
  ]
  
  console.log(jsonData);

  // const fields = Object.keys(jsonData[0]);
  const fields = 
    [
        'title',
        'author',
        'year',
        'genre',
        'chapter.title'
    ];
  console.log(fields);
  const json2csvParser = new Parser({ fields: fields, header: true , withBOM: true, flatten: true, flattenArrays: true});
  const csvData = json2csvParser.parse(jsonData);
  console.log(csvData);

  // Display the converted CSV data
  const csvInput = document.getElementById('csvInput');
  csvInput.value = csvData;

}

window.convertJson = convertJson;
