import { generatorDate, fmtDateTime, fmtDate, fmtTime, fmtWeek, timeString, fmtDay } from '../src'

describe('DateHandler', function () {
  test('generatorDate', function () {
    expect(generatorDate('2021-06-21')).toBe('2021-06-21 00:00:00')
    expect(generatorDate('2021-06-21', 'y:m:d')).toBe('2021:06:21')
    expect(generatorDate('2021-06-21', 'ymd')).toBe('20210621')
    expect(generatorDate('2021-06-21', 'd:m:y')).toBe('21:06:2021')
    expect(generatorDate('2021-06-21', 'd:m:y h:i:s')).toBe('21:06:2021 00:00:00')
    expect(generatorDate('2021-06-21', 'd/m/y h:i:s')).toBe('21/06/2021 00:00:00')
    expect(generatorDate('2021-06-21', 'd/m/y h:i:s 星期a')).toBe('21/06/2021 00:00:00 星期一')

    expect(generatorDate('2021-12-31', 'e')).toBe('000')
    expect(generatorDate('2021-12-31 12:30:48.123', 'e')).toBe('123')
    expect(generatorDate('2021-12-31 12:30:48.123', 'd/m/y h:i:s.e 星期a')).toBe(
      '31/12/2021 12:30:48.123 星期五',
    )
  })
  test('fmtWeek', () => {
    expect(fmtWeek('2021-12-31')).toBe('52')
    expect(fmtWeek('2022-1-1')).toBe('52')
    expect(fmtWeek('2022-1-2')).toBe('1') //1
    expect(fmtWeek('2021-1-3')).toBe('1')
    expect(fmtWeek('2021-1-8')).toBe('1')
    expect(fmtWeek('2022-12-31')).toBe('52')
    expect(fmtWeek('2023-1-1')).toBe('1')
  })
  test('fmtDate', function () {
    expect(fmtDate('2021-06-21')).toBe('2021-06-21')
    expect(fmtDate('2021-06-21', '')).toBe('20210621')
    expect(fmtDate('2021-06-21', '/')).toBe('2021/06/21')
    expect(fmtDate('2021-06-21', '.')).toBe('2021.06.21')
  })
  test('fmtDateTime', function () {
    expect(fmtDateTime('2021-06-21')).toBe('2021-06-21 00:00:00')
  })
  test('fmtTime', function () {
    expect(fmtTime('2021-06-21')).toBe('00:00:00')
    expect(fmtTime('2021-06-21', '')).toBe('000000')
  })
  test('timeString', () => {
    expect(timeString('2022-12-31')).toBe('20221231000000')
    expect(timeString('2023-1-1')).toBe('20230101000000')
  })
  test('fmtDay', () => {
    expect(fmtDay('2021-06-21')).toBe('一')
    expect(fmtDay('2021-12-31 12:30:48.123')).toBe('五')
  })
})
