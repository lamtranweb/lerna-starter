import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import { install } from 'redux-loop';
import { logger } from 'redux-logger';


const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}




export default 'store';

