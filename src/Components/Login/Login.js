import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../Store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)

  const {auth} = useContext(FirebaseContext)

  const navigate = useNavigate()

  // useEffect(()=>{
  //     if(user){
  //       navigate("/")
  //     }
  // },[navigate,user])

  const handleSubmit = (e)=>{
    e.preventDefault()

    const email_reg = /^[\w]([\w\W])+@+([a-zA-z0-9]){3,8}\.([a-zA-z0-9]){2,3}$/gm
    const password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+<>?]).{8,16}$/gm

    if(!email_reg.test(email)){
        setError("Invalid Email!")
    }else if(!password_reg.test(password)){
        setError("Should contain upper,lower,digit,special & 8-16!")
    }else{
      signInWithEmailAndPassword(auth,email,password).then(response=>{
        navigate("/")
    }).catch(error=>{
      if(error.code==="auth/user-not-found"){
        setError("User Not Found!")
      }
      if(error.code==="auth/wrong-password"){
        setError("Wrong Password!")
      }
    })
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit} onInput={()=>setError(null)}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            placeholder="John@gmail.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          {error && <span className='error-label'>{error}</span>}
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
