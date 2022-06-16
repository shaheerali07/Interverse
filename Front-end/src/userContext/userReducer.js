export const initialState = {
  user: '',
  invitedUser: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('userData', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        state: initialState
      };
    case 'SET_INVITED_USER':
      return {
        ...state,
        invitedUser: action.payload
      };
    default:
      return null;
  }
};
