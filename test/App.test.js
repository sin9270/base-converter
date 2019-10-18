/* eslint-env mocha */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import App from '../src/js/components/App';
import TabRouter from '../src/js/components/TabRouter';
import BootstrapInput from '../src/js/components/BootstrapInput';
import ErrorMessage from '../src/js/components/ErrorMessage';

describe('test App', () => {
  const testProps = {
    originalBase: '10',
    originalNumber: '100',
    convertedBase: '16',
    inputOriginalBase: jest.fn(),
    inputOriginalNumber: jest.fn(),
    inputConvertedBase: jest.fn()
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App {...testProps} />);
  });

  it('子コンポーネントが存在するかチェック', () => {
    expect(wrapper.find(TabRouter).length).toBe(1);
    expect(wrapper.find(BootstrapInput).length).toBe(4);
    expect(wrapper.find(ErrorMessage).length).toBe(3);
  });

  it('テキストボックスの値が変化するとcallbackが呼ばれるかチェック', () => {
    wrapper
      .find(BootstrapInput)
      .at(0)
      .simulate('change', { target: { value: '0' } });
    expect(testProps.inputOriginalBase).toHaveBeenCalled();

    wrapper
      .find(BootstrapInput)
      .at(1)
      .simulate('change', { target: { value: '0' } });
    expect(testProps.inputOriginalNumber).toHaveBeenCalled();

    wrapper
      .find(BootstrapInput)
      .at(2)
      .simulate('change', { target: { value: '0' } });
    expect(testProps.inputConvertedBase).toHaveBeenCalled();
  });

  // it('snapshotと比較', () => {
  //   const tree = renderer
  //     .create(<App {...testProps} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
