import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";

const LoginPage=()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();


    const logIn=async ()=>{
        try {
            await signInWithEmailAndPassword(getAuth(),email,password);
            navigate('/articles');
        } catch (error) {
            setError(error.message);
        }
        
    }

    return(
        <>
        <h1>Login In</h1>
        {error&&<p className="error">{error}</p>}
        {/* //if error is true, then display the error message */}
        <input
        placeholder="Your email address"
        value={email}
        onChange={(event)=>setEmail(event.target.value)}
        />
        <input
         type="password"
         placeholder="Your password"
         onChange={(event)=>setPassword(event.target.value)}
        />
        <button onClick={logIn}>Log In</button>
        <Link to="/create-account">Don't have an account? Create one here</Link>
        </>
    );
}
export default LoginPage;