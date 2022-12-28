/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-non-null-assertion: 0 */
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import TabRouter from '../src/js/components/TabRouter';

describe('test TabRouter', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<TabRouter initialTab="App" />);
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
    // wrapper.find(Tabs).props().onChange(null as any, 'AdvancedApp');
    wrapper.find(Tabs).prop('onChange')!(null as any, 'AdvancedApp');
    expect(wrapper.find(Tabs).props().value).toBe('AdvancedApp');
  });
});
