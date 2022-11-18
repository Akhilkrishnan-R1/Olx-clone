import React, { useState, useContext } from 'react';
import { firebaseContext, UserAuth } from '../../store/firebaseContext'

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate()

    
    const { signUp, username, setUsername, email, setEmail, password, setPassword, number, setNumber } = UserAuth()

    const handleSubmit =  (e) => {
      e.preventDefault();
      signUp(email, password)
      .then(() => 
        navigate('/login'))
    }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
