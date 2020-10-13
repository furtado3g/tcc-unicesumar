import React from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot";
import Home from "./pages/home"
import Admin from './pages/admin'
import NewUser from './pages/newUser'
import ChangePassword from './pages/changePassword'
function Routes (){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/forgot" component={ForgotPassword} />
                <Route exact={true} path="/home" component={Home} />
                <Route exact={true} path="/admin" component={Admin} />
                <Route exact={true} path="/user/add" component={NewUser} />
                <Route exact={true} path="/changePassword" component={ChangePassword} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes