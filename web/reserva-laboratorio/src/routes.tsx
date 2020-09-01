import React from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot";

function Routes (){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/forgot" component={ForgotPassword} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes