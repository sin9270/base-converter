/* eslint @typescript-eslint/no-explicit-any: 0 */
import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import ErrorMessage from '../src/js/components/ErrorMessage';

describe('test ErrorMessage', () => {
  it('propsの値を表示しているかチェック', () => {
    const wrapper = shallow(<ErrorMessage message="An error occurred!" />);
    expect(wrapper.text()).toBe('An error occurred!');
  });

  it('snapshotと比較', () => {
    const tree = renderer
      .create(<ErrorMessage message="An error occurred!" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
