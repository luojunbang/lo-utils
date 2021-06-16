const assert = require("assert");
const { fmtDate, fmtDateTime, fmtTime } = require("../dist/loUtils.min.js");

describe("DateHandler", function () {
  it("fmtDate", function () {
    assert.equal(fmtDate("2021-06-21"), "2021-06-21");
  });
  it("fmtDateTime", function () {
    assert.equal(fmtDateTime("2021-06-21"), "2021-06-21 00:00:00");
  });
  it("fmtTime", function () {
    assert.equal(fmtTime("2021-06-21"), "00:00:00");
  });
});
