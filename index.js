const Joi = require('joi');
const emojiRegex = require('emoji-regex');

const regex = emojiRegex();

const countEmojis = (str) => {
  let count = 0;
  let countCodePoints = 0;
  let match;
  // eslint-disable-next-line
  while (match = regex.exec(str)) {
    const emoji = match[0];
    countCodePoints += [...emoji].length;
    count += 1;
  }
  return [count, countCodePoints];
};

const regexEmoji = joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    emojiMin: {
      base: 'with value "{{!value}}" must contain at least {{limit}} emojis. Counted {{count}}.',
    },
    emojiMax: {
      base: 'with value "{{!value}}" must contain not more than {{limit}} emojis. Counted {{count}}.',
    },
    emoji: {
      base: 'with value "{{!value}}" does not contain emojis',
      invert: {
        base: 'with value "{{!value}}" contains emojis',
      },
    },
  },
  rules: [
    {
      name: 'emojiMin',
      params: {
        _emojiMin: Joi.number().integer(),
      },

      validate(params, value, state, options) {
        const limit = params._emojiMin;
        const [count] = countEmojis(value);

        if (count >= limit) {
          return value;
        }

        return this.createError('string.emojiMin.base', {
          value,
          limit,
          count,
        }, state, options);
      },
    },
    {
      name: 'emojiMax',
      params: {
        _emojiMax: Joi.number().integer(),
      },

      validate(params, value, state, options) {
        const limit = params._emojiMax;
        const [count] = countEmojis(value);

        if (count <= limit) {
          return value;
        }

        return this.createError('string.emojiMin.base', {
          value,
          limit,
          count,
        }, state, options);
      },
    },
    {
      name: 'emoji',
      params: {
        q: Joi.object().keys({
          invert: Joi.boolean(),
        }),
      },

      validate(params, value, state, options) {
        const invert = !!(params.q || {}).invert;

        const [_emojiCount, _emojiCodePointCount] = countEmojis(value);

        this._flags._emojiCount = _emojiCount;
        this._flags._emojiCodePointCount = _emojiCodePointCount;

        if (invert ^ regex.test(value)) {
          return value;
        }

        return this.createError(`string.emoji${invert ? '.invert' : ''}.base`, {
          value,
          invert,
        }, state, options);
      },
    },
  ],
});

module.exports = regexEmoji;
