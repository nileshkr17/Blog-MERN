import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";

const CreateAccountPage=()=>{
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();
    
    const createAccount=async ()=>{
        if(password!==confirmPassword){
            setError('Passwords do not match');
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(),email,password);
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }   
    }

    return(
        <>
        <h1>Create Account</h1>
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
        <input
         type="password"
         placeholder="confirm password"
         onChange={(event)=>setConfirmPassword(event.target.value)}
        />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login">Already have an account? Log In here</Link>
        </>
    );
}
export default CreateAccountPage;