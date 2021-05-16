import './App.css';
import SignIn from './screens/SignIn';
import { useContext} from 'react';
import { AuthContext } from './contexts/AuthContext';
import UserManagement from './screens/UserManagement'
import CreateUser from './screens/CreateUser'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {

  const { authInfo, setAuthInfo } = useContext(AuthContext);

  return (
        <Switch>
          {/* <Route exact path="/movie/create">
           { !authInfo.isLogin ? <Redirect to='/login'/> : <CreateMovie />}
          </Route>
          <Route exact path="/movie/schedule">
            { !authInfo.isLogin ? <Redirect to='/login'/> : <MovieScheduler />}
          </Route>
          <Route exact path="/movie/rooms">
            { !authInfo.isLogin ? <Redirect to='/login'/> : <ListRoom />}
          </Route> */}
          <Route exact path="/login">
            <SignIn />
          </Route>
          <Route exact path="/">
            { !authInfo.isLogin ? <Redirect to='/login'/> :  <UserManagement />}
          </Route>
          
          <Route exact path="/users">
            { !authInfo.isLogin ? <Redirect to='/login'/> :  <UserManagement />}
          </Route>

          <Route exact path="/users/create">
            { !authInfo.isLogin ? <Redirect to='/login'/> :  <CreateUser />}
          </Route>

          {/* <Route exact path="/movie/edit">
            { !authInfo.isLogin ? <Redirect to='/login'/> :  <UpdateMovie />}
          </Route>
          <Route exact path="/">
            { !authInfo.isLogin ? <Redirect to='/login'/> :  <ListMovie />}
          </Route>
          <Route exact path="/movie">
            { !authInfo.isLogin ? <Redirect to='/login'/> :   <ListMovie />}
          </Route>
          <Route exact path="/genres">
            { !authInfo.isLogin ? <Redirect to='/login'/> :   <Genre />}
          </Route> */}
        </Switch>
  );
}

export default App;
