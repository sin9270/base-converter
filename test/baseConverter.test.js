/* eslint-env mocha */
'use strict';

import chai from 'chai';
const assert = chai.assert;
import {
  matchRegExp,
  isDecimalString,
  convertFromDecimal,
  convertToDecimal,
  convertBase,
  convertBaseSimply
} from '../src/js/baseConverter';

const base10 = '0123456789';
const base16 = '0123456789abcdef';
const base32 = '0123456789abcdefghijklmnopqrstuv';
const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe('test baseConverter', () => {
  it('test matchRegExp()', () => {
    // 適切な例外を投げているか
    assert.throws(() => {
      matchRegExp('abc');
    }, TypeError);
    assert.throws(() => {
      matchRegExp('abc', 'b');
    }, TypeError);
    assert.throws(() => {
      matchRegExp('012', 1);
    }, TypeError);

    // 適切な値を返しているか
    assert.strictEqual(matchRegExp('0', /0/), true);
    assert.strictEqual(matchRegExp(0, /0/), true);
    assert.strictEqual(matchRegExp('abc', /b/), true);
    assert.strictEqual(matchRegExp('abc', /d/), false);
    assert.strictEqual(matchRegExp('abc', /.*/), true);
    assert.strictEqual(matchRegExp('', /.*/), true);
    assert.strictEqual(matchRegExp(null, /.*/), true);
    assert.strictEqual(matchRegExp(undefined, /.*/), true);
    assert.strictEqual(matchRegExp(NaN, /.*/), true);
    assert.strictEqual(matchRegExp(Infinity, /0/), false);
    assert.strictEqual(matchRegExp('０', /0/), false);
    assert.strictEqual(matchRegExp('A', /a/), false);
  });

  it('test isDecimalString()', () => {
    // 適切な値を返しているか
    assert.strictEqual(isDecimalString('0'), true);
    assert.strictEqual(isDecimalString('100'), true);
    assert.strictEqual(isDecimalString(''), false);
    assert.strictEqual(isDecimalString(0), false);
    assert.strictEqual(isDecimalString(100), false);
    assert.strictEqual(isDecimalString(), false);
    assert.strictEqual(isDecimalString(null), false);
    assert.strictEqual(isDecimalString(undefined), false);
    assert.strictEqual(isDecimalString(NaN), false);
    assert.strictEqual(isDecimalString(Infinity), false);
    assert.strictEqual(isDecimalString('1 1'), false);
    assert.strictEqual(isDecimalString(' '), false);
    assert.strictEqual(isDecimalString('　'), false);
    assert.strictEqual(isDecimalString('１００'), false);
    assert.strictEqual(isDecimalString('+100'), false);
    assert.strictEqual(isDecimalString('-100'), false);
    assert.strictEqual(isDecimalString('100.1'), false);
    assert.strictEqual(isDecimalString('100e+0'), false);
    assert.strictEqual(isDecimalString('0x100'), false);
    assert.strictEqual(isDecimalString('at100'), false);
  });

  it('test convertFromDecimal()', () => {
    // 適切な例外を投げているか
    // integerだと最大長が短いため、originalNumberはstringに限定する
    assert.throws(() => {
      convertFromDecimal(null, base62);
    }, Error);
    assert.throws(() => {
      convertFromDecimal(undefined, base62);
    }, Error);
    assert.throws(() => {
      convertFromDecimal(NaN, base62);
    }, Error);
    assert.throws(() => {
      convertFromDecimal(Infinity, base62);
    }, Error);
    assert.throws(() => {
      convertFromDecimal(100, base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertFromDecimal('100', base62);
    }, Error);

    // originalNumberは正の10進数に限定する
    assert.throws(() => {
      convertFromDecimal('', base62);
    }, Error);
    assert.throws(() => {
      convertFromDecimal('test', base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertFromDecimal('100', base62);
    }, Error);

    // baseNumbersはstringに限定する
    assert.throws(() => {
      convertFromDecimal('100', null);
    }, Error);
    assert.throws(() => {
      convertFromDecimal('100', undefined);
    }, Error);
    assert.throws(() => {
      convertFromDecimal('100', NaN);
    }, Error);
    assert.throws(() => {
      convertFromDecimal('100', Infinity);
    }, Error);
    assert.throws(() => {
      convertFromDecimal('100', 123456789);
    }, Error);
    assert.doesNotThrow(() => {
      convertFromDecimal('100', '123456789');
    }, Error);

    // baseNumbersは同じ文字を含んではいけない
    assert.throws(() => {
      convertFromDecimal('100', '1234567899');
    }, Error);
    assert.doesNotThrow(() => {
      convertFromDecimal('100', '1234567890');
    }, Error);

    // baseNumbersの長さは2以上でなければならない(1進数は定義できないため)
    assert.throws(() => {
      convertFromDecimal('100', '');
    }, Error);
    assert.throws(() => {
      convertFromDecimal('100', '0');
    }, Error);
    assert.doesNotThrow(() => {
      convertFromDecimal('100', '01');
    }, Error);

    // 適切な値を返しているか
    assert.strictEqual(convertFromDecimal('0', '01'), '0');
    assert.strictEqual(convertFromDecimal('1', '01'), '1');
    assert.strictEqual(convertFromDecimal('2', '01'), '10');
    assert.strictEqual(convertFromDecimal('4', '01'), '100');
    assert.strictEqual(convertFromDecimal('10', '01'), '1010');
    assert.strictEqual(convertFromDecimal('100', '01'), '1100100');
    assert.strictEqual(convertFromDecimal('00100', '01'), '1100100');
    assert.strictEqual(convertFromDecimal('100', base16), '64');
    assert.strictEqual(convertFromDecimal('100', base62), '1C');
    const bigNumber = '9999999999'.repeat(10);
    assert.strictEqual(convertFromDecimal(bigNumber, base10), bigNumber);
  });

  it('test convertToDecimal()', () => {
    // 適切な例外を投げているか
    // originalNumberはstringに限定する
    assert.throws(() => {
      convertToDecimal(null, base62);
    }, Error);
    assert.throws(() => {
      convertToDecimal(undefined, base62);
    }, Error);
    assert.throws(() => {
      convertToDecimal(NaN, base62);
    }, Error);
    assert.throws(() => {
      convertToDecimal(Infinity, base62);
    }, Error);
    assert.throws(() => {
      convertToDecimal(100, base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertToDecimal('100', base62);
    }, Error);

    // baseNumbersはstringに限定する
    assert.throws(() => {
      convertToDecimal('100', null);
    }, Error);
    assert.throws(() => {
      convertToDecimal('100', undefined);
    }, Error);
    assert.throws(() => {
      convertToDecimal('100', NaN);
    }, Error);
    assert.throws(() => {
      convertToDecimal('100', Infinity);
    }, Error);
    assert.throws(() => {
      convertToDecimal('100', 1234567890);
    }, Error);
    assert.doesNotThrow(() => {
      convertToDecimal('100', '1234567890');
    }, Error);

    // baseNumbersは同じ文字を含んではいけない
    assert.throws(() => {
      convertToDecimal('100', '1234567899');
    }, Error);
    assert.doesNotThrow(() => {
      convertToDecimal('100', '1234567890');
    }, Error);

    // baseNumbersの長さは2以上でなければならない(1進数は定義できないため)
    assert.throws(() => {
      convertToDecimal('100', '');
    }, Error);
    assert.throws(() => {
      convertToDecimal('100', '0');
    }, Error);
    assert.doesNotThrow(() => {
      convertToDecimal('100', '01');
    }, Error);

    // originalNumberはbaseNumbersのみで構成されている必要がある
    assert.throws(() => {
      convertToDecimal('', base62);
    }, Error);
    assert.throws(() => {
      convertToDecimal('test', base16);
    }, Error);
    assert.doesNotThrow(() => {
      convertToDecimal('test', base62);
    }, Error);
    assert.throws(() => {
      convertToDecimal('test!', base62);
    }, Error);
    assert.doesNotThrow(() => {
      const base63 =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!';
      convertToDecimal('test!', base63);
    }, Error);

    // 適切な値を返しているか
    assert.strictEqual(convertToDecimal('0', '01'), '0');
    assert.strictEqual(convertToDecimal('1', '01'), '1');
    assert.strictEqual(convertToDecimal('10', '01'), '2');
    assert.strictEqual(convertToDecimal('100', '01'), '4');
    assert.strictEqual(convertToDecimal('00100', '01'), '4');
    assert.strictEqual(convertToDecimal('100', '012'), '9');
    assert.strictEqual(convertToDecimal('100', '0123'), '16');
    assert.strictEqual(convertToDecimal('100', base16), '256');
    assert.strictEqual(convertToDecimal('100', base32), '1024');
    assert.strictEqual(convertToDecimal('100', base62), '3844');
    const bigNumber = '9999999999'.repeat(10);
    assert.strictEqual(convertToDecimal(bigNumber, base10), bigNumber);
  });

  it('test convert big numbers', () => {
    // 大きな数を変換できるか
    const bigNumber = '9999999999'.repeat(10);
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '01'), '01'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '012'), '012'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '0123'), '0123'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, base16), base16),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, base32), base32),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, base62), base62),
      bigNumber
    );
  });

  it('test convertBase()', () => {
    // 適切な例外を投げているか
    // originalNumberはstringに限定する
    assert.throws(() => {
      convertBase(null, base62, base62);
    }, Error);
    assert.throws(() => {
      convertBase(undefined, base62, base62);
    }, Error);
    assert.throws(() => {
      convertBase(NaN, base62, base62);
    }, Error);
    assert.throws(() => {
      convertBase(Infinity, base62, base62);
    }, Error);
    assert.throws(() => {
      convertBase(100, base62, base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('100', base62, base62);
    }, Error);

    // originalBaseNumbersはstringに限定する
    assert.throws(() => {
      convertBase('100', null, base62);
    }, Error);
    assert.throws(() => {
      convertBase('100', undefined, base62);
    }, Error);
    assert.throws(() => {
      convertBase('100', NaN, base62);
    }, Error);
    assert.throws(() => {
      convertBase('100', Infinity, base62);
    }, Error);
    assert.throws(() => {
      convertBase('100', 1234567890, base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('100', '1234567890', base62);
    }, Error);

    // originalBaseNumbersは同じ文字を含んではいけない
    assert.throws(() => {
      convertBase('100', '1234567899', base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('100', '1234567890', base62);
    }, Error);

    // originalBaseNumbersの長さは2以上でなければならない(1進数は定義できないため)
    assert.throws(() => {
      convertBase('100', '', base62);
    }, Error);
    assert.throws(() => {
      convertBase('100', '0', base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('100', '01', base62);
    }, Error);

    // originalNumberはoriginalBaseNumbersのみで構成されている必要がある
    assert.throws(() => {
      convertBase('', base62, base62);
    }, Error);
    assert.throws(() => {
      convertBase('test', base16, base62);
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('test', base62, base62);
    }, Error);
    assert.throws(() => {
      convertBase('test!', base62, base62);
    }, Error);
    assert.doesNotThrow(() => {
      const base63 =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!';
      convertBase('test!', base63, base62);
    }, Error);

    // convertedBaseNumbersはstringに限定する
    assert.throws(() => {
      convertBase('100', base62, null);
    }, Error);
    assert.throws(() => {
      convertBase('100', base62, 123456789);
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('100', base62, '123456789');
    }, Error);

    // convertedBaseNumbersは同じ文字を含んではいけない
    assert.throws(() => {
      convertBase('100', base62, '1234567899');
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('100', base62, '1234567890');
    }, Error);

    // convertedBaseNumbersの長さは2以上でなければならない(1進数は定義できないため)
    assert.throws(() => {
      convertBase('100', base62, '');
    }, Error);
    assert.throws(() => {
      convertBase('100', base62, '0');
    }, Error);
    assert.doesNotThrow(() => {
      convertBase('100', base62, '01');
    }, Error);

    // 適切な値を返しているか
    assert.strictEqual(convertBase('100', base10, '01'), '1100100');
    assert.strictEqual(convertBase('100', base10, '012'), '10201');
    assert.strictEqual(convertBase('100', base10, '0123'), '1210');
    assert.strictEqual(convertBase('100', base10, base16), '64');
    assert.strictEqual(convertBase('100', base10, base32), '34');
    assert.strictEqual(convertBase('100', base10, base62), '1C');

    const bigNumberInBase10 = '9999999999'.repeat(10);
    assert.strictEqual(
      convertBase(bigNumberInBase10, base10, base10),
      bigNumberInBase10
    );

    const bigNumberInBase2 = '1111111111'.repeat(10);
    assert.strictEqual(
      convertBase(bigNumberInBase2, '01', '01'),
      bigNumberInBase2
    );

    const bigNumberInBase62 = 'ZZZZZZZZZZ'.repeat(10);
    assert.strictEqual(
      convertBase(bigNumberInBase62, base62, base62),
      bigNumberInBase62
    );
  });

  it('test convertBaseSimpley()', () => {
    // 適切な例外を投げているか
    // originalBaseはstringに限定する
    assert.throws(() => {
      convertBaseSimply('100', null, '10');
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', undefined, '10');
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', NaN, '10');
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', Infinity, '10');
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', 10, '10');
    }, Error);
    assert.doesNotThrow(() => {
      convertBaseSimply('100', '10', '10');
    }, Error);

    // convertedBaseはintegerに限定する
    assert.throws(() => {
      convertBaseSimply('100', '10', null);
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', '10', undefined);
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', '10', NaN);
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', '10', Infinity);
    }, Error);
    assert.throws(() => {
      convertBaseSimply('100', '10', 10);
    }, Error);
    assert.doesNotThrow(() => {
      convertBaseSimply('100', '10', '10');
    }, Error);

    // originalBaseは2から62に限定する
    assert.throws(() => {
      convertBaseSimply('100', '0', '10');
    }, RangeError);
    assert.throws(() => {
      convertBaseSimply('100', '1', '10');
    }, RangeError);
    assert.doesNotThrow(() => {
      convertBaseSimply('100', '2', '10');
    }, RangeError);
    assert.doesNotThrow(() => {
      convertBaseSimply('100', '62', '10');
    }, RangeError);
    assert.throws(() => {
      convertBaseSimply('100', '63', '10');
    }, RangeError);

    // convertedBaseは2から62に限定する
    assert.throws(() => {
      convertBaseSimply('100', '10', '0');
    }, RangeError);
    assert.throws(() => {
      convertBaseSimply('100', '10', '1');
    }, RangeError);
    assert.doesNotThrow(() => {
      convertBaseSimply('100', '10', '2');
    }, RangeError);
    assert.doesNotThrow(() => {
      convertBaseSimply('100', '10', '62');
    }, RangeError);
    assert.throws(() => {
      convertBaseSimply('100', '10', '63');
    }, RangeError);

    // 適切な値を返しているか
    assert.strictEqual(convertBaseSimply('100', '10', '2'), '1100100');
    assert.strictEqual(convertBaseSimply('100', '10', '3'), '10201');
    assert.strictEqual(convertBaseSimply('100', '10', '4'), '1210');
    assert.strictEqual(convertBaseSimply('100', '10', '16'), '64');
    assert.strictEqual(convertBaseSimply('100', '10', '32'), '34');
    assert.strictEqual(convertBaseSimply('100', '10', '62'), '1C');

    const bigNumberInBase10 = '9999999999'.repeat(10);
    assert.strictEqual(
      convertBaseSimply(bigNumberInBase10, '10', '10'),
      bigNumberInBase10
    );

    const bigNumberInBase2 = '1111111111'.repeat(10);
    assert.strictEqual(
      convertBaseSimply(bigNumberInBase2, '2', '2'),
      bigNumberInBase2
    );

    const bigNumberInBase62 = 'ZZZZZZZZZZ'.repeat(10);
    assert.strictEqual(
      convertBaseSimply(bigNumberInBase62, '62', '62'),
      bigNumberInBase62
    );
  });
});
