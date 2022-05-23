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
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import News from "../pages/Feed/News";
import Trending from "../pages/Feed/Trending";
import Me from "../pages/Profile/Me";

export const AppRoutes = ()=>{

    return (
        <div>
            <Header/>
            <div id="appDash">
                <SideNav/>
                <div className="appContent">
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
                        <Route
                            path="/*"
                        >
                            <Redirect to={'/'}>

                            </Redirect>

                        </Route>
                    </Switch>
                </div>
                <div className="leftspacer"/>
            </div>
        </div>
    )
}