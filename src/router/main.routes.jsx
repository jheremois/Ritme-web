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
import LoadContext from "../context/LoadContext/LoadContext";
import { typesLoad } from "../context/LoadContext/LoadReducer";

export default function MainRouter() {

  const [authState, dispatch] = useContext(AuthContext)
  const [loadState, LoadDispatch] = useContext(LoadContext)

  const LoadAction = {
    type: typesLoad.loading
  }

  const StopLoadAction = {
    type: typesLoad.notLoading
  }

  useEffect(()=>{

    LoadDispatch(LoadAction)
    getCurrentUser(JSON.parse(localStorage.getItem('ritme-user')).userToken).then((res)=>{
      console.log("actual user: ", res);
      dispatch({
        type: types.authLoged,
        token: JSON.parse(localStorage.getItem('ritme-user')).userToken,
        isAuthed: true
      })
    }).catch((err)=>{      
      console.log("fallo: ", err.response.data)
      dispatch({
        type: types.authLogout,
        token: '',
        isAuthed: false
      })
    }).finally(()=>{
      LoadDispatch(StopLoadAction)
    })
    
  }, [])

  return (
    <>
    {
      loadState.isLoading
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
              !authState.isAuthed
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
              authState.isAuthed
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
              !authState.isAuthed
              ?
                <Redirect to={'/'}/>
              :
                <Redirect to={'/rt/login'}/>
            }
          </Route>
        </Switch>
      </Router>}
    </>  
  );
}