import React, { useContext } from 'react';
import Head from '../common/head';
import Header from '../common/header';
import NavBar from '../common/navBar';
import '../App.css'
import { useNavigate } from 'react-router-dom';

import { TransactionContext } from '../context/TransactionContext';
import { useEffect } from 'react';


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}

    />
);

const PostCard = ({ company_name, fullname, cac, tin, phone, email, country, costestimate, timestamp, }) => {
    const navigate = useNavigate();

    const { approveContract} = useContext(TransactionContext)

    const handleSubmit = (e) => {
        if(!company_name || !email) return alert('Can not approve null value')

        approveContract(email, company_name)

        e.preventDefault();
    }

    return (

        <div className='statement' style={{ fontSize: '1.2rem' }}>
            <h3>{company_name}</h3>
            <div>
                <p>Name: {fullname} </p>
                <p>Cost Estimate: {costestimate} </p>
                <p>Phone: {phone} </p>
                <p>Country: {country} </p>
                <div className='btn-group'>
                    <button className='btn' onClick={handleSubmit} >Approve</button>
                </div>
            </div>

        </div>

    );

}

function ViewApplication() {

    const { getPostContract, applyPost, postDate } = useContext(TransactionContext)

    useEffect(() => {

        getPostContract(postDate);
    })


    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Applicants</h1>
                    </div>
                    <div className='menu-conten loanlist'>
                        {applyPost.reverse().map((post, i) => (
                            <PostCard key={i} {...post} />
                        ))}
                    </div>


                </div>

            </div>
        </>
    )
}

export default ViewApplication;