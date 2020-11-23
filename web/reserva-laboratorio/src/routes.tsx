import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot";
import Home from "./pages/home"
import Admin from './pages/admin'
import NewUser from './pages/newUser'
import ChangePassword from './pages/changePassword'
import EditMyInfo from './pages/editMyInfo'
import Reservation from './pages/reservation'
import NewReserve from './pages/newReserve'
import reports from './pages/Reports/main'
import perUser from './pages/Reports/perUser'
import EditUser from "./pages/editUser";
import NewLocation from './pages/newLocation'
import EditLocation from './pages/editLocation'
import User from './pages/user'
import Locations from './pages/locations'
import LocationType from './pages/locationType/locationtype'
import UserLocation from './pages/userLocation'
import NewLocationType from './pages/newLocationType'
import EditTypeLocation from './pages/editTypeLocation'
import userLocations from './pages/userLocations'
import EditReserve from './pages/editReseve'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/forgot" component={ForgotPassword} />
                <Route exact={true} path="/home" component={Home} />
                <Route exact={true} path="/admin" component={Admin} />
                <Route exact={true} path="/user/add" component={NewUser} />
                <Route exact={true} path="/changePassword" component={ChangePassword} />
                <Route exact={true} path="/editMyInfo" component={EditMyInfo} />
                <Route exact={true} path="/reserves" component={Reservation} />
                <Route exact={true} path="/reserves/add" component={NewReserve} />
                <Route exact={true} path="/reserves/:id" component={EditReserve} />
                <Route exact={true} path="/reports" component={reports} />
                <Route exact={true} path="/reports/users" component={perUser} />
                <Route exact={true} path="/users/" component={User} />
                <Route exact={true} path="/users/:id" component={EditUser} />
                <Route exact={true} path="/locations/" component={Locations} />
                <Route exact={true} path="/location/add" component={NewLocation} />
                <Route exact={true} path="/location/:id" component={EditLocation} />
                <Route exact={true} path="/locationType/add" component={NewLocationType} />
                <Route exact={true} path="/locationType/:id" component={EditTypeLocation} />
                <Route exact={true} path="/locationTypes/" component={LocationType} />
                <Route exact={true} path="/user/:id/locations" component={userLocations} />
                <Route exact={true} path="/user/:id/location" component={UserLocation} />
                <Route exact={true} path="/user/:id/location/:locationId" component={UserLocation} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes