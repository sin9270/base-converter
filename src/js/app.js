'use strict';

import React from 'react';
import { convertBase } from './baseConverter';

const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalNumber: '',
      originalBase: '',
      convertedBase: '',
      baseNumbers: base62
    };
  }

  render() {
    const originalNumber = this.state.originalNumber;
    const originalBase = this.state.originalBase;
    const convertedBase = this.state.convertedBase;
    const baseNumbers = this.state.baseNumbers;

    let convertedNumber;
    try {
      convertedNumber = convertBase(
        originalNumber,
        originalBase,
        convertedBase,
        baseNumbers
      );
    } catch (e) {
      convertedNumber = '';
    }

    return (
      <div className="app">
        <div>
          <input
            type="text"
            value={baseNumbers}
            onChange={e => {
              this.setState({
                baseNumbers: e.target.value
              });
            }}
          />
          の数字を用いて
        </div>
        <div>
          <input
            type="text"
            value={originalBase}
            onChange={e => {
              this.setState({
                originalBase: e.target.value
              });
            }}
          />
          進数の
        </div>
        <div>
          <input
            type="text"
            value={originalNumber}
            onChange={e => {
              this.setState({
                originalNumber: e.target.value
              });
            }}
          />
          を
        </div>
        <div>
          <input
            type="text"
            value={convertedBase}
            onChange={e => {
              this.setState({
                convertedBase: e.target.value
              });
            }}
          />
          進数に変換すると
        </div>
        <div>{convertedNumber}です。</div>
      </div>
    );
  }
}
