import React, { useState, useEffect, } from "react";
import { ethers } from 'ethers'
import { BrowserProvider, Contract } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;


const createEthereumContract = () => {
    const provider = new BrowserProvider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const transactionsContract = new Contract(contractAddress, contractABI, signer);

    return transactionsContract;
}


export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ fullname: "", accountAddress: "", username: "", password: "", contact: "", email: "", department: "", amount: 0, position: "", title: "", details: "", start_amount: 0, closingDate: "", setDate: "", companyname: "", cac: "", tin: "", country: "", costestimate: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [currentBalance, setCurrentBalance] = useState(0);

    //   const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [users, setUsers] = useState([]);
    const [loans, setLoan] = useState([]);
    const [applyLoans, setApplyLoan] = useState([]);
    const [statements, setStatement] = useState([]);
    const [verifyUser, setVerifyUser] = useState([]);
    const [approveLists, setApproveLists] = useState([]);


    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllUsers = async () => {
        try {
            if (window.ethereum) {
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const availableUsers = await transactionsContract.getUsers();

                // user(accountAddress, name, username, password, email, contact, city)

                const structuredUsers = availableUsers.map((user) => ({
                    accountAddress: user.accountAddress,
                    name: user.name,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    contact: user.contact,
                    city: user.city,
                    timestamp: new Date(user.timestamp.toNumber() * 1000).toLocaleString()
                }));

                setUsers(structuredUsers);
                console.log(structuredUsers)
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getLoans = async () => {
        try {
            if (ethereum) {
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const availableLoan = await transactionsContract.getAllLoan();

                const structuredLoan = availableLoan.map((loan) => ({
                    name: loan.name,
                    interest: loan.interest.toNumber(),
                    amount: loan.amount.toNumber(),
                    timestamp: new Date(loan.timestamp.toNumber() * 1000).toLocaleString()
                }));

                setLoan(structuredLoan);
                console.log(structuredLoan);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getApplyLoans = async () => {
        try {
            if (ethereum) {
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const availableLoan = await transactionsContract.getApplyLoan();

                const structuredLoan = availableLoan.map((loan) => ({
                    name: loan.name,
                    interest: loan.interest.toNumber(),
                    loan_amount: loan.loan_amount.toNumber(),
                    amount: loan.amount.toNumber(),
                    account: loan.account,
                    timestamp: new Date(loan.timestamp.toNumber() * 1000).toLocaleString()
                }));

                setApplyLoan(structuredLoan);
                // console.log(structuredLoan);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getStatement = async (account) => {
        try {
            if (ethereum) {
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const availableLoan = await transactionsContract.getTransaction(account);
                
                const structuredLoan = availableLoan.map((loan) => ({
                    title: loan.title,
                    amount: loan.amount.toNumber(),
                    description: loan.description,
                    balance: loan.balance.toNumber(),
                    timestamp: new Date(loan.timestamp.toNumber() * 1000).toLocaleString()
                }));

                setStatement(structuredLoan);
                // console.log(structuredLoan);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getBalance = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                const userbalance = await transactionsContract.getAcctBalance();

                setApproveLists(userbalance);
                console.log('Balance: ',userbalance.toNumber())
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            console.log("Aisha", accounts);

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // getAllUsers();
                // getBalance()
                // getLoans()
                // getApplyLoans()

            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };


    const userSignup = async () => {
        try {
            if (window.ethereum) {
                
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const contract = new Contract(contractAddress, contractABI, signer);
    
                const pubkey = await signer.getAddress();
    
                // addUser(pubkey, name, username, email, password, contact, city)
                const { fullname, accountAddress, username, password, email, contact, city } = formData;
                // const transactionsContract = createEthereumContract();

                // const transactionHash = await transactionsContract.addUser(accountAddress, fullname, username, email, password, contact, city);
                const transactionHash = await contract.addUser(pubkey, fullname, username, email, password, contact, city);
                // console.log("Transaction hash:", tx.hash);
                

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const checkExistingUser = async () => {
        try {
            if (ethereum) {
                const { accountAddress } = formData;
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const transactionHash = await transactionsContract.checkUerExists(accountAddress);
                setVerifyUser(transactionHash)

                // window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const checkLogin = async () => {
        try {
            if (window.ethereum) {
                const { username, password } = formData;
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                // const transactionsContract = createEthereumContract();
                // loginAcct(name, password)

                const transactionHash = await transactionsContract.loginAcct(username, password);
                setVerifyUser(transactionHash)
                console.log(transactionHash);
                // window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const deposit = async () => {
        try {
            if (ethereum) {
                // depositMoney(amount)
                const { fullname, accountAddress, username, password, email, contact, city } = formData;
                const transactionsContract = createEthereumContract();

                const transactionHash = await transactionsContract.depositMoney(amount);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const depositAdmin = async () => {
        try {
            if (ethereum) {
                // depositMoney(account, amount)
                const { account_address, amount } = formData;
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    

                const transactionHash = await transactionsContract.depositTo(account_address, amount);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const withdrawAdmin = async () => {
        try {
            if (ethereum) {
                // withdrawTo(account, amount)
                const { account_address, amount } = formData;
               const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const transactionHash = await transactionsContract.withdrawTo(account_address, amount);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const transferAdmin = async () => {
        try {
            if (ethereum) {
                // transferTo(account, accountTo, amount)
                const { account_from, account_to, amount } = formData;
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const transactionHash = await transactionsContract.transferTo(account_from, account_to, amount);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const addLoan = async () => {
        try {
            if (ethereum) {
                // addLoan(name, interest, amount)
                const { loan_name, interest, amount } = formData;
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const transactionHash = await transactionsContract.addLoan(loan_name, interest, amount);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const addAplyLoan = async (name, interest, loan_amount) => {
        try {
            if (ethereum) {
                // addApplyLoan(name, interest, loan_amount, amount, account)
                const { user_amount} = formData;
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);
    
                const transactionHash = await transactionsContract.addApplyLoan(name, interest, loan_amount, user_amount, currentAccount);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }
    
    const addApproveLoan = async (name, interest, loan_amount, amount, account) => {
        try {
            if (ethereum) {
                // addApproveLoan(name, interest, loan_amount, amount, account)
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const transactionsContract = new Contract(contractAddress, contractABI, signer);

                const transactionHash = await transactionsContract.addApproveLoan(name, interest, loan_amount, amount, account);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    
    useEffect(() => {
        checkIfWalletIsConnect();
    }, [])


    return (
        <TransactionContext.Provider value={{
            connectWallet, formData, setformData, currentAccount, handleChange, userSignup, verifyUser,
            checkLogin, users, depositAdmin, withdrawAdmin, transferAdmin, addLoan, loans, getLoans,
            addAplyLoan, applyLoans, addApproveLoan, statements, getStatement
        }}>
            {children}
        </TransactionContext.Provider>
    )
}