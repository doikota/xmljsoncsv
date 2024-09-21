import { Parser } from 'json2csv';

/*
 * JSONをCSVに変換する
 */
function convertJson() {
  // JSONデータを取得、ターゲットは2階層目のJSON配列とする
  const jsonText = document.getElementById('jsonInput').value;
  const rawJson = JSON.parse(jsonText);
  const rootJsonFieldName = Object.keys(rawJson);
  const rootJson = rawJson[rootJsonFieldName];
  const targetJsonFieldName = Object.keys(rootJson);
  const targetJson = rootJson[targetJsonFieldName];

  // ターゲットのJSON配列からフィールド名を抽出
  const targetJsonFieldNames = {};
  targetJson.forEach(item => {
    recursiveExtract(targetJsonFieldNames, item);
  });

  // JSONデータをCSVに変換
  const fields = Object.keys(targetJsonFieldNames);
  const json2csvParser = new Parser({ fields: fields, header: true , withBOM: true, flatten: true, flattenArrays: true});
  const csvData = json2csvParser.parse(targetJson);

  // CSVデータを表示
  const csvInput = document.getElementById('csvInput');
  csvInput.value = csvData;
}

window.convertJson = convertJson;

/*
 * JSONオブジェクトからフィールド名を再帰的に抽出する
 */
function recursiveExtract(fieldNames, item, parentKey = '') {
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

export default recursiveExtract;
