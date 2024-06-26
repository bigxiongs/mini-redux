import { createStore, compose, applyMiddleware } from './src/mini-redux/index';
import { loggerEnhancer, anotherLoggerEnhancer } from './src/example/enhancer';
import { loggerMiddleware } from './src/example/middleware';

const container = document.querySelector('#container');
const increaseBtn = document.querySelector('#increaseBtn');
const decreaseBtn = document.querySelector('#decreaseBtn');

// REDUCER
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'counter/increment':
      return state + 1;
    case 'counter/decrement':
      return state - 1;
    default:
      return state;
  }
};

// STORE
const enhancer = compose(loggerEnhancer, anotherLoggerEnhancer);
const store = createStore(
  reducer,
  undefined,
  compose(enhancer, applyMiddleware(loggerMiddleware))
);

// RENDER
const render = () => {
  container.innerHTML = store.getState();
};

// SUBSCRIBE
const unsubscribe = store.subscribe(render);

// EVENT
increaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/increment' });
});

decreaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/decrement' });
});
