import React, { useContext, useState, useEffect } from 'react';
import Head from '../common/head';
import NavBar from '../common/navBar';
import '../App.css'

import { TransactionContext } from '../context/TransactionContext';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}

    />
);

const LoanCard = ({ title }) => {

    return (
        <h3>{title}</h3>
    );

}


function ApplyContract() {

    const { formData, setformData, handleChange, addApplyContract,getLoans , loans, postDate } = useContext(TransactionContext)

    useEffect(() => {

    })

    const handleSubmit = (e) => {
        const { companyname, fullname, cac, tin, contact, email, country, costestimate } = formData;

        if (!fullname || !companyname || !cac || !tin || !email || !contact || !country || !costestimate) return alert('Fill the remaining field');

        addApplyContract();

        e.preventDefault();
    }
    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'><h1>Loan Application</h1>
                    <div > 
                        {loans.reverse().map((loan, i) => (
                            <LoanCard key={i} {...loan} />
                        ))}
                    </div>
                    <div className='menu-conten create-customer'>
                        <h3>Apply Loan</h3>

                        <form>
                            <div id='form-info'>
                                <div className='form left-side'>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Full Name </labe>
                                        </p>
                                        <Input name='fullname' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Company Name </labe>
                                        </p>
                                        <Input name='companyname' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >CAC </labe>
                                        </p>
                                        <Input name='cac' handleChange={handleChange} />
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
                                            <labe >TIN </labe>
                                        </p>
                                        <Input name='tin' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Country</labe>
                                        </p>
                                        <Input name='country' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <p>
                                            <labe >Cost Estimate</labe>
                                        </p>
                                        <Input name='costestimate' handleChange={handleChange} />
                                    </div>

                                </div>
                            </div>
                            <div className='btn-group'>
                                <button className='btn' onClick={handleSubmit}>Apply</button>
                            </div>

                        </form>

                    </div>


                </div>

            </div>
        </>
    )
}

export default ApplyContract;