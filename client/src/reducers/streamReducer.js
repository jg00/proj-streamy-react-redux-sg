import _ from "lodash";

import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

/*
  1 Redux requirement to always return a new object
  case FETCH_STREAM:
    return { ...state, [action.payload.id]: action.payload };
  
  - spread state {...state} into a new object to satisfy Redux requirement
    to always return a new object.

  2 _.omit()
   case DELETE_STREAM:
      return _.omit(state, action.payload);

  - Remember omit() is not going to change the original state object.
  - Instead omit() creates a new object with all the properties from state without
    the properties we pass in the second argument here action.payload.

  3 _.mapKeys()
  case FETCH_STREAMS:
      return {...state, ..._.mapKeys(action.payload, 'id')}
  
    [ 
      {id:1, title:'one'}
      , {id:22, title:'two'}
      , {id:10, title:'three'} 
    ]

    turns into

    {
      { 1, {id: 1, title: 'one'} }
      , { 22, {id: 22, title: 'two'} }
      , { 10, {id: 10, title: 'three'} }
    }

*/
