import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  userEmail: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        userEmail: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;