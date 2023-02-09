import React from "react";
import {  Routes,Route } from "react-router-dom";

import User from "../Pages/User";
import UserDetails from "../Pages/UserDetails";

const Allroutes=()=>{
    return (
        <div>
        <Routes>
            <Route path="/" element={<User/>}/>
            <Route path="/userdetail" element={<UserDetails/>}/>
        </Routes>
        </div>
    )
}

export default Allroutes