import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import '../styles/userdashboard.css';

const UserDashboard = ({ currentView }) => {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
    api.getTransactions().then(data => {
      setTransactions(data);
      setCurrentPage(1); // Reset to first page after new transaction
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (currentView && currentView !== 'Wallet' && currentView !== 'Transactions') return null;

  return (
    <div className="userdashboard-container">
      <h2 className="dashboard-header">User Dashboard</h2>
      {(!currentView || currentView === 'Wallet') && (
        <div className="wallet-card">
          <h3 className="card-title">Wallet Balance</h3>
          <p className="balance-amount">${balance || 'Loading...'}</p>
        </div>
      )}
      {(!currentView || currentView === 'Transactions') && (
        <>
          <h3 className="section-header">Recent Transactions</h3>
          <div className="transactions-list">
            {currentTransactions.length > 0 ? (
              currentTransactions.map(tx => (
                <div key={tx.id} className="transaction-card">
                  <div className='transaction-history'>
                    <p><strong>Amount: </strong></p>
                    <p>${tx.amount}</p>
                  </div>
                  <div className='transaction-history'>
                    <p> <strong>Date: </strong></p>
                    <p>{tx.date}</p>
                  </div>
                  <div className='transaction-history'>
                       <p><strong>Status: </strong></p>
                       <p>{tx.status}</p>
                  </div>
                  {/* <p><strong>Amount: </strong>${tx.amount}</p>
                  <p> <strong>Date: </strong>{tx.date}</p>
                  <p><strong>Status: </strong>{tx.status}</p> */}
                </div>
              ))
            ) : (
              <p className="no-transactions">No transactions available</p>
            )}
          </div>
          {transactions.length > itemsPerPage && (
            <div className="pagination">
              <button
                onClick={handlePrevious}
                className="pagination-button"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNext}
                className="pagination-button"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
          <h3 className="section-header">Initiate Transaction</h3>
          <form onSubmit={handleTransaction} className="transaction-form">
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="submit-buttons"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </form>
          {message && <div className="success-message">{message}</div>}
        </>
      )}
    </div>
  );
};

export default UserDashboard;