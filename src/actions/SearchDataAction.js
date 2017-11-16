import types from './actionTypes';

export function searchDataFunction(serachData) {
  return {
    type: types.SEARCH_DATA,
    serachData: serachData
  };
}
