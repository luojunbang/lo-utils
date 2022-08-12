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


