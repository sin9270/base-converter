/* eslint-env mocha */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import TabRouter from '../src/js/components/TabRouter';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// propTypesの型違反は標準エラー出力されるだけなので、それを検知するためエラーを投げるように上書く
console.error = (error) => {
  throw new Error(error);
};

describe('test TabRouter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TabRouter initialTab="App" />);
  });

  it('propsの型が異なる場合にエラーになるかチェック', () => {
    expect(() => {
      shallow(<TabRouter />);
    }).toThrow();

    expect(() => {
      shallow(<TabRouter initialTab={0} />);
    }).toThrow();
  });

  it('子コンポーネントが存在するかチェック', () => {
    expect(wrapper.find(Tab).length).toBe(2);
  });

  it('クリックしたタブが表示されるかチェック', () => {
    // 初めはAppタブが選択されている
    expect(wrapper.find(Tabs).props().value).toBe('App');

    // TabをクリックするだけではonChange()が発火しない
    // wrapper.find(Tab).find({ value: 'AdvancedApp' }).simulate('click');

    // 親のTabsのonChange()が発火すると、hooksによりTabsのvalueが変化するので、その値をチェックする
    wrapper.find(Tabs).props().onChange(null, 'AdvancedApp');
    expect(wrapper.find(Tabs).props().value).toBe('AdvancedApp');
  });

  // You should not use <Link> outside a <Router> とエラーが出てしまう
  // it('snapshotと比較', () => {
  //   const tree = renderer
  //     .create(<TabRouter initialTab='App' />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
