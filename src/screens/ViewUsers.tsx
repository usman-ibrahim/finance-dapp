import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../utils/Banking.json"; // Import your ABI

export default function LoanData() {
  const [allLoans, setAllLoans] = useState([]);
  const [appliedLoans, setAppliedLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState("");

  const contractAddress = "0xYourContractAddressHere"; // Replace with deployed address

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask");
    }
  };

  const getContract = () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(contractAddress, contractABI, provider);
  };

  const fetchAllLoans = async () => {
    try {
      const contract = getContract();
      const loans = await contract.getAllLoan();
      console.log("All Loans:", loans);
      setAllLoans(loans);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAppliedLoans = async () => {
    try {
      const contract = getContract();
      const loans = await contract.getApplyLoan();
      console.log("Applied Loans:", loans);
      setAppliedLoans(loans);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const contract = getContract();
      const txns = await contract.getTransaction(account);
      console.log("Transactions:", txns);
      setTransactions(txns);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Loan & Transaction Data</h1>

      <button onClick={connectWallet}>Connect Wallet</button>

      <div style={{ marginTop: 10 }}>
        <button onClick={fetchAllLoans}>Get All Loans</button>
        <button onClick={fetchAppliedLoans}>Get Applied Loans</button>
        <button onClick={fetchTransactions}>Get My Transactions</button>
      </div>

      <h2>All Loans:</h2>
      <pre>{JSON.stringify(allLoans, null, 2)}</pre>

      <h2>Applied Loans:</h2>
      <pre>{JSON.stringify(appliedLoans, null, 2)}</pre>

      <h2>Transactions:</h2>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
}
