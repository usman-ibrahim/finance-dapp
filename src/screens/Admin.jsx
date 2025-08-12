import React from 'react';
import Head from '../common/head';
import Header from '../common/header';
import NavBar from '../common/navBar';
import '../App.css'
import Cust from '../icons/bg.jpg'


function Admin(){
    return(
        <>
            <Head />
            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <h1>Admin Dashboard</h1>
                   
                </div>
                
            </div>
        </>
    )
}

export default Admin;