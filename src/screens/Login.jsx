import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../common/head';
import NavBar from '../common/navBar';
import '../App.css'

import { TransactionContext } from '../context/TransactionContext';
import LoginNavBar from '../common/loginNavBar';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}

    />
);


function Login() {

    const { formData, setformData, handleChange, checkLogin, verifyUser } = useContext(TransactionContext)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const { username, password } = formData;

        if (!username || !password) return alert('Fill the remaining field');

        checkLogin();

        if (verifyUser == true) {
            navigate('/admin')
        }

        e.preventDefault();

    }


    return (
        <>
            <Head />
            <div className='login-container'>
                <LoginNavBar />
                <div className='content '>
                    <h1>Login</h1>

                    <div className='login-content'>
                        <div className='sign'>
                            <div>
                                <label>User Name</label> <br />
                                <Input name='username' handleChange={handleChange} /><br />
                                <label>Password</label> <br />
                                <Input name='password' handleChange={handleChange} />
                            </div>
                            <div id="btn-group">
                                <button className='btn' onClick={handleSubmit}>Login</button>
                                <Link to={'/newuser'}>
                                    <a href="#" style={{color: 'black'}}>New Account</a>
                                </Link>
                            </div>
                           
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Login;