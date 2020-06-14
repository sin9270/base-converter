import { actionTypes } from '../src/js/actions/action';

describe('test actions', () => {
  it('actionTypesが重複していないかチェック', () => {
    const listedActionTypes = Object.values(actionTypes);
    const combinedActionTypes = Array.from(new Set(listedActionTypes));
    expect(combinedActionTypes).toStrictEqual(listedActionTypes);
  });
});
