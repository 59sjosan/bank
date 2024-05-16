import React from 'react';

class BankingApp extends React.Component {
  state = {
    customer: { accountId: '', password: '' },
    balance: 0,
    transactionAmount: 0,
    showCustomerInfo: false,
    errorMessage: '',
    transactionHistory: [],
  };

  createCustomer = () => {
    const { accountId, password } = this.state.customer;

    if (accountId.trim() === '' || password.trim() === '') {
      this.setState({
        errorMessage: 'Please enter both Account ID and Password.',
      });
      return;
    }

    this.setState({
      showCustomerInfo: true,
      errorMessage: '',
    });
  };

  performTransaction = (amount) => {
    this.setState((prevState) => ({
      balance: prevState.balance + amount,
      transactionHistory: [...prevState.transactionHistory, { amount, type: amount > 0 ? 'Deposit' : 'Withdrawal', timestamp: new Date() }],
      errorMessage: '',
    }));
  };

  handleAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    this.setState({ transactionAmount: amount });
  };

  handleDepositOrWithdraw = (isDeposit) => {
    const amount = this.state.transactionAmount;

    if (!isNaN(amount) && amount !== 0 && (isDeposit || amount <= this.state.balance)) {
      this.performTransaction(isDeposit ? amount : -amount);
    } else {
      this.setState({
        errorMessage: isDeposit ? 'Invalid deposit amount!' : 'Invalid withdrawal amount or insufficient funds!',
      });
    }
  };

  render() {
    const { customer, balance, transactionAmount, showCustomerInfo, errorMessage, transactionHistory } = this.state;

    return (
      <div style={styles.pageContainer}>
        <h1>ROYAL BANK OF CANADA</h1>
        <label>
          Account ID:
          <input
            type="text"
            value={customer.accountId}
            onChange={(event) => this.setState({ customer: { ...customer, accountId: event.target.value } })}
            style={styles.input}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={customer.password}
            onChange={(event) => this.setState({ customer: { ...customer, password: event.target.value } })}
            style={styles.input}
          />
        </label>
        <button onClick={this.createCustomer} style={styles.button}>
          Create Account
        </button>

        {showCustomerInfo && (
          <div style={styles.customerInfo}>
            <h2>Welcome!</h2>
            <p>Balance: ${balance.toFixed(2)}</p>

            <label>
              Enter transaction amount:
              <input
                type="number"
                value={transactionAmount}
                onChange={this.handleAmountChange}
                style={styles.input}
              />
            </label>

            <button onClick={() => this.handleDepositOrWithdraw(true)} style={styles.button}>
              Deposit
            </button>
            <button onClick={() => this.handleDepositOrWithdraw(false)} style={styles.button}>
              Withdraw
            </button>

            <h3>Transaction History</h3>
            <ul>
              {transactionHistory.map((transaction, index) => (
                <li key={index} className={transaction.type === 'Deposit' ? 'deposit' : 'withdrawal'}>
                  {transaction.type}: ${Math.abs(transaction.amount)} ({transaction.timestamp.toLocaleString('en-US', { month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })})
                </li>
              ))}
            </ul>

            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  pageContainer: {
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  input: {
    margin: '5px 0',
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  customerInfo: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
  deposit: {
    color: 'green',
  },
  withdrawal: {
    color: 'red',
  },
};

export default BankingApp;
