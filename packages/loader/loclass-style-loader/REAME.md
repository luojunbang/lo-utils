## Usage

pnpm i class-style-loader -D

## Add To /\.vue$/ Rule loader

```js
{
    test: /\.vue$/,
    use: ['vue-loader', { loader: 'class-style-loader', options: { prefix: 'L' } }],
},
```

## options

* `prefix` (default as 'L') Mark the className to be transform

```html
<div class="Lpd-20"></div>
```
will add style block in vue
```js
<style scoped>
.Lpd-20{padding:20px;}
</style>
```

## Default auto transform

- `20` --> `20px`
- `203045` --> `#203045`
- `20_20_20` --> `rgb(20,20,20)`
- `20_20_20_90` --> `rgba(20,20,20,0.90)`
- `v_primary__color` --> `var(--primary--color)`


## default alias 
```js
{
  font: 'font-size',
  fontw: 'font-weight',
  lh: 'line-height',
  bgc: 'background-color',
  bg: 'background',
  w: 'width',
  mw: 'max-width',
  h: 'height',
  mh: 'max-height',
  bd: 'border',
  bdc: 'border-color',
  bdrd: 'border-raduis',
  bdt: 'border-top',
  bdr: 'border-right',
  bdb: 'border-bottom',
  bdl: 'border-left',
  bdx: 'border-left,border-right',
  bdy: 'border-top,border-bottom',
  mg: 'margin',
  mgt: 'margin-top',
  mgr: 'margin-right',
  mgb: 'margin-bottom',
  mgl: 'margin-left',
  mgx: 'margin-left,margin-right',
  mgy: 'margin-top,margin-bottom',
  pd: 'padding',
  pdt: 'padding-top',
  pdr: 'padding-right',
  pdb: 'padding-bottom',
  pdl: 'padding-left',
  pdx: 'padding-left,padding-right',
  pdy: 'padding-top,padding-bottom'
}
```