'use strict';

import Decimal from 'decimal.js';
Decimal.set({ precision: 1e9 });
Decimal.set({ toExpPos: 9e15 });

const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 正規表現にマッチするか判定する
const matchRegExp = (value, regExp) => {
  if (!(regExp instanceof RegExp)) {
    throw new TypeError('Second augument must be a RegExp.');
  }

  if (regExp.test(value)) {
    return true;
  }

  return false;
};

// 整数文字列か判定する
// 先頭が0の場合も認める
const isDecimalString = value => {
  if (typeof value !== 'string') {
    return false;
  }
  const availableCharacters = /^([0-9]+)$/;
  return matchRegExp(value, availableCharacters);
};

// 10進数の文字列を他進数に変換する
const convertFromDecimal = (originalNumber, base, baseNumbers) => {
  // integerだと最大長が短いため、originalNumberとbaseはstringに限定
  if (typeof originalNumber !== 'string') {
    throw new TypeError('First augument must be a string.');
  }
  if (typeof base !== 'string') {
    throw new TypeError('Second augument must be a string.');
  }

  // originalNumberとbaseは正の10進数に限定
  if (!isDecimalString(originalNumber)) {
    throw new TypeError('First augument must be a decimal.');
  }
  if (!isDecimalString(base)) {
    throw new TypeError('Second augument must be a decimal.');
  }

  // baseは1より大きい(2以上の)値でなければならない
  const decimalBase = new Decimal(base);
  const isLargerThan1 = decimalBase.comparedTo(new Decimal(1)) === 1;
  if (!isLargerThan1) {
    throw new RangeError('Second augument must be larger than 1.');
  }

  // baseNumbersはstringに限定するが、引数が渡されていない場合はデフォルト値を設定
  baseNumbers = typeof baseNumbers !== 'undefined' ? baseNumbers : base62;
  if (typeof baseNumbers !== 'string') {
    throw new TypeError('Third augument must be a string.');
  }

  // baseNumbersは同じ文字を含んではいけない
  if (baseNumbers.length !== new Set(baseNumbers).size) {
    throw new Error('Third augument must not contain the same characters.');
  }

  // baseはbaseNumbersの文字種類数よりも小さい値でなければならない
  const baseNumbersSize = new Decimal(baseNumbers.length);
  if (decimalBase.comparedTo(baseNumbersSize) === 1) {
    throw new RangeError(
      'Second augument must be lower than the length of baseNumbers.'
    );
  }

  const convertedNumbers = []; // 変換後の文字列を一文字ずつ区切った配列

  // 変換前の文字列が0だった場合、convertedNumbersが空配列にならないように0を追加
  let decimalOriginalNumber = new Decimal(originalNumber);
  if (decimalOriginalNumber.isZero()) {
    convertedNumbers.unshift('0');
  }

  // 変換処理
  while (!decimalOriginalNumber.isZero()) {
    const remainder = decimalOriginalNumber.mod(decimalBase);
    decimalOriginalNumber = decimalOriginalNumber.dividedToIntegerBy(
      decimalBase
    );
    convertedNumbers.unshift(baseNumbers.substr(remainder, 1));
  }

  const result = convertedNumbers.join('');

  return result;
};

// 他進数の文字列を10進数に変換する
const convertToDecimal = (originalNumber, base, baseNumbers) => {
  // originalNumberとbaseはstringに限定
  if (typeof originalNumber !== 'string') {
    throw new TypeError('First augument must be a string.');
  }
  if (typeof base !== 'string') {
    throw new TypeError('Second augument must be a string.');
  }

  // baseは10進数に限定
  if (!isDecimalString(base)) {
    throw new TypeError('Second augument must be a decimal.');
  }

  // baseは1より大きい(2以上の)値でなければならない
  const decimalBase = new Decimal(base);
  const isLargerThan1 = decimalBase.comparedTo(new Decimal(1)) === 1;
  if (!isLargerThan1) {
    throw new RangeError('Second augument must be larger than 1.');
  }

  // baseNumbersはstringに限定するが、引数が渡されていない場合はデフォルト値を設定
  baseNumbers = typeof baseNumbers !== 'undefined' ? baseNumbers : base62;
  if (typeof baseNumbers !== 'string') {
    throw new TypeError('Third augument must be a string.');
  }

  // baseNumbersは同じ文字を含んではいけない
  if (baseNumbers.length !== new Set(baseNumbers).size) {
    throw new Error('Third augument must not contain the same characters.');
  }

  // baseはbaseNumbersの文字種類数よりも小さい値でなければならない
  const baseNumbersSize = new Decimal(baseNumbers.length);
  if (decimalBase.comparedTo(baseNumbersSize) === 1) {
    throw new RangeError(
      'Second augument must be lower than the length of baseNumbers.'
    );
  }

  // 進数baseに合わせて進数文字列baseNumbersを調整する
  // この処理がないと、例えば9が2進数として認識されてしまい、次の処理が想定通り動作しない
  baseNumbers = baseNumbers.substr(0, decimalBase.toNumber());

  // originalNumberはbaseNumbersのみで構成されている必要がある
  const availableCharacters = new RegExp('^[' + baseNumbers + ']+$');
  if (!matchRegExp(originalNumber, availableCharacters)) {
    throw new Error('First augument must consist of baseNumbers.');
  }

  // 進数文字列をインデックスに変換する連想配列を作成
  const baseNumbers2Index = {};
  for (let i = 0; i < baseNumbers.length; i++) {
    baseNumbers2Index[baseNumbers.substr(i, 1)] = new Decimal(i);
  }

  // 変換処理
  let convertedNumber = new Decimal(0);
  for (let i = 0; i < originalNumber.length; i++) {
    const tmpDecimal1 =
      baseNumbers2Index[originalNumber.substr((i + 1) * -1, 1)];
    const tmpDecimal2 = Decimal.pow(base, i);
    const tmpDecimal3 = tmpDecimal1.times(tmpDecimal2);
    convertedNumber = convertedNumber.plus(tmpDecimal3);
  }

  return convertedNumber.toString();
};

const convertBase = (
  originalNumber,
  originalBase,
  convertedBase,
  baseNumbers
) => {
  // 変換処理
  // 例外が発生した場合は、エラーメッセージを変換する
  let tmpNumber;
  try {
    tmpNumber = convertToDecimal(originalNumber, originalBase, baseNumbers);
  } catch (e) {
    if (matchRegExp(e.message, /Third/)) {
      throw new Error(e.message.replace('Third', 'Fourth'));
    } else {
      throw new Error(e.message);
    }
  }

  try {
    const convertedNumber = convertFromDecimal(
      tmpNumber,
      convertedBase,
      baseNumbers
    );
    return convertedNumber.toString();
  } catch (e) {
    if (matchRegExp(e.message, /Second/)) {
      throw new Error(e.message.replace('Second', 'Third'));
    } else {
      throw new Error(e.message);
    }
  }
};

export {
  matchRegExp,
  isDecimalString,
  convertFromDecimal,
  convertToDecimal,
  convertBase
};
