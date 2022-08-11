const chalk = require('chalk')



let config = {}
if (Object.keys(config).length === 0) generateConfig()

console.log(config)

function configContact(alias, name, types = [], originals = []) {
  if (types.length === 0) config[alias] = name
  types.forEach((type, idx) => {
    const t = type
    config[alias + t] = originals[idx]
      .split(',')
      .map(i => (i !== '' ? `${name}-${i}` : name))
      .join(',')
  })
}

const directionTypes = ['t', 'r', 'b', 'l', 'x', 'y']
const directionOriginals = ['top', 'right', 'bottom', 'left', 'right,left', 'top,bottom']

function generateConfig() {
  configContact('font', 'font', ['', 'w'], ['size', 'weight'])
  configContact('lh', 'line-height')
  configContact('bgc', 'background-color')
  configContact('w', 'width')
  configContact('mw', 'max-width')
  configContact('h', 'height')
  configContact('mh', 'max-height')
  configContact('bd', 'border', ['', 'c', 'rd', ...directionTypes], ['', 'color', 'raduis', ...directionOriginals])
  configContact('mg', 'margin', directionTypes, directionOriginals)
  configContact('pd', 'padding', directionTypes, directionOriginals)
}

function getCssProperty(key) {
  return config[key] ?? key.replace(/([A-Z])/g, (rs, $1) => '-' + $1.toLowerCase())
}

exports.getCssProperty = getCssProperty
