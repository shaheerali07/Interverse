import React, { useReducer } from 'react';
import Routes from './routes/Routes';
import { UserProvider } from './userContext/UserContext';
import { initialState, userReducer } from './userContext/userReducer';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserProvider value={[state, dispatch]}>
      <Routes />
    </UserProvider>
  );
}
