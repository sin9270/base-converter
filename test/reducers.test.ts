import { actionCreators } from '../src/js/actions/action';
import reducer from '../src/js/reducers/reducer';

describe('reducerが特定のactionに対して期待するstateを返しているかチェック', () => {
  it('INPUT_ORIGINAL_NUMBER', () => {
    const state = reducer(undefined, actionCreators.inputOriginalNumber('99'));
    expect(state.originalNumber).toStrictEqual('99');
  });

  it('INPUT_ORIGINAL_BASE', () => {
    const state = reducer(undefined, actionCreators.inputOriginalBase('99'));
    expect(state.originalBase).toStrictEqual('99');
  });

  it('INPUT_CONVERTED_BASE', () => {
    const state = reducer(undefined, actionCreators.inputConvertedBase('99'));
    expect(state.convertedBase).toStrictEqual('99');
  });

  it('ORIGINAL_BASE_NUMBERS', () => {
    const state = reducer(
      undefined,
      actionCreators.inputOriginalBaseNumbers('0123456789!')
    );
    expect(state.originalBaseNumbers).toStrictEqual('0123456789!');
  });

  it('CONVERTED_BASE_NUMBERS', () => {
    const state = reducer(
      undefined,
      actionCreators.inputConvertedBaseNumbers('0123456789!')
    );
    expect(state.convertedBaseNumbers).toStrictEqual('0123456789!');
  });
});
