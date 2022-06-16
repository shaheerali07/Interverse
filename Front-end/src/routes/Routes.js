import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import openSocket from 'socket.io-client';

const Landing = React.lazy(() => import('../components/landing'));
const Welcome = React.lazy(() => import('../components/home/Welcome'));
const Register = React.lazy(() =>
  import('../components/authorization/Register')
);
const Login = React.lazy(() => import('../components/authorization/Login'));
const AccountConfirmation = React.lazy(() =>
  import('../components/authorization/AccountConfirmation')
);
const Appmain = React.lazy(() => import('../components/chat/appMain'));
const socket = openSocket(process.env.REACT_APP_BASE_URL, {
  transports: ['websocket']
});

export default () => (
  <Switch>
    <Suspense fallback={<div>Loading...</div>}>
      <Route path='/' exact component={Landing} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/user/activate/:id' exact component={AccountConfirmation} />
      <PrivateRoute
        path='/chat/:roomname/:username'
        component={Appmain}
        socket={socket}
      />
      <PrivateRoute path='/welcome' exact component={Welcome} socket={socket} />
    </Suspense>
  </Switch>
);
