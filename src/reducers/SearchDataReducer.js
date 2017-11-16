import types from '../actions/actionTypes';

function SearchDataReducer(state = [], action = {}) {
  switch (action.type) {
    case types.SEARCH_DATA: {
      return [...state, action.serachData];
    }
    default:
      return state;
  }
}

export default SearchDataReducer;
