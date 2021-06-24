const assert = require("assert");
const {
  fmtDate,
  fmtDateTime,
  fmtTime,
  generatorDate,
} = require("../dist/loUtils.min.js");

describe("DateHandler", function () {
  it("generatorDate", function () {
    assert.equal(generatorDate("2021-06-21"), "2021-06-21 00:00:00");
    assert.equal(generatorDate("2021-06-21", "y:m:d"), "2021:06:21");
    assert.equal(generatorDate("2021-06-21", "ymd"), "20210621");
    assert.equal(generatorDate("2021-06-21", "d:m:y"), "21:06:2021");
    assert.equal(
      generatorDate("2021-06-21", "d:m:y h:i:s"),
      "21:06:2021 00:00:00"
    );
    assert.equal(
      generatorDate("2021-06-21", "d/m/y h:i:s"),
      "21/06/2021 00:00:00"
    );
    assert.equal(
      generatorDate("2021-06-21", "d/m/y h:i:s 星期a"),
      "21/06/2021 00:00:00 星期一"
    );
  });
  it("fmtDate", function () {
    assert.equal(fmtDate("2021-06-21"), "2021-06-21");
    assert.equal(fmtDate("2021-06-21", ""), "20210621");
    assert.equal(fmtDate("2021-06-21", "/"), "2021/06/21");
    assert.equal(fmtDate("2021-06-21", "."), "2021.06.21");
  });
  it("fmtDateTime", function () {
    assert.equal(fmtDateTime("2021-06-21"), "2021-06-21 00:00:00");
    assert.equal(
      fmtDateTime("2021-06-21", "y-m-d h:i:s"),
      "2021-06-21 00:00:00"
    );
  });
  it("fmtTime", function () {
    assert.equal(fmtTime("2021-06-21"), "00:00:00");
    assert.equal(fmtTime("2021-06-21", ""), "000000");
  });
});
