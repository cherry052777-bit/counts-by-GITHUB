const zh = require('./i18n/zh.json');
const en = require('./i18n/en.json');

let lang = navigator.language && navigator.language.startsWith('zh') ? zh : en;

function i18n(key) {
  return lang[key] || key;
}

export default i18n;