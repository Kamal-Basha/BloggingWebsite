import React from 'react';
import { useState } from 'react';

import "./Login.css"
import { data } from 'react-router-dom';

function Login() {
   const [loginForm, setLoginForm] = useState({
    emailAddress: '',
    password: '',
   })
   function handleInput(e){
    let value = e.target.value;
    let fieldName = e.target.name;
    setLoginForm(prev => ({
      ...prev,
      [fieldName]: value
    }))
   }

   function Login(){
     fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(loginForm)
     })
     .then(data=>{
      return data.json()
     })
     .then(data => {
       console.log('Password Matched:', data);
       if(data.isMatched){
        sessionStorage.setItem("UserID", data.UserID)
        // window.location.href="/"
       }
       else{
        alert("wrong password")
       }
     })
   }

    return(
        <div className='login-page'> 
          <form className='login-form d-flex flex-column row-gap-2 justify-content-center'>
             <h1>Please Login</h1>
            <div className="form-floating mb-3">
            <input type="email" className="form-control" name='emailAddress' id="floatingInput" placeholder="name@example.com" onChange={handleInput} value={loginForm.emailAddress} />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
           <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={handleInput} value={loginForm.password}/> 
          <label for="floatingPassword">Password</label>
           
         </div>
             <button className='btn btn-success w-100' onClick={Login} type='button'>Login </button>
          </form>        
        </div>
    )
}

export default Login;