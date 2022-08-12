import { getCssProperty, parseClass, autoFixUnit } from '../helper'

const L = 'L'

describe('getCssProperty', () => {
  test('getCssProperty', () => {
    expect(getCssProperty('borderTopLeftRadius')).toBe('border-top-left-radius')
  })
  const color16 = 'efefef'
  const color_rgb = '10_1_1'
  const color_rgba = '10_1_1_100'
  const varColor = 'v_primary__color'
  test('parseClass', () => {
    expect(parseClass('Lpd-20', L)).toBe('.Lpd-20{padding:20px;}')
    expect(parseClass('Mpd-20', 'M')).toBe('.Mpd-20{padding:20px;}')
    expect(parseClass('Lpdx-20', L)).toBe('.Lpdx-20{padding-left:20px;padding-right:20px;}')
    expect(parseClass('Lpdy-20', L)).toBe('.Lpdy-20{padding-top:20px;padding-bottom:20px;}')
    expect(parseClass('Lpdy-20%', L)).toBe('.Lpdy-20%{padding-top:20%;padding-bottom:20%;}')
    expect(parseClass('Lpdy-20rem', L)).toBe('.Lpdy-20rem{padding-top:20rem;padding-bottom:20rem;}')
    expect(parseClass('Lpdy-20em', L)).toBe('.Lpdy-20em{padding-top:20em;padding-bottom:20em;}')
    expect(parseClass('Lpdy-20em', L)).toBe('.Lpdy-20em{padding-top:20em;padding-bottom:20em;}')

    expect(parseClass('Lbd-20-solid-efefef', L)).toBe('.Lbd-20-solid-efefef{border:20px solid #efefef;}')
    expect(parseClass('Lbd-20-solid-v_primary__color', L)).toBe('.Lbd-20-solid-v_primary__color{border:20px solid var(--primary--color);}')
    expect(parseClass('Lbd-20-solid-10_1_1_100', L)).toBe('.Lbd-20-solid-10_1_1_100{border:20px solid rgba(10,1,1,1.00);}')
    expect(parseClass('Lbd-20-solid-10_1_1', L)).toBe('.Lbd-20-solid-10_1_1{border:20px solid rgb(10,1,1);}')

    expect(parseClass('Lbgc-123455', L)).toBe('.Lbgc-123455{background-color:#123455;}')
    expect(parseClass('Lbgc-10_1_1', L)).toBe('.Lbgc-10_1_1{background-color:rgb(10,1,1);}')
    expect(parseClass('Lbgc-99_99_99', L)).toBe('.Lbgc-99_99_99{background-color:rgb(99,99,99);}')
    expect(parseClass('Lbgc-99_99_99_10', L)).toBe('.Lbgc-99_99_99_10{background-color:rgba(99,99,99,0.10);}')
    expect(parseClass('Lbgc-v_success__color', L)).toBe('.Lbgc-v_success__color{background-color:var(--success--color);}')
    expect(parseClass('Lbg-v_primary_color-center', L)).toBe('.Lbg-v_primary_color-center{background:var(--primary-color) center;}')
  })
  test('autoFixUnit', () => {
    expect(autoFixUnit(color16)).toBe('#efefef')
    expect(autoFixUnit(color_rgb)).toBe('rgb(10,1,1)')
    expect(autoFixUnit(color_rgba)).toBe('rgba(10,1,1,1.00)')
    expect(autoFixUnit(varColor)).toBe('var(--primary--color)')
  })
})
