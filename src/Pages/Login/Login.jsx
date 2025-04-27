import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../Firebase/firebase.init";
import { Link } from "react-router";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(" ");

  const emailRef=useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    // Reset state here
    setSuccess(false);
    setErrorMessage(" ");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // user logIn
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(!result.user.emailVerified)
        {
            alert("Please verify your email address");
        }
        else{
            setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };
  // handle forget password
  const handleForgetPassword=()=>{
    const email=emailRef.current.value;
    console.log(email);
    setErrorMessage('');
    // send reset password email
    sendPasswordResetEmail(auth,email).then(()=>{
        alert("A password reset email has been send to your email please check it")
    })
    .then(error=>{
        setErrorMessage(error.message);
    })


  }
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2x py-4">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            ref={emailRef}
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />
          <div onClick={handleForgetPassword}>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p>
          New to this Website? Please{" "}
          <Link className="text-blue-500 underline" to="/signup">
            SignUp
          </Link>{" "}
        </p>
        {success && (
          <p className="text-green-500">User Logged In successfully</p>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
