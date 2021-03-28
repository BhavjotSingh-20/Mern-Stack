import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import Signin from './user/Signin'
import Signup from './user/Signup'
import AdminRoute from "./auth/helper/AdminRoutes"
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'




export default function Routes() {
    return (
        <BrowserRouter>
           <Switch>    
               <Route path="/" exact component={Home} />
               <Route path="/signup" exact component={Signup}/>
               <Route path="/signin" exact component={Signin}/>
               <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
           </Switch>
        </BrowserRouter>
    )
}