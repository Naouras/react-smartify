import types from './actionTypes';

export function searchData(serachData) {
  return {
    type: types.SEARCH_DATA,
    serachData: serachData
  };
}
