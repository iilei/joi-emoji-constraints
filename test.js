const test = require('tape');
const extEmoji = require('./');
let Joi = require('joi');

// '%uD83D%uDE4A %uD83D%uDE48 %uD83D%uDE49'
// :speak_no_evil: :see_no_evil: :hear_no_evil:
const emojiString = '🙊 🙈 🙉';
const modifierString = '💃🏿💃🏼💃🏻';


Joi = Joi.extend(extEmoji(Joi));

test('Should validate a String containing an emoji', (t) => {
  t.plan(1);
  const result = Joi.string().emoji().validate(emojiString);
  t.error(result.error, 'Expected to recognize Emoji String');
  t.end();
});

test('Should validate a String non-emoji String', (t) => {
  t.plan(1);
  const result = Joi.string().emoji().validate('lol');
  t.ok(result.error, 'Expected error validating non-emoji String');
  t.end();
});

test('Should validate a String containing an emoji with the invert option', (t) => {
  t.plan(1);
  const result = Joi.string().emoji({ invert: true }).validate(emojiString);
  t.ok(result.error, 'Expected error validating Emoji String');
  t.end();
});

test('Should validate a String non-emoji String with the invert option', (t) => {
  t.plan(1);
  const result = Joi.string().emoji({ invert: true }).validate('lol');
  t.error(result.error, 'Expected error validating non-emoji String');
  t.end();
});

test('Should assign countCodePoints correct', (t) => {
  t.plan(1);
  const result = Joi.string().emoji({ invert: true }).validate('lol');
  t.error(result.error, 'Expected error validating non-emoji String');
  t.end();
});


test('Should recognize emojiMin count Error', (t) => {
  t.plan(1);
  const result = Joi.string().emojiMin(4).validate(emojiString);
  t.ok(result.error, 'Expected error');
  t.end();
});

test('Should recognize emojiMin count', (t) => {
  t.plan(1);
  const result = Joi.string().emojiMin(3).validate(emojiString);
  t.error(result.error, 'Expected error');
  t.end();
});


test('Should recognize emojiMax count Error', (t) => {
  t.plan(1);
  const result = Joi.string().emojiMax(2).validate(emojiString);
  t.ok(result.error, 'Expected error');
  t.end();
});

test('Should recognize emojiMax count', (t) => {
  t.plan(1);
  const result = Joi.string().emojiMax(3).validate(emojiString);
  t.error(result.error, 'Expected error');
  t.end();
});


test('Should recognize emojiMax count', (t) => {
  t.plan(1);
  const result = Joi.string().emojiMax(3).validate(modifierString);
  t.error(result.error, 'Expected error');
  t.end();
});

test('Should recognize emojiMax count Error', (t) => {
  t.plan(1);
  const result = Joi.string().emojiMax(0).validate('mop');
  t.error(result.error);
  t.end();
});
