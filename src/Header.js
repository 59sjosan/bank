import React from 'react';
import ScotiabankLogo from './ScotiabankLogo';

const Header = () => {
  return (
    <header>
      <div className="container">
        <ScotiabankLogo />
        <nav>
          <ul>
            <li><a href="#">Accounts</a></li>
            <li><a href="#">Withdraw</a></li>
            <li><a href="#">Deposit</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
