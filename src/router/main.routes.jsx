import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import AuthContext from "../context/AuthCotext/AuthProvider";
import { getCurrentUser } from "../services/User.services";
import { AppRoutes } from "./app.routes";
import Loader from "../components/Loader";
import { types } from "../context/AuthCotext/AuthReducer"

export default function MainRouter() {

  const [authState, dispatch] = useContext(AuthContext)
  
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getCurrentUser(JSON.parse(localStorage.getItem('ritme-user')).userToken).then((res)=>{
        console.log("actual user: ", res);
        setAuthed(true)
      }).catch((err)=>{
        console.log("no hay user: ", JSON.parse(localStorage.getItem('ritme-user')).userToken);
        setAuthed(false)
        console.log("fallo: ", err.response.data)
      }).finally(()=>{
        setLoading(false)
      })
  }, [])

  return (
    loading
    ?
      <>
        <Loader/>
      </>
    :
    <Router>
      <Switch>
        <Route
          path="/rt"
        >
          {
            !authed
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
            authed
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
            !authed
            ?
              <Redirect to={'/'}/>
            :
              <Redirect to={'/rt/login'}/>
          }
        </Route>
      </Switch>
    </Router>
  );
}