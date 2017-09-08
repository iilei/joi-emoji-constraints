# joi-emoji-constraints

Extend Joi with Emoji Constraints (min max)

## Usage

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
