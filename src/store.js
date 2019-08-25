import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';

import exampleStyleData from './exampleStyleData';
import exampleProductData from './exampleProductData';

const initialData = {
  productData: exampleProductData,
  style: exampleStyleData,
  productId: 500,
};

export default function configureStore(initialState = initialData) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  );
}
