import React, { useEffect, useState } from 'react';
import Appbar from '../components/appbar';
import Balance from '../components/balance';
import Users from '../components/users';
import axios from 'axios';

export default function Dashboard() {
  const [ balance, setBalance ] = useState("0");
  const [ users, setUserName ] = useState([]);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  
  useEffect( () => {
    axios.request({
      url: 'http://localhost:3000/api/v1/account/balance',
      headers: headers
    }).then((res) => {
      setBalance(parseFloat(res.data?.balance).toFixed(2));
    });
    }, []);


    async function onChange() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.request({
        url: 'http://localhost:3000/api/v1/user/bulk',
          headers: headers
      });
      setUserName(res.data.users);
    }

  return (
  <div>
    <Appbar />
    <div className="m-8">
      <Balance value={balance} />
      <Users users={users} onChange={onChange}/>
    </div>
  </div>
  )
}