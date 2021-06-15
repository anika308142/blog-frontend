import React from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';
import AppBarCustom from './AppBarCustom'
export default function Logout() {
    const cookies = new Cookies();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("pid");
    cookies.set('Authorization', null, { path: '/' });
    return (
        <div> <AppBarCustom />
            <Redirect to='/Login' /></div>
    )
}

