const dateHandler = require("./src/dateHandler");
const { downloadFile, getFileSlient } = require("./src/fileHandler");
const {
  isIpv4,
  isMacAddress,
  isPositiveFloat,
  isPercent,
  isPort,
  isJSType,
  isEmpty,
  isNotEmptyText,
} = require("./src/validator");
const {
  debounce,
  fmtNum,
  getLabelWidth,
  fmtUndefind,
  fmtEmptyVal,
  copyText,
} = require("./src/utils");

module.exports = {
  debounce,
  fmtNum,
  getLabelWidth,
  fmtUndefind,
  fmtEmptyVal,
  copyText,
  //
  ...dateHandler,
  //
  downloadFile,
  getFileSlient,
  //
  isIpv4,
  isMacAddress,
  isPositiveFloat,
  isPercent,
  isPort,
  isJSType,
  isEmpty,
  isNotEmptyText,
};
