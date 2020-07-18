import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import App from '../src/js/components/App';
import BootstrapInput from '../src/js/components/BootstrapInput';
import ErrorMessage from '../src/js/components/ErrorMessage';

describe('test App', () => {
  const testProps = {
    originalBase: '10',
    originalNumber: '100',
    convertedBase: '16',
    inputOriginalBase: jest.fn(),
    inputOriginalNumber: jest.fn(),
    inputConvertedBase: jest.fn(),
  };

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App {...testProps} />);
  });

  it('子コンポーネントが存在するかチェック', () => {
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
    expect(testProps.inputConvertedBase).toHaveBeenCalled();

    wrapper
      .find(BootstrapInput)
      .at(2)
      .simulate('change', { target: { value: '0' } });
    expect(testProps.inputOriginalNumber).toHaveBeenCalled();
  });
});
