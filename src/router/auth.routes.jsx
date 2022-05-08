import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Welcome from "../pages/welcome";

export const AuthRoutes = ()=>{
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={`${match.path}/login`}>
                    <Login/>
                </Route>
                <Route exact path={`${match.path}/register`}>
                    <Register/>
                </Route>
                {/* <Route exact path={`${match.path}/`}>
                    <Welcome/>
                </Route> */}
                <Route
                    exact path="/*"
                >
                    <Redirect to={`${match.path}/login`} />
                </Route>
            </Switch>
        </div>
    )
}