import convert from 'xml-js';

function convertXml() {

  // Get the XML data from an input field or fetch it from a server
  const xmlData = document.getElementById('xmlInput').value;

  // Parse the XML data
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  console.log(xmlDoc);

  // Convert XML to JSON
  const jsonData = convert.xml2json(xmlData, {compact: true, spaces: 2, });
  console.log(jsonData);

  // Display the converted JSON data
  const jsonInput = document.getElementById('jsonInput');
  jsonInput.value = jsonData;
}

window.convertXml = convertXml;
