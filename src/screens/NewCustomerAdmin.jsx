import React, { useContext, useState } from 'react';
import Head from '../common/head';
import NavBar from '../common/navBar';
import '../App.css'
import { Link, useNavigate } from 'react-router-dom';

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


function NewCustomerAdmin() {

    const { formData, setformData, handleChange, userSignup } = useContext(TransactionContext)

    const handleSubmit = (e) => {
        const { fullname, accountAddress, username, password, email, contact, city } = formData;

        if (!fullname || !city || !accountAddress || !username || !email || !contact || !password) return alert('Fill the remaining field');
        
        userSignup();

        e.preventDefault();
    }
    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <h1>New Customer</h1>
                    <div className='menu-conten create-customer'>
                        <h3>Create New User</h3>

                        <form>
                            <div id='form-info'>
                                <div className='form left-side'>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Fullname </labe>
                                        </p>
                                        <Input name='fullname' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Username </labe>
                                        </p>
                                        <Input name='username' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Password </labe>
                                        </p>
                                        <Input name='password' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Email </labe>
                                        </p>
                                        <Input name='email' handleChange={handleChange} />
                                    </div>

                                </div>

                                <div className='form left-right'>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Contact</labe>
                                        </p>
                                        <Input name='contact' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Account Address </labe>
                                        </p>
                                        <Input name='accountAddress' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >City</labe>
                                        </p>
                                        <Input name='city' handleChange={handleChange} />
                                    </div>
                                
                                </div>
                            </div>
                            <div className='btn-group'>
                                <button className='btn' onClick={handleSubmit}>Sign Up</button>
                                
                            </div>
                        </form>

                    </div>


                </div>

            </div>
        </>
    )
}

export default NewCustomerAdmin;