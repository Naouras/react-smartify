import types from './actionTypes';
export const searchData = serachData => {
  console.log('searchData: ', serachData);
  return {
    type: types.SEARCH_DATA,
    serachData: serachData
  };
};
