import { isAccount, isCode, isDef, isEmail, isEmpty, isInt, isJSType, isNil, isNotEmptyText, isPercent, isPhone, isPort } from '../src'

describe('isPort function', () => {
  test('valid numeric port', () => {
    expect(isPort(80)).toBe(true)
    expect(isPort(8080)).toBe(true)
  })

  test('valid string port', () => {
    expect(isPort('80')).toBe(true)
    expect(isPort('8080')).toBe(true)
  })

  test('invalid port', () => {
    expect(isPort(-1)).toBe(false)
    expect(isPort(70000)).toBe(false)
    expect(isPort('abc')).toBe(false)
    expect(isPort('123abc')).toBe(false)
    expect(isPort('')).toBe(false)
  })
})

describe('isInt function', () => {
  test('positive integer', () => {
    expect(isInt(123)).toBe(true)
    expect(isInt('456')).toBe(true)
  })

  test('negative integer', () => {
    expect(isInt(-123)).toBe(false)
    expect(isInt('-456')).toBe(false)
  })

  test('floating point number', () => {
    expect(isInt(123.45)).toBe(false)
    expect(isInt('123.45')).toBe(false)
  })

  test('zero', () => {
    expect(isInt(0)).toBe(true)
    expect(isInt('0')).toBe(true)
  })

  test('non-numeric input', () => {
    expect(isInt('abc')).toBe(false)
    expect(isInt('')).toBe(false)
    expect(isInt(null)).toBe(false)
    expect(isInt(undefined)).toBe(false)
  })
})

describe('isInt', () => {
  test('valid integer', () => {
    expect(isInt(123)).toBe(true)
    expect(isInt('456')).toBe(true)
  })

  test('invalid integer', () => {
    expect(isInt(-123)).toBe(false)
    expect(isInt('abc')).toBe(false)
  })
})

describe('isPercent', () => {
  test('valid percent', () => {
    expect(isPercent(50)).toBe(true)
    expect(isPercent('25.5')).toBe(true)
    expect(isPercent('100')).toBe(true)
  })

  test('invalid percent', () => {
    expect(isPercent(-10)).toBe(false)
    expect(isPercent('abc')).toBe(false)
    expect(isPercent(150)).toBe(false)
  })
})

describe('isPort', () => {
  test('valid port', () => {
    expect(isPort(80)).toBe(true)
    expect(isPort('8080')).toBe(true)
  })

  test('invalid port', () => {
    expect(isPort(-1)).toBe(false)
    expect(isPort('abc')).toBe(false)
    expect(isPort(65536)).toBe(false)
  })
})

describe('isJSType', () => {
  test('valid JS type', () => {
    expect(isJSType(123, 'number')).toBe(true)
    expect(isJSType('abc', 'string')).toBe(true)
    expect(isJSType([], 'array')).toBe(true)
  })

  test('invalid JS type', () => {
    expect(isJSType({}, 'array')).toBe(false)
    expect(isJSType(123, 'string')).toBe(false)
  })
})

describe('isEmpty', () => {
  test('empty value', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  test('non-empty value', () => {
    expect(isEmpty('abc')).toBe(false)
    expect(isEmpty(123)).toBe(false)
  })
})

describe('isNotEmptyText', () => {
  test('non-empty text', () => {
    expect(isNotEmptyText('abc')).toBe(true)
    expect(isNotEmptyText(123)).toBe(true)
  })

  test('empty text', () => {
    expect(isNotEmptyText('')).toBe(false)
    expect(isNotEmptyText(null)).toBe(false)
    expect(isNotEmptyText(undefined)).toBe(false)
  })
})

describe('isNil', () => {
  test('nil value', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  test('non-nil value', () => {
    expect(isNil('abc')).toBe(false)
    expect(isNil(123)).toBe(false)
  })
})

describe('isDef', () => {
  test('defined value', () => {
    expect(isDef('abc')).toBe(true)
    expect(isDef(123)).toBe(true)
  })

  test('undefined value', () => {
    expect(isDef(null)).toBe(false)
    expect(isDef(undefined)).toBe(false)
  })
})

describe('isEmail', () => {
  const test_cases = [
    // 正向用例
    ['test@example.com', true], // 合法邮箱
    ['user.name@example.co', true], // 合法邮箱
    ['user_name123@example.com', true], // 合法邮箱
    ['test.email+filter@example.com', true], // 合法邮箱
    // 负向用例
    ['invalid-email', false], // 不合法，缺少 @
    ['@example.com', false], // 不合法，缺少用户名
    ['user@.com', false], // 不合法，域名部分缺少主机
    ['user@domain', false], // 不合法，缺少顶级域名
    ['user@domain.c', false], // 不合法，顶级域名过短
    ['', false], // 不合法，空字符串
  ]
  test('defined value', () => {
    test_cases.forEach((item) => {
      const [i, ret] = item
      expect(isEmail(i)).toBe(ret)
    })
  })
  test('undefined value', () => {
    expect(isEmail(null)).toBe(false)
    expect(isEmail(undefined)).toBe(false)
  })
})
describe('isPhone', () => {
  const test_cases = [
    // 正向用例
    ['12345678901', true], // 合法手机号
    ['19876543210', true], // 合法手机号
    ['14567890123', true], // 合法手机号
    // 负向用例
    ['01234567890', false], // 不合法，第一位不是 1
    ['1987654321', false], // 不合法，位数不足
    ['198765432101', false], // 不合法，位数过多
    ['198765432a', false], // 不合法，包含非数字字符
    ['', false], // 不合法，空字符串
  ]
  test('defined value', () => {
    test_cases.forEach((item) => {
      const [i, ret] = item
      expect(isPhone(i)).toBe(ret)
    })
  })
  test('undefined value', () => {
    expect(isPhone(null)).toBe(false)
    expect(isPhone(undefined)).toBe(false)
  })
})
describe('isAccount', () => {
  const test_cases = [
    // 正向用例
    ['user123', true], // 合法用户名
    ['User_Name_123', true], // 合法用户名
    ['abc', true], // 合法用户名，最短长度
    ['user_name_very_long', true], // 合法用户名，最长长度
    // 负向用例2
    ['_username', false], // 不合法，特殊字符开头
    ['1username', false], // 不合法，数字开头
    ['us', false], // 不合法，长度不足
    ['user name', false], // 不合法，包含空格
    ['user@name', false], // 不合法，包含特殊字符
    ['username#123', false], // 不合法，包含特殊字符
    ['', false], // 不合法，空字符串
    ['thisusernameiswaytoolongthisusernameiswaytoolong', false], // 不合法，长度超出限制
  ]
  test('defined value', () => {
    test_cases.forEach((item) => {
      const [i, ret] = item
      expect(isAccount(i)).toBe(ret)
    })
  })

  test('undefined value', () => {
    expect(isPhone(null)).toBe(false)
    expect(isPhone(undefined)).toBe(false)
  })
})
describe('isCode', () => {
  const test_cases = [
    // 正向用例
    ['a12345678901', true],
    ['01234567890', true], // 合法
    // 负向用例
    ['-01234567890', false], // 不合法，第一位不是字母
    ['_01234567890', false], // 不合法，第一位不是字母
    ['s!sdfsa', false], // 不合法，只能是-_
  ]
  test('defined value', () => {
    test_cases.forEach((item) => {
      const [i, ret] = item
      expect(isCode(i)).toBe(ret)
    })
  })

  test('undefined value', () => {
    expect(isCode(null)).toBe(false)
    expect(isCode(undefined)).toBe(false)
  })
})
