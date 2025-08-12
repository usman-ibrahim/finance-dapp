"use client";

import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";


export default function AddUserForm() {

//   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Deployed address
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    contact: "",
    city: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!window.ethereum) throw new Error("MetaMask not found");

      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const pubkey = await signer.getAddress();

      console.log(pubkey)
      console.log(formData.city, formData.contact, formData.email, formData.name, formData.username, formData.password)
      setStatus("Submitting transaction...");
      const tx = await contract.addUser(
        pubkey,
        formData.name,
        formData.username,
        formData.email,
        formData.password,
        formData.contact,
        formData.city
      );

      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      setStatus("User added successfully!");
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

