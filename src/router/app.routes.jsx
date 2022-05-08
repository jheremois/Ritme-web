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
import News from "../pages/Feed/News";

export const AppRoutes = ()=>{

    return (
        <div>
            <Switch>
                <Route exact path={`/`}>
                    <News/>
                </Route>
                <Route
                    path="/*"
                >
                    <Redirect to={'/'}>

                    </Redirect>

                </Route>
            </Switch>
        </div>
    )
}