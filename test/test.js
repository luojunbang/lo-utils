/* eslint-disable no-undef */
const assert = require('assert')
const {
  fmtDate,
  fmtDateTime,
  fmtTime,
  generatorDate,
  parseJSONstringify,
  isInt,
  fmtSize,
} = require('../src/index.js')

describe('validator', function () {
  it('isInt', function () {
    assert.equal(isInt(0), true)
    assert.equal(isInt(1), true)
    assert.equal(isInt(), false)
    assert.equal(isInt('01'), false)
    assert.equal(isInt('l'), false)
  })
})

describe('DateHandler', function () {
  it('generatorDate', function () {
    assert.equal(generatorDate('2021-06-21'), '2021-06-21 00:00:00')
    assert.equal(generatorDate('2021-06-21', 'y:m:d'), '2021:06:21')
    assert.equal(generatorDate('2021-06-21', 'ymd'), '20210621')
    assert.equal(generatorDate('2021-06-21', 'd:m:y'), '21:06:2021')
    assert.equal(generatorDate(1625155746, 'd:m:y'), '02:07:2021')
    assert.equal(
      generatorDate('2021-06-21', 'd:m:y h:i:s'),
      '21:06:2021 00:00:00'
    )
    assert.equal(
      generatorDate('2021-06-21', 'd/m/y h:i:s'),
      '21/06/2021 00:00:00'
    )
    assert.equal(
      generatorDate('2021-06-21', 'd/m/y h:i:s 星期a'),
      '21/06/2021 00:00:00 星期一'
    )
  })
  it('fmtDate', function () {
    assert.equal(fmtDate('2021-06-21'), '2021-06-21')
    assert.equal(fmtDate('2021-06-21', ''), '20210621')
    assert.equal(fmtDate('2021-06-21', '/'), '2021/06/21')
    assert.equal(fmtDate('2021-06-21', '.'), '2021.06.21')
  })
  it('fmtDateTime', function () {
    assert.equal(fmtDateTime('2021-06-21'), '2021-06-21 00:00:00')
    assert.equal(
      fmtDateTime('2021-06-21', 'y-m-d h:i:s'),
      '2021-06-21 00:00:00'
    )
  })
  it('fmtTime', function () {
    assert.equal(fmtTime('2021-06-21'), '00:00:00')
    assert.equal(fmtTime('2021-06-21', ''), '000000')
  })
})

describe('Utils', function () {
  it('fmtSize', function(){
    assert.equal(fmtSize('2048', 'k'), '2k')
    assert.equal(fmtSize(2048, 'kb'), '2kb')
    assert.equal(fmtSize(2048), '2k')
    assert.equal(fmtSize(2048, 'Kb'), '2Kb')
    assert.equal(fmtSize('2048K', 'm'), '2m')
    assert.equal(fmtSize('2.5m', 'k'), '2560k')
    assert.equal(fmtSize('10.5m', 'b'), '11010048b')
    assert.equal(fmtSize('10.5m'), '10.5m')
    assert.equal(fmtSize('2048K', 'mb'), '2mb')
    assert.equal(fmtSize('2048K', 'MB'), '2MB')
    assert.equal(fmtSize('2048K', 'k'), '2048k')
    assert.equal(fmtSize('2048K', 'g'), '0.0g')
    assert.equal(fmtSize('200K', 'm'), '0.2m')
  })
})
