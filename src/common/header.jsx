import React from 'react';
import {Link} from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Head from './head';
import NavBar from './navBar';



function Header(){
    return(
       <>
        <Head />
        <NavBar />
       </>
    )
}

export default Header;