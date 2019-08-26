'use strict';

import Decimal from 'decimal.js';
Decimal.set({ precision: 1e9 });
Decimal.set({ toExpPos: 9e15 });

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
const convertFromDecimal = (originalNumber, baseNumbers) => {
  // integerだと最大長が短いため、originalNumberはstringに限定する
  if (typeof originalNumber !== 'string') {
    throw new Error('First augument must be a string.');
  }

  // originalNumberは正の10進数に限定する
  if (!isDecimalString(originalNumber)) {
    throw new Error('First augument must be a decimal.');
  }

  // baseNumbersはstringに限定する
  if (typeof baseNumbers !== 'string') {
    throw new Error('Second augument must be a string.');
  }

  // baseNumbersは同じ文字を含んではいけない
  if (baseNumbers.length !== new Set(baseNumbers).size) {
    throw new Error('Second augument must not contain the same characters.');
  }

  // baseNumbersの長さは2以上でなければならない(1進数は定義できないため)
  const decimalBase = new Decimal(baseNumbers.length);
  const isLargerThan1 = decimalBase.comparedTo(new Decimal(1)) === 1;
  if (!isLargerThan1) {
    throw new Error("Second augument' length must be larger than 1.");
  }

  // 変換後の文字列を一文字ずつ区切って格納する配列
  const convertedNumbers = [];

  // 変換前の文字列が0だった場合、convertedNumbersが空配列にならないように0を追加する
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
const convertToDecimal = (originalNumber, baseNumbers) => {
  // originalNumberはstringに限定する
  if (typeof originalNumber !== 'string') {
    throw new Error('First augument must be a string.');
  }

  // baseNumbersはstringに限定する
  if (typeof baseNumbers !== 'string') {
    throw new Error('Second augument must be a string.');
  }

  // baseNumbersは同じ文字を含んではいけない
  if (baseNumbers.length !== new Set(baseNumbers).size) {
    throw new Error('Second augument must not contain the same characters.');
  }

  // baseNumbersの長さは2以上でなければならない(1進数は定義できないため)
  const decimalBase = new Decimal(baseNumbers.length);
  const isLargerThan1 = decimalBase.comparedTo(new Decimal(1)) === 1;
  if (!isLargerThan1) {
    throw new Error("Second augument' length must be larger than 1.");
  }

  // originalNumberはbaseNumbersのみで構成されている必要がある
  const availableCharacters = new RegExp('^[' + baseNumbers + ']+$');
  if (!matchRegExp(originalNumber, availableCharacters)) {
    throw new Error('First augument must consist of second augument.');
  }

  // 進数文字列をインデックスに変換する連想配列を作成する
  const baseNumbers2Index = {};
  for (let i = 0; i < baseNumbers.length; i++) {
    baseNumbers2Index[baseNumbers.substr(i, 1)] = new Decimal(i);
  }

  // 変換処理
  let convertedNumber = new Decimal(0);
  for (let i = 0; i < originalNumber.length; i++) {
    const tmpDecimal1 =
      baseNumbers2Index[originalNumber.substr((i + 1) * -1, 1)];
    const tmpDecimal2 = Decimal.pow(decimalBase, i);
    const tmpDecimal3 = tmpDecimal1.times(tmpDecimal2);
    convertedNumber = convertedNumber.plus(tmpDecimal3);
  }

  return convertedNumber.toString();
};

const convertBase = (
  originalNumber,
  originalBaseNumbers,
  convertedBaseNumbers
) => {
  // 変換処理
  const tmpNumber = convertToDecimal(originalNumber, originalBaseNumbers);
  try {
    const convertedNumber = convertFromDecimal(tmpNumber, convertedBaseNumbers);
    return convertedNumber.toString();
  } catch (e) {
    if (matchRegExp(e.message, /Second/)) {
      throw new Error(e.message.replace('Second', 'Third'));
    } else {
      throw new Error(e.message);
    }
  }
};

const convertBaseSimply = (originalNumber, originalBase, convertedBase) => {
  // originalBaseとconvertedBaseはintegerに限定する
  if (typeof originalBase !== 'number') {
    throw new TypeError('Second augument must be a number.');
  }
  if (typeof convertedBase !== 'number') {
    throw new TypeError('Third augument must be a number.');
  }

  // originalBaseとconvertedBaseは2から62に限定する
  if (!(2 <= originalBase && originalBase <= 62)) {
    throw new RangeError('Second augument must be between 2 and 62.');
  }
  if (!(2 <= convertedBase && convertedBase <= 62)) {
    throw new RangeError('Third augument must be between 2 and 62.');
  }

  // 引数の進数から変換に用いる進数文字列を生成する
  const base62 =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const originalBaseNumbers = base62.substr(0, originalBase);
  const convertedBaseNumbers = base62.substr(0, convertedBase);

  // 変換処理
  const tmpNumber = convertToDecimal(originalNumber, originalBaseNumbers);
  try {
    const convertedNumber = convertFromDecimal(tmpNumber, convertedBaseNumbers);
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
  convertBase,
  convertBaseSimply
};
