import React from 'react';
import Appbar from '../components/appbar';
import Balance from '../components/balance';
import Users from '../components/users';

export default function Dashboard() {
  return <div>
    <Appbar />
    <div className="m-8">
      <Balance value={"10,000"} />
      <Users />
    </div>
  </div>
}