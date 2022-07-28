/* eslint-disable no-undef */
const assert = require('assert')
const {
  parseParams,
  getParams,
  fmtDate,
  fmtDateTime,
  fmtTime,
  generatorDate,
  isInt,
  fmtStorageSize,
  fmtContentLength,
  fmtContentType,
  deepFisrt,
  wildFirst,
  parseToPx,
} = require('../dist/lo-utils.min.js')

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
    assert.equal(generatorDate('2021-06-21', 'd:m:y h:i:s'), '21:06:2021 00:00:00')
    assert.equal(generatorDate('2021-06-21', 'd/m/y h:i:s'), '21/06/2021 00:00:00')
    assert.equal(generatorDate('2021-06-21', 'd/m/y h:i:s 星期a'), '21/06/2021 00:00:00 星期一')
    assert.equal(generatorDate('2021-12-31', 'w'), '52')
    assert.equal(generatorDate('2022-1-1', 'w'), '52')
    assert.equal(generatorDate('2022-1-2', 'w'), '1') //1
    assert.equal(generatorDate('2021-1-3', 'w'), '1')
    assert.equal(generatorDate('2021-1-8', 'w'), '1')
    assert.equal(generatorDate('2022-12-31', 'w'), '52')
  })
  it('fmtDate', function () {
    assert.equal(fmtDate('2021-06-21'), '2021-06-21')
    assert.equal(fmtDate('2021-06-21', ''), '20210621')
    assert.equal(fmtDate('2021-06-21', '/'), '2021/06/21')
    assert.equal(fmtDate('2021-06-21', '.'), '2021.06.21')
  })
  it('fmtDateTime', function () {
    assert.equal(fmtDateTime('2021-06-21'), '2021-06-21 00:00:00')
    assert.equal(fmtDateTime('2021-06-21', 'y-m-d h:i:s'), '2021-06-21 00:00:00')
  })
  it('fmtTime', function () {
    assert.equal(fmtTime('2021-06-21'), '00:00:00')
    assert.equal(fmtTime('2021-06-21', ''), '000000')
  })
})

describe('Utils', function () {
  it('fmtStorageSize', function () {
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
  it('fmtContentLength', function () {
    assert.equal(fmtContentLength(1000), '1K')
    assert.equal(fmtContentLength(2100), '2.1K')
  })
})

describe('urlHandler', function () {
  it('urlHandler', function () {
    const url_str_1 = parseParams({
      a: 1,
      key: '真的',
    })
    assert.equal(url_str_1, parseParams(getParams(url_str_1)))
    const url_str_2 = parseParams({
      a: 1,
      key: 'o',
    })
    assert.equal(url_str_2, parseParams(getParams(url_str_2)))
    const url_str_3 = parseParams({
      a: 1,
      key: '//',
    })
    assert.equal(url_str_3, parseParams(getParams(url_str_3)))
    const url_str_4 = parseParams({
      a: 1,
      key: undefined,
    })
    assert.equal(url_str_4, parseParams(getParams(url_str_4)))
  })
})

describe('treeHandler', function () {
  const arr3 = [
    {
      name: 'root',
      children: [
        { name: 'p0', children: [] },
        { name: 'p1', children: [{ name: 'c1_1' }, { name: 'c1_2' }] },
        { name: 'p2', children: [{ name: 'c2_1', children: [{ name: 'c2_1_1' }, { name: 'c2_1_2' }] }, { name: 'c2_2' }] },
        { name: 'p3' },
      ],
    },
  ]
  it('deepFisrt', function () {
    const arr1 = []
    assert.equal('', deepFisrt(arr1))
    const arr2 = [{ name: '1', children: [] }]
    assert.equal(
      ['1'].join(','),
      deepFisrt(arr2)
        .map(i => i.name)
        .join(',')
    )
    assert.equal(
      ['root', 'p0', 'p1', 'c1_1', 'c1_2', 'p2', 'c2_1', 'c2_1_1', 'c2_1_2', 'c2_2', 'p3'].join(','),
      deepFisrt(arr3)
        .map(i => i.name)
        .join(',')
    )
  })
  it('wildFirst', function () {
    assert.equal(
      ['root', 'p0', 'p1', 'p2', 'p3', 'c1_1', 'c1_2', 'c2_1', 'c2_2', 'c2_1_1', 'c2_1_2'].join(','),
      wildFirst(arr3)
        .map(i => i.name)
        .join(',')
    )
  })
})

describe('styleHandler', function () {
  it('parseToPx', function () {
    assert.equal(parseToPx(0), '0')
    assert.equal(parseToPx('0'), '0')
    assert.equal(parseToPx('12'), '12px')
    assert.equal(parseToPx('12%'), '12%')
    assert.equal(parseToPx('12vw'), '12vw')
    assert.equal(parseToPx('12vh'), '12vh')
    assert.equal(parseToPx('12em'), '12em')
    assert.equal(parseToPx('12rem'), '12rem')
  })
})
