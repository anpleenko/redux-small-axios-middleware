import assert from 'assert';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
// import configureStore from 'redux-mock-store';
import reduxSmallAxiosMiddleware from '../src/index';
import thunk from 'redux-thunk';

import {createLogger} from 'redux-logger';
const logger = createLogger({
  level: 'info',
  collapsed: true,
});

function testReducer(state = {}, action) {
  switch (action.type) {
    case 'SUCCESS_ACTION': return Object.assign({}, state, action);
    case 'SUCCESS_ACTION_REQUEST': return Object.assign({}, state, action);
    case 'SUCCESS_ACTION_SUCCESS': return Object.assign({}, state, action);
    case 'SUCCESS_ACTION_FAILURE': return Object.assign({}, state, action);

    case 'ERROR_ACTION': return Object.assign({}, state, action);
    case 'ERROR_ACTION_REQUEST': return Object.assign({}, state, action);
    case 'ERROR_ACTION_SUCCESS': return Object.assign({}, state, action);
    case 'ERROR_ACTION_FAILURE': return Object.assign({}, state, action);
    default: return state;
  }
}

const rootReducer = combineReducers({testReducer});
const enhancer = compose(applyMiddleware(thunk, reduxSmallAxiosMiddleware(axios)));
const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
};

const initialState = {};
const store = configureStore(initialState);

const successAction = {
  type: 'SUCCESS_ACTION',
  options: {
    url: 'http://private-4074d-zular.apiary-mock.com/request?page=1',
  },
};
const errorAction = {
  type: 'ERROR_ACTION',
  options: {
    url: 'http://private-4074d-zular.apiary-mock.com/requesting?page=1',
  },
};

store.subscribe(function () {
  console.log(store.getState());
});

store.dispatch(successAction);
// store.dispatch(errorAction);


describe('middleware', function() {
  it('equal store dispatch', function(done) {
    // assert.deepEqual(store.dispatch(expectAction), expectAction)
    this.timeout(40000);

    setTimeout(()=>{
      // console.log(store.getState());
      done();
    }, 3000);



  });
});
