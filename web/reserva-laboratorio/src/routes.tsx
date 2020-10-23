import React from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot";
import Home from "./pages/home"
import Admin from './pages/admin'
import NewUser from './pages/newUser'
import ChangePassword from './pages/changePassword'
import EditMyInfo from './pages/editMyInfo'
import Reservation from './pages/reservation'
import NewReserve from './pages/newReserve'
import History from './pages/history'
import EditUser from "./pages/editUser";
import NewLocation from './pages/newLocation'
import EditLocation from './pages/editLocation'
import User from './pages/user'
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
                <Route exact={true} path="/editMyInfo" component={EditMyInfo} />
                <Route exact={true} path="/reserves" component={Reservation}/>
                <Route exact={true} path="/reserves/add" component={NewReserve}/>
                <Route exact={true} path="/history" component={History}/>
                <Route exact={true} path="/user/" component={User}/>
                <Route exact={true} path="/user/edit" component={EditUser}/>
                <Route exact={true} path="/location/add" component={NewLocation}/>
                <Route exact={true} path="/location/edit" component={EditLocation}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes