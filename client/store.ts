import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './slices/rootReducer';

const store = configureStore({
  reducer:rootReducer
            
  // Add other store configurations as needed
});



export default store;