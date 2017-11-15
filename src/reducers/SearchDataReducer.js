import types from '../actions/actionTypes';

export default function(state = [], action = {}) {
  switch (action.type) {
    case types.SEARCH_DATA: {
      return [...state, action.serachData];
    }
    default:
      return state;
  }
}
