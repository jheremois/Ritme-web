import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Welcome from "../pages/welcome";
import { AuthRoutes } from "./auth.routes";
import News from "../pages/Feed/News";
import AuthContext from "../context/AuthProvider";
import { getCurrentUser } from "../services/User.services";
import { types } from "../context/AuthReducer";
import { AppRoutes } from "./app.routes";

export default function MainRouter() {

  const [authState, dispatch] = useContext(AuthContext)

  //const {userToken} = authState

  useEffect(()=>{
    //console.log("El famoso reducer: ", authState);
    getCurrentUser().then((res)=>{
      //setAuth({userToken: localStorage.getItem('ritme-user')})
    }).catch((err)=>{
      //setAuth({userToken: ""})
      console.log(err.response.data.errMessage)
    }).finally(()=>{
      //console.log(auth);
    })


  }, [])

  return (
    <Router>
      <h1
        className="text-white"
      >
        
      </h1>
      <div>
        <Switch>
          <Route
            path="/rt"
          >
            {
              !authState.logged
              ?
                <AuthRoutes />
              :
                <Redirect to={'/'}/>
            }
          </Route>

          <Route
            path="/"
          >
            {
              authState.logged
              ?
                <AppRoutes/>
              :
                <Redirect to={'/rt'}/>
            }
          </Route>

          <Route
            path="/*"
          >
            {
              !authState.logged
              ?
                <Redirect to={'/'}/>
              :
                <Redirect to={'/rt/login'}/>
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}