import React, { useState } from 'react';
import Heading from '../components/heading';
import SubHeading from '../components/subheading';
import InputBox from '../components/inputBox';
import Button from '../components/button';
import BottomWarming from '../components/bottomWarming';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label={"Sign up"} />
      <SubHeading label={"Enter your infromation to create an account"} />
      <InputBox onChange={e => {
        setFirstName(e.target.value);
      }} placeholder="Saurabh" label={"First Name"} />
      <InputBox onChange={(e) => {
        setLastName(e.target.value);
      }} placeholder="Mishra" label={"Last Name"} />
      <InputBox onChange={e => {
        setUsername(e.target.value);
      }} placeholder="saurabh@gmail.com" label={"Email"} />
      <InputBox onChange={(e) => {
        setPassword(e.target.value)
      }} placeholder="123456" label={"Password"} />
      <div className="pt-4">
        <Button onClick={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username,
            firstName,
            lastName,
            password
          });
          localStorage.setItem("token", response.data.token)
          navigate("/dashboard")
        }} label={"Sign up"} />
      </div>
      <BottomWarming label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
    </div>
  </div>
</div>
}

export default Signup;
