[![NSP Status](https://nodesecurity.io/orgs/iilei/projects/f395d0e1-b9a5-4303-a0c2-30ea07d694fd/badge)](https://nodesecurity.io/orgs/iilei/projects/f395d0e1-b9a5-4303-a0c2-30ea07d694fd)

# joi-emoji-constraints

Extend Joi with Emoji Constraints (min max)

## Usage

```
npm install --save joi-emoji-constraints
```

or 

```
yarn add joi-emoji-constraints
```


```js
var joiEmojiRegex = require('joi-emoji-constraints')
var PlainJoi = require('joi');
var Joi = PlainJoi.extend(joiEmojiRegex(PlainJoi));

Joi.emoji().validate('🙊 🙈 🙉', function (err) {
  console.log(err ? 'Invalid' : 'Valid')
})

Joi.emojiMax(3).validate('💃🏿💃🏼💃🏻', function (err) {
  console.log(err ? 'Invalid' : 'Valid')
})

Joi.emojiMin(3).validate('💃🏿💃🏼💃🏻', function (err) {
  console.log(err ? 'Invalid' : 'Valid')
})
```

## TODO

- [ ] constraints params for `emoji()`:
  - [ ] `min`
  - [ ] `max`
  - [ ] `minConsecutive`
  - [ ] `maxConsecutive`
  - [ ] `minIdentical`
  - [ ] `maxIdentical`

## Credits

 *  [mathiasbynens/emoji-regex](https://github.com/mathiasbynens/emoji-regex)
