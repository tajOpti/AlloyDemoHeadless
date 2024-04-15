// index.ts

import { createStore, Store } from 'redux';
import rootReducer from './reducers/reducers';

const store: Store<typeof rootReducer> = createStore(rootReducer);
export default store;
