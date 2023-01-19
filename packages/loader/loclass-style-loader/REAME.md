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

- `prefix` (default as 'L') Mark the className to be transform

```html
<div class="Lw-20rem Lpd-20 Lbgc-203040 Lbg-1-solid-red LborderTopLeftRaidius-10 Ltransition-all-2s"></div>
```

will add new style block in vue

```js
<style scoped>
.Lw-20rem{width:20rem;}
.Lpd-20{padding:20px;}
.Lbgc_203040{background-color:#203040;}
.Lbg-1-solid-red{border:1px solid red;}
.LborderTopLeftRaidius-10{border-top-left-raduis:10px;}
.Ltransition-all-2s{transition:all 2s;}
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
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mx: 'margin-left,margin-right',
  my: 'margin-top,margin-bottom',
  pd: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  px: 'padding-left,padding-right',
  py: 'padding-top,padding-bottom'
}
```
