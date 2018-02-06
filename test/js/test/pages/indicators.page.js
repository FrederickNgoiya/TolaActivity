// indicators.page.js -- page object for testing the top-level Program
// Indicators page
var util = require('../lib/testutil.js');

var parms = util.readConfig();
parms.baseurl += '/indicators/home/0/0/0';

function clickIndicatorDataButton(indicatorName) {
}

function clickIndicatorDeleteButton(indicatorName) {
}

function clickIndicatorEditButton(indicatorName) {
}

function clickIndicatorsDropdown() {
  browser.$('#dropdownIndicator').click();
}

function clickIndicatorsLink() {
  browser.$('=Indicators').click();
}

function clickIndicatorTypeDropdown() {
  browser.$('#dropdownIndicatorType').click();
}

function clickNewIndicatorButton() {
  browser.waitForVisible('=New Indicator', 1000);
  browser.$('=New Indicator').click();
}

function clickProgramsDropdown() {
  browser.$('#dropdownProgram').click();
}

function clickResetButton() {
  browser.$('input[value="Reset"]').click();
}

function createNewProgramIndicator(name, unit, lopTarget, baseline, frequency) {
  clickNewIndicatorButton();
  saveNewIndicator();
  setIndicatorName(name);
  setUnitOfMeasure(unit);
  setLoPTarget(lopTarget);
  setBaseline(baseline);
  setTargetFrequency(frequency);
  saveIndicatorChanges();
}

function getIndicatorsList() {
  let list = browser.$('ul.dropdown-menu[aria-labelledby="dropdownIndicator"]');
  let listItems = list.$$('li>a');
  let indicators = new Array();
  for (let listItem of listItems) {
    indicators.push(listItem.getText());
  }
  return indicators;
}

function getAlertMsg() {
  //let alertDiv = browser.$('div#alerts>div.alert.alert-danger.dynamic-alert.alert-dismissable');
  let alertDiv = browser.$('div#alerts');
  return alertDiv.$('p').getText();
}

function getBaseline() {
  let targetsTab = browser.$('=Targets');
  targetsTab.click();
  let val = $('input#id_baseline').getValue();
  return val;
}

function getIndicatorName() {
  let targetsTab = browser.$('=Performance');
  targetsTab.click();
  let val = $('input#id_name').getValue();
  return val;
}

function getIndicatorTypeList() {
  let list = browser.$('ul.dropdown-menu[aria-labelledby="dropdownIndicatorType"]');
  let listItems = list.$$('li>a');
  let indicatorTypes = new Array();
  for (let listItem of listItems) {
    indicatorTypes.push(listItem.getText());
  }
  return indicatorTypes;
}

function getLoPTarget() {
  let targetsTab = browser.$('=Targets');
  targetsTab.click();
  let val = $('input#id_lop_target').getValue();
  return val;
}

function getProgramsList() {
  let list = browser.$('ul.dropdown-menu[aria-labelledby="dropdownProgram"]');
  let listItems = list.$$('li>a');
  let programs = new Array();
  for (let listItem of listItems) {
    programs.push(listItem.getText());
  }
  return programs;
}

function getProgramsTable() {
  let rows = browser.$('div#toplevel_div').$$('div.panel-heading');
  let programs = new Array();
  for(let row of rows) {
    programs.push(row.$('h4').getText());
  }
  return programs;
}

function getTargetFrequency() {
  let targetsTab = browser.$('=Targets');
  targetsTab.click();
  let val = $('select#id_target_frequency').getValue();
  return val;
}

function getUnitOfMeasure() {
  let targetsTab = browser.$('=Targets');
  targetsTab.click();
  let val = $('input#id_unit_of_measure').getValue();
  return val;
}

function saveIndicatorChanges() {
  let saveChanges = $('input[value="Save changes"]');
  saveChanges.click();
}

function saveNewIndicator() {
  // Accept the default values
  let saveNew = $('form').$('input[value="save"]');
  saveNew.click();
}

function setBaseline(value = false) {
  if (value) {
    let targetsTab = browser.$('=Targets');
    targetsTab.click();
    let baseline = $('input#id_baseline');
    baseline.setValue(value);
  } else {
      browser.$('#id_baseline_na').click();
  }
}

function setIndicatorName(name) {
  let perfTab = browser.$('=Performance');
  perfTab.click();
  let indName = $('input#id_name');
  indName.setValue(name);
}

function setLoPTarget(value) {
  let targetsTab = browser.$('=Targets');
  targetsTab.click();
  let lopTarget = $('input#id_lop_target');
  lopTarget.setValue(value);
}

function setTargetFrequency(value) {
  let targetsTab = browser.$('=Targets');
  targetsTab.click();
  let targetFreq = $('select#id_target_frequency');
  targetFreq.selectByValue(1);
}

function setUnitOfMeasure(unit) {
  let targetsTab = browser.$('=Targets');
  targetsTab.click();
  let bucket = $('input#id_unit_of_measure');
  bucket.setValue('Buckets');
}

function open(url = parms.baseurl) {
  browser.url(url);
}

// FIXME: This should be a property
function pageName() {
  // On this page, the "title" is actually the <h2> caption
  return browser.$('h2').getText();
}

function selectProgram(program) {
  browser.$('#dropdownProgram').click();
  let items = browser.$('div.btn-group').$('ul.dropdown-menu').$$('li>a');
  for (let item of items) {
    if (program == item.getText()) {
      item.click();
      break;
    }
  }
}

exports.clickIndicatorDataButton = clickIndicatorDataButton;
exports.clickIndicatorDeleteButton = clickIndicatorDeleteButton;
exports.clickIndicatorEditButton = clickIndicatorEditButton;
exports.clickIndicatorTypeDropdown = clickIndicatorTypeDropdown;
exports.clickIndicatorsDropdown = clickIndicatorsDropdown;
exports.clickIndicatorsLink = clickIndicatorsLink;
exports.clickNewIndicatorButton = clickNewIndicatorButton;
exports.clickProgramsDropdown = clickProgramsDropdown;
exports.clickResetButton = clickResetButton;
exports.createNewProgramIndicator = createNewProgramIndicator;
exports.getAlertMsg = getAlertMsg;
exports.getBaseline = getBaseline;
exports.getIndicatorsList = getIndicatorsList;
exports.getIndicatorName = getIndicatorName;
exports.getIndicatorTypeList = getIndicatorTypeList;
exports.getLoPTarget = getLoPTarget;
exports.getProgramsList = getProgramsList;
exports.getProgramsTable = getProgramsTable;
exports.getTargetFrequency = getTargetFrequency;
exports.getUnitOfMeasure = getUnitOfMeasure;
exports.open = open;
exports.pageName = pageName;
exports.saveIndicatorChanges = saveIndicatorChanges;
exports.saveNewIndicator = saveNewIndicator;
exports.selectProgram = selectProgram;
exports.setIndicatorName = setIndicatorName;
exports.setUnitOfMeasure = setUnitOfMeasure;
exports.setLoPTarget = setLoPTarget;
exports.setBaseline = setBaseline;
exports.setTargetFrequency = setTargetFrequency;

/*
exports.clickPerformanceTab = clickPerformanceTab;
exports.clickTargetsTab = clickTargetsTab;
*/
