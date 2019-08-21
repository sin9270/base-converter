/* eslint-env mocha */
'use strict';

import assert from 'assert';
import {
  matchRegExp,
  isDecimalString,
  convertFromDecimal,
  convertToDecimal,
  convertBase
} from '../src/js/baseConverter';

describe('test baseConverter', () => {
  it('test matchRegExp()', () => {
    // 適切な例外を投げているか
    assert.throws(() => {
      matchRegExp('abc');
    }, TypeError('Second augument must be a RegExp.'));
    assert.throws(() => {
      matchRegExp('abc', 'b');
    }, TypeError('Second augument must be a RegExp.'));
    assert.throws(() => {
      matchRegExp('012', 1);
    }, TypeError('Second augument must be a RegExp.'));

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
    // integerだと最大長が短いため、originalNumberとbaseはstringに限定
    assert.throws(() => {
      convertFromDecimal();
    }, TypeError);
    assert.throws(() => {
      convertFromDecimal(100);
    }, TypeError);
    assert.throws(() => {
      convertFromDecimal('100');
    }, TypeError);
    assert.throws(() => {
      convertFromDecimal('100', 2);
    }, TypeError);
    // originalNumberとbaseは正の10進数に限定
    assert.throws(() => {
      convertFromDecimal('', '2');
    }, TypeError);
    assert.throws(() => {
      convertFromDecimal('test', '2');
    }, TypeError);
    assert.throws(() => {
      convertFromDecimal('100', '');
    }, TypeError);
    assert.throws(() => {
      convertFromDecimal('100', 'test');
    }, TypeError);
    // baseは1より大きい(2以上の)値でなければならない
    assert.throws(() => {
      convertFromDecimal('100', '0');
    }, RangeError);
    assert.throws(() => {
      convertFromDecimal('100', '1');
    }, RangeError);
    assert.doesNotThrow(() => {
      convertFromDecimal('100', '2');
    }, RangeError);
    // baseNumbersはstringに限定するが、引数が渡されていない場合はデフォルト値を設定
    assert.throws(() => {
      convertFromDecimal('100', '2', 0);
    }, TypeError);
    // baseNumbersは同じ文字を含んではいけない
    assert.throws(() => {
      convertFromDecimal('100', '2', 'test');
    }, Error);
    // baseはbaseNumbersの文字種類数よりも小さい値でなければならない
    assert.doesNotThrow(() => {
      convertFromDecimal('100', '62');
    }, RangeError);
    assert.throws(() => {
      convertFromDecimal('100', '63');
    }, RangeError);
    assert.doesNotThrow(() => {
      const base63 =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!';
      convertFromDecimal('100', '63', base63);
    }, RangeError);
    assert.throws(() => {
      const base16 = '0123456789abcdef';
      convertFromDecimal('100', '62', base16);
    }, RangeError);

    // 適切な値を返しているか
    assert.strictEqual(convertFromDecimal('0', '2'), '0');
    assert.strictEqual(convertFromDecimal('1', '2'), '1');
    assert.strictEqual(convertFromDecimal('2', '2'), '10');
    assert.strictEqual(convertFromDecimal('4', '2'), '100');
    assert.strictEqual(convertFromDecimal('10', '2'), '1010');
    assert.strictEqual(convertFromDecimal('100', '2'), '1100100');
    assert.strictEqual(convertFromDecimal('00100', '2'), '1100100');
    assert.strictEqual(convertFromDecimal('100', '002'), '1100100');
    assert.strictEqual(convertFromDecimal('00100', '002'), '1100100');
    assert.strictEqual(convertFromDecimal('100', '16'), '64');
    assert.strictEqual(convertFromDecimal('100', '62'), '1C');
    assert.strictEqual(
      convertFromDecimal('100', '2', '0123456789abcdef'),
      '1100100'
    );
    assert.strictEqual(
      convertFromDecimal('100', '16', '0123456789abcdef'),
      '64'
    );
    const bigNumber = '9999999999'.repeat(10);
    assert.strictEqual(convertFromDecimal(bigNumber, '10'), bigNumber);
  });

  it('test convertToDecimal()', () => {
    // 適切な例外を投げているか
    // originalNumberとbaseはstringに限定
    assert.throws(() => {
      convertToDecimal();
    }, TypeError);
    assert.throws(() => {
      convertToDecimal(100);
    }, TypeError);
    assert.throws(() => {
      convertToDecimal('100');
    }, TypeError);
    assert.throws(() => {
      convertToDecimal('100', 2);
    }, TypeError);
    // baseは正の10進数に限定
    assert.throws(() => {
      convertToDecimal('100', '');
    }, TypeError);
    assert.throws(() => {
      convertToDecimal('100', 'test');
    }, TypeError);
    // baseは1より大きい(2以上の)値でなければならない
    assert.throws(() => {
      convertToDecimal('100', '0');
    }, RangeError);
    assert.throws(() => {
      convertToDecimal('100', '1');
    }, RangeError);
    assert.doesNotThrow(() => {
      convertToDecimal('100', '2');
    }, RangeError);
    // baseNumbersはstringに限定するが、引数が渡されていない場合はデフォルト値を設定
    assert.throws(() => {
      convertToDecimal('100', '2', 0);
    }, TypeError);
    // baseNumbersは同じ文字を含んではいけない
    assert.throws(() => {
      convertToDecimal('100', '2', 'test');
    }, Error);
    // baseはbaseNumbersの文字種類数よりも小さい値でなければならない
    assert.doesNotThrow(() => {
      convertToDecimal('100', '62');
    }, RangeError);
    assert.throws(() => {
      convertToDecimal('100', '63');
    }, RangeError);
    assert.doesNotThrow(() => {
      const base63 =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!';
      convertToDecimal('100', '63', base63);
    }, RangeError);
    assert.throws(() => {
      const base16 = '0123456789abcdef';
      convertToDecimal('100', '62', base16);
    }, RangeError);
    // originalNumberはbaseNumbersのみで構成されている必要がある
    assert.throws(() => {
      convertToDecimal('', '62');
    }, Error);
    assert.throws(() => {
      convertToDecimal('test!', '62');
    }, Error);
    assert.throws(() => {
      convertToDecimal('test', '16');
    }, Error);
    assert.doesNotThrow(() => {
      const base63 =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!';
      convertToDecimal('test!', '63', base63);
    }, Error);

    // 適切な値を返しているか
    assert.strictEqual(convertToDecimal('0', '2'), '0');
    assert.strictEqual(convertToDecimal('1', '2'), '1');
    assert.strictEqual(convertToDecimal('10', '2'), '2');
    assert.strictEqual(convertToDecimal('100', '2'), '4');
    assert.strictEqual(convertToDecimal('00100', '2'), '4');
    assert.strictEqual(convertToDecimal('100', '002'), '4');
    assert.strictEqual(convertToDecimal('00100', '002'), '4');
    assert.strictEqual(convertToDecimal('100', '3'), '9');
    assert.strictEqual(convertToDecimal('100', '4'), '16');
    assert.strictEqual(convertToDecimal('100', '16'), '256');
    assert.strictEqual(convertToDecimal('100', '32'), '1024');
    assert.strictEqual(convertToDecimal('100', '62'), '3844');
    assert.strictEqual(convertToDecimal('100', '2', '0123456789abcdef'), '4');
    assert.strictEqual(convertToDecimal('100', '3', '0123456789abcdef'), '9');
    assert.strictEqual(convertToDecimal('100', '4', '0123456789abcdef'), '16');
    assert.strictEqual(
      convertToDecimal('100', '16', '0123456789abcdef'),
      '256'
    );
    const bigNumber = '9999999999'.repeat(10);
    assert.strictEqual(convertToDecimal(bigNumber, '10'), bigNumber);
  });

  it('test convertFromDecimal() and convertToDecimal()', () => {
    const bigNumber = '9999999999'.repeat(10);
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '2'), '2'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '3'), '3'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '4'), '4'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '16'), '16'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '32'), '32'),
      bigNumber
    );
    assert.strictEqual(
      convertToDecimal(convertFromDecimal(bigNumber, '62'), '62'),
      bigNumber
    );
  });

  it('test convertBase()', () => {
    assert.strictEqual(convertBase('100', '10', '2'), '1100100');
    assert.strictEqual(convertBase('100', '10', '3'), '10201');
    assert.strictEqual(convertBase('100', '10', '4'), '1210');
    assert.strictEqual(convertBase('100', '10', '16'), '64');
    assert.strictEqual(convertBase('100', '10', '32'), '34');
    assert.strictEqual(convertBase('100', '10', '62'), '1C');

    const bigNumberInBase10 = '9999999999'.repeat(10);
    assert.strictEqual(
      convertBase(bigNumberInBase10, '10', '10'),
      bigNumberInBase10
    );

    const bigNumberInBase2 = '1111111111'.repeat(10);
    assert.strictEqual(
      convertBase(bigNumberInBase2, '2', '2'),
      bigNumberInBase2
    );

    const bigNumberInBase62 = 'ZZZZZZZZZZ'.repeat(10);
    assert.strictEqual(
      convertBase(bigNumberInBase62, '62', '62'),
      bigNumberInBase62
    );
  });
});
