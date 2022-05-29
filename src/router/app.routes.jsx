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
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import News from "../pages/Feed/News";
import Trending from "../pages/Feed/Trending";
import OpenPost from "../pages/OpenPost";
import Me from "../pages/Profile/Me";

export const AppRoutes = ()=>{

    return (
        <div>
            <Header/>
            <Dashboard>
                <Switch>
                    <Route exact path={`/`}>
                        <News/>
                    </Route>
                    <Route exact path={`/trending`}>
                        <Trending/>
                    </Route>
                    <Route exact path={`/me`}>
                        <Me/>
                    </Route>
                    <Route path={`/post/:id`}>
                        <OpenPost/>
                    </Route>
                    <Route
                        path="/*"
                    >
                        <Redirect to={'/'}/>
                    </Route>
                </Switch>
            </Dashboard>
        </div>
    )
}