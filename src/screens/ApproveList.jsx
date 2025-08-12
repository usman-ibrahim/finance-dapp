import React, { useContext } from 'react';
import Head from '../common/head';
import Header from '../common/header';
import NavBar from '../common/navBar';
import '../App.css'

import { TransactionContext } from '../context/TransactionContext';
import LoginNavBar from '../common/loginNavBar';


const PostCard = ({ contractName, company_name, timestamp }) => {

    return (

        <div className='statement'>
        <h3>{contractName}</h3>
            <div style={{ padding: '20px' }}>
                <p> Name: {company_name} </p>
                <p>Approved ON: {timestamp} </p>
            </div>
        </div>

    );

}

function ApproveList() {

    const { formData, setformData, handleChange, approveLists } = useContext(TransactionContext)

    return (
        <>
            <Head />

            <div className='main-content'>
                <LoginNavBar />
                <div className='content'>
                    <h1>Approve Contract</h1>   
                        {approveLists.reverse().map((post, i) => (
                            <PostCard key={i} {...post} />
                        ))}
                </div>

            </div>
        </>
    )
}

export default ApproveList;