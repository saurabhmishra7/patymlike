import React, { useState } from 'react';
import Heading from '../components/heading';
import SubHeading from '../components/subheading';
import InputBox from '../components/inputBox';
import Button from '../components/button';
import BottomWarming from '../components/bottomWarming';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        username,
        password
      });

      localStorage.setItem("token", response.data.userDetails.token);
      navigate(`/dashboard?id=${response.data.userDetails.userId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
           setUsername(e.target.value);
          }}  placeholder="saurabh@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
           setPassword(e.target.value);
          }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={login}/>
        </div>
        <BottomWarming label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
  );
}

export default Signin;
