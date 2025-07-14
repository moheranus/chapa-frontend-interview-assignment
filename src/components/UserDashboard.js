import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const UserDashboard = () => {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getWalletBalance().then(data => setBalance(data.balance));
    api.getTransactions().then(data => setTransactions(data));
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await api.initiateTransaction(amount);
    setMessage(response.message);
    setAmount('');
    setLoading(false);
    api.getTransactions().then(data => setTransactions(data));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">User Dashboard</h2>
      <div className="mb-4">Wallet Balance: ${balance || 'Loading...'}</div>
      <h3 className="text-xl mb-2">Recent Transactions</h3>
      <ul className="mb-4">
        {transactions.map(tx => (
          <li key={tx.id} className="border p-2 mb-2">
            Amount: ${tx.amount} | Date: {tx.date} | Status: {tx.status}
          </li>
        ))}
      </ul>
      <h3 className="text-xl mb-2">Initiate Transaction</h3>
      <form onSubmit={handleTransaction} className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {message && <div className="text-green-600">{message}</div>}
    </div>
  );
};

export default UserDashboard;