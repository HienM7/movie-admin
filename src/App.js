import "./App.css";
import SignIn from "./screens/SignIn";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import UserManagement from "./screens/UserManagement";
import CreateUser from "./screens/CreateUser";
import Statistical from "./screens/Statistical";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import MiniDrawer from "./components/Drawer";

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
      <MiniDrawer isLogin={authInfo.isLogin}>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/">
          {!authInfo.isLogin ? <Redirect to="/login" /> : <UserManagement />}
        </Route>

        <Route exact path="/users">
          {!authInfo.isLogin ? <Redirect to="/login" /> : <UserManagement />}
        </Route>

        <Route exact path="/users/create">
          {!authInfo.isLogin ? <Redirect to="/login" /> : <CreateUser />}
        </Route>

        <Route exact path="/statistical">
          {!authInfo.isLogin ? <Redirect to="/login" /> : <Statistical />}
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
      </MiniDrawer>
    </Switch>
  );
}

export default App;
