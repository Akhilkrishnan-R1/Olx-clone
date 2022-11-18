import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../store/firebaseContext';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setUser } = UserAuth()

    const handleSubmit = (e) => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
      })
      .catch(error => 
        alert(error.message))
    }
    
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
