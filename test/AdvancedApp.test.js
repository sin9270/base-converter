/* eslint-env mocha */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import AdvancedApp from '../src/js/components/AdvancedApp';
import TabRouter from '../src/js/components/TabRouter';
import BootstrapInput from '../src/js/components/BootstrapInput';
import ErrorMessage from '../src/js/components/ErrorMessage';

describe('test AdvancedApp', () => {
  const testProps = {
    originalBaseNumbers: '0123456789',
    originalNumber: '100',
    convertedBaseNumbers: '0123456789abcdef',
    inputOriginalBaseNumbers: jest.fn(),
    inputOriginalNumber: jest.fn(),
    inputConvertedBaseNumbers: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AdvancedApp {...testProps} />);
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
    expect(testProps.inputOriginalBaseNumbers).toHaveBeenCalled();

    wrapper
      .find(BootstrapInput)
      .at(1)
      .simulate('change', { target: { value: '0' } });
    expect(testProps.inputOriginalNumber).toHaveBeenCalled();

    wrapper
      .find(BootstrapInput)
      .at(2)
      .simulate('change', { target: { value: '0' } });
    expect(testProps.inputConvertedBaseNumbers).toHaveBeenCalled();
  });

  // it('snapshotと比較', () => {
  //   const tree = renderer
  //     .create(<AdvancedApp {...testProps} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
