/* eslint-env mocha */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ErrorMessage from '../src/js/components/ErrorMessage';

// propTypesの型違反は標準エラー出力されるだけなので、それを検知するためエラーを投げるように上書く
console.error = (error) => {
  throw new Error(error);
};

describe('test ErrorMessage', () => {
  it('propsの値を表示しているかチェック', () => {
    const wrapper = shallow(<ErrorMessage message="An error occurred!" />);
    expect(wrapper.text()).toBe('An error occurred!');
  });

  it('propsの型が異なる場合にエラーになるかチェック', () => {
    expect(() => {
      shallow(<ErrorMessage />);
    }).toThrow();

    expect(() => {
      shallow(<ErrorMessage message={0} />);
    }).toThrow();
  });

  it('snapshotと比較', () => {
    const tree = renderer
      .create(<ErrorMessage message="An error occurred!" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
