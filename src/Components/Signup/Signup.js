import React, { useState } from 'react';
import { useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import {Link, useNavigate} from "react-router-dom"

export default function Signup() {

  const [username,setusername] = useState("")
  const [email,setEmail] = useState("")
  const [number,setNumber] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  const {db, auth} = useContext(FirebaseContext)

//   useEffect(()=>{
//     if(user){
//       navigate("/")
//     }
// },[navigate,user])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const username_reg = /^([a-zA-Z])([a-zA-Z0-9_\s.]){2,14}$/gm
    const email_reg = /^[\w]([\w\W])+@+([a-zA-z0-9]){3,8}\.([a-zA-z0-9]){2,3}$/gm
    const number_reg = /^[0-9][0-9]{9}$/gm
    const password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+<>?]).{8,16}$/gm
    if(!username_reg.test(username)){
        setError("Invalid UserName!")
    }else if(!email_reg.test(email)){
        setError("Invalid Email!")
    }else if(!number_reg.test(number)){
        setError("Number Should be 10 digits!")
    }else if(!password_reg.test(password)){
        setError("Should contain upper,lower,digit,special & 8-16!")
    }else{
        setError(null)
        createUserWithEmailAndPassword(auth,email,password).then(userCredential=>{
            updateProfile(userCredential.user,{displayName:username}).then(()=>{
              const obj = {
                id:userCredential.user.uid,
                profileName:username,
                number:number
              }
              addDoc(collection(db,"users"),obj).then(()=>navigate("/login"))
            })
      }).catch(error=>{
          console.log(error.code);
          if(error.code==="auth/email-already-in-use"){
            setError("Email Is Already In Use!")
          }
      })
    }  
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form onSubmit={handleSubmit} onInput={()=>setError(null)}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            placeholder="John"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
          />
          <br />
          <label htmlFor="username">Email</label>
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            id="number"
            name="number"
            placeholder="1234567890"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          {error && <span className='error-label'>{error}</span>}
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
