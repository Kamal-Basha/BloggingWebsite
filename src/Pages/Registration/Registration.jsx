import React from 'react';
import { useState } from 'react';


import "./Registration.css"

function Registration() {
    const [registrationDetails, setRegistrationDetails ] = useState({
      name: '',
      phoneNumber: '',
      emailAddress: '',
      password: ''
    });

    function handleInput(e){
      let value=e.target.value;
      let fieldName= e.target.name;
      setRegistrationDetails(prev => ({
        ...prev,
        [fieldName]: value

      }))

    }

    function register() {
      fetch('https://kamal-basha-bloggingwebsite.netlify.app//user/registration',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
         body:JSON.stringify(registrationDetails) 
      })
    }

    return(
        <div className='login-page'> 
          <form className='login-form d-flex flex-column row-gap-2 justify-content-center'>
             <h1>Please register</h1>
             <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name='name' onChange={handleInput} value={registrationDetails.name} />
          <label for="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-3">
            <input type="tel" className="form-control" id="floatingInput" placeholder="name@example.com" name='phoneNumber' onChange={handleInput} value={registrationDetails.phoneNumber}/>
          <label for="floatingInput">Phone Number</label>
        </div>

            <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='emailAddress' onChange={handleInput} value={registrationDetails.emailAddress} />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
           <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  name='password' onChange={handleInput} value={registrationDetails.password}/> 
          <label for="floatingPassword">Password</label>
           
         </div>
             <button className='btn btn-success w-100' onClick={register} type='button' >Register </button>
          </form>        
        </div>
    )
}

export default Registration;