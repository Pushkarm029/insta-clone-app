import React from 'react';

export default function AccountInMessages({ account }) {
  return (
    <div className="accountInMessages">
      <img src={account.url} />
      <div className="messageAccountDescription">
        <p className="accountNameInMessages">{account.name}</p>
        <p className="lastActivityInMessages">Sent you a message</p>
      </div>
    </div>
  );
}
