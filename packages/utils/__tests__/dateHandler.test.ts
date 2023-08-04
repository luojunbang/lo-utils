import { generatorDate, fmtDateTime, fmtDate, fmtTime } from '../src'

describe('DateHandler', function () {
  test('generatorDate', function () {
    expect(generatorDate('2021-06-21')).toBe('2021-06-21 00:00:00')
    expect(generatorDate('2021-06-21', 'y:m:d')).toBe('2021:06:21')
    expect(generatorDate('2021-06-21', 'ymd')).toBe('20210621')
    expect(generatorDate('2021-06-21', 'd:m:y')).toBe('21:06:2021')
    expect(generatorDate('2021-06-21', 'd:m:y h:i:s')).toBe('21:06:2021 00:00:00')
    expect(generatorDate('2021-06-21', 'd/m/y h:i:s')).toBe('21/06/2021 00:00:00')
    expect(generatorDate('2021-06-21', 'd/m/y h:i:s 星期a')).toBe('21/06/2021 00:00:00 星期一')
    expect(generatorDate('2021-12-31', 'w')).toBe('52')
    expect(generatorDate('2022-1-1', 'w')).toBe('52')
    expect(generatorDate('2022-1-2', 'w')).toBe('1') //1
    expect(generatorDate('2021-1-3', 'w')).toBe('1')
    expect(generatorDate('2021-1-8', 'w')).toBe('1')
    expect(generatorDate('2022-12-31', 'w')).toBe('52')
  })
  test('fmtDate', function () {
    expect(fmtDate('2021-06-21')).toBe('2021-06-21')
    expect(fmtDate('2021-06-21', '')).toBe('20210621')
    expect(fmtDate('2021-06-21', '/')).toBe('2021/06/21')
    expect(fmtDate('2021-06-21', '.')).toBe('2021.06.21')
  })
  test('fmtDateTime', function () {
    expect(fmtDateTime('2021-06-21')).toBe('2021-06-21 00:00:00')
    expect(fmtDateTime('2021-06-21', 'y-m-d h:i:s')).toBe('2021-06-21 00:00:00')
  })
  test('fmtTime', function () {
    expect(fmtTime('2021-06-21')).toBe('00:00:00')
    expect(fmtTime('2021-06-21', '')).toBe('000000')
  })
})
