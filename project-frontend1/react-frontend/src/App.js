import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
let logoutTimer;
const App = () => {
    const { token, login, logout, userId } = useAuth();
    let routes;
    if (token) {
        routes = ( <
            Routes >
            <
            Route path = "/"
            element = { < Users / > }
            /> <
            Route path = "/:userId/places"
            element = { < UserPlaces / > }
            /> <
            Route path = "/places/new"
            element = { < NewPlace / > }
            /> <
            Route path = "/places/:placeId"
            element = { < UpdatePlace / > }
            /> <
            /Routes>
        );
    } else {
        routes = ( <
            Routes >
            <
            Route path = "/"
            element = { < Users / > }
            /> <
            Route path = "/:userId/places"
            element = { < UserPlaces / > }
            /> <
            Route path = "/auth"
            element = { < Auth / > }
            /> <
            /Routes>
        );
    }
    return ( <
        AuthContext.Provider value = {
            {
                isLoggedIn: !!token,
                userId: userId,
                login: login,
                logout: logout,
                token: token,
            }
        } >
        <
        BrowserRouter >
        <
        MainNavigation / >
        <
        main > { routes } {
            /* <Routes>
                          <Route path="/" element={<Users />} />
                          <Route path="/:userId/places" element={<UserPlaces />} />
                          <Route path="/places/new" element={<NewPlace />} />
                          <Route path="/places/:placeId" element={<UpdatePlace />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes> */
        } <
        /main>{" "} <
        /BrowserRouter> <
        /AuthContext.Provider>
    );
};

export default App;