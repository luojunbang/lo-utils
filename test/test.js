/* eslint-disable no-undef */
const assert = require('assert')
const {
  fmtDate,
  fmtDateTime,
  fmtTime,
  generatorDate,
  parseJSONstringify,
  isInt,
  fmtStorageSize,
  fmtContentLength,
  fmtContentType,
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
  it('fmtStorageSize', function(){
    assert.equal(fmtStorageSize('2048', 'k'), '2k')
    assert.equal(fmtStorageSize(2048, 'kb'), '2kb')
    assert.equal(fmtStorageSize(2048), '2k')
    assert.equal(fmtStorageSize(2048, 'Kb'), '2Kb')
    assert.equal(fmtStorageSize('2048K', 'm'), '2m')
    assert.equal(fmtStorageSize('2.5m', 'k'), '2560k')
    assert.equal(fmtStorageSize('10.5m', 'b'), '11010048b')
    assert.equal(fmtStorageSize('10.5m'), '10.5m')
    assert.equal(fmtStorageSize('2048K', 'mb'), '2mb')
    assert.equal(fmtStorageSize('2048K', 'MB'), '2MB')
    assert.equal(fmtStorageSize('2048K', 'k'), '2048k')
    assert.equal(fmtStorageSize('2048K', 'g'), '0.0g')
    assert.equal(fmtStorageSize('200K', 'm'), '0.2m')
  })
  it('fmtContentLength',function(){
    assert.equal(fmtContentLength(1000),'1K')
    assert.equal(fmtContentLength(2100),'2.1K')
  })
  it('fmtContentType',function(){
    assert.equal(fmtContentType('text/html'),'html')
    assert.equal(fmtContentType('text/css'),'css')
    assert.equal(fmtContentType('text/javascript'),'js')
    assert.equal(fmtContentType('image/jpeg'),'jpg')
    assert.equal(fmtContentType('image/png'),'png')
    assert.equal(fmtContentType('image/svg+xml'),'svg')
    assert.equal(fmtContentType('image/webp'),'webp')
    assert.equal(fmtContentType('video/mp4'),'mp4')
  })
})
