import dateHandler from "./src/dateHandler";
import { downloadFile, getFileSlient } from "./src/fileHandler";
import {
  isIpv4,
  isMacAddress,
  isPositiveFloat,
  isPercent,
  isPort,
  isJSType,
  isEmpty,
  isNotEmptyText,
} from "./src/validator";
import {
  debounce,
  fmtNum,
  getLabelWidth,
  fmtUndefind,
  fmtEmptyVal,
  copyText,
} from "./src/utils";

export default {
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
