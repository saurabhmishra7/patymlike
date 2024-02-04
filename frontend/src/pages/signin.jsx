import React from 'react';
import Heading from '../components/heading';
import SubHeading from '../components/subheading';
import InputBox from '../components/inputBox';
import Button from '../components/button';
import BottomWarming from '../components/bottomWarming';
import axios from "axios"

const Signin = () => {
  const [ userName, setUserName ] = useState("");
  const [ password, setPassword ] = useState("")
  async function onClick() {
      const userDetail = await axio
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
           setUserName(e.target.value);
          }}  placeholder="saurabh@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
           setPassword(e.target.value);
          }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={login()}/>
        </div>
        <BottomWarming label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
  );
}

export default Signin;
