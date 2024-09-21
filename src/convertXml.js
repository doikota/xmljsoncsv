import convert from 'xml-js';

function convertXml() {
  // Get the XML data from an input field or fetch it from a server
  const xmlData = document.getElementById('xmlInput').value;

  // Parse the XML data
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  console.log(xmlDoc);

  // Convert XML to JSON
  const jsonText = convert.xml2json(xmlData, { compact: true, spaces: 2 });
  const jsonObject = JSON.parse(jsonText);

  // _textを元のフィールド名に戻す関数
  const cleanJson = (obj) => {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (obj[key]._text) {
          // _textを元のキーの値に置き換え
          obj[key] = obj[key]._text;
        }
        cleanJson(obj[key]); // 再帰的に処理
      }
    }
  };

  cleanJson(jsonObject);
  const jsonText2 = JSON.stringify(jsonObject, null, 2);
  console.log(jsonText2);

  // Display the converted JSON data
  const jsonInput = document.getElementById('jsonInput');
  jsonInput.value = jsonText2;
}

window.convertXml = convertXml;
