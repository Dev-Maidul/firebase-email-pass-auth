import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase.init";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    const name=e.target.name.value;
    const photo=e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms=e.target.terms.checked;
    console.log(email, password,terms);
    //reset state
    setSuccess(false);
    setErrorMessage("");
    if(!terms)
    {
        setErrorMessage("Please accept our terms and conditions");
        return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password should contain at least one lowercase letter.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password should contain at least one Uppercase letter.");
      return;
    } else if (!/\d/.test(password)) {
      setErrorMessage("Password should contain at least one digit.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage(
        "Password should contain at least one Special Character."
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        
        // Send email Verification
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            setSuccess(true);
            alert("We need you a verification email please verify it")
        })
        // update user profile
        const profile={
            displayName:name,
            photoURL:photo,
        }
        updateProfile(auth.currentUser,profile)
        .then(()=>{
            console.log("User profile updated successfully");
        })
        .then(error=>{
            console.log(error);
        })
        
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">SignUp now!</h1>
        <form onSubmit={handleSignup}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
            />
            <label className="label">Photo</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo Url"
            />
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Your email"
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn-btn-xs absolute top-3 right-6 cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>

           
            <br />
            <label className="label">
              <input name="terms" type="checkbox" className="checkbox" />
              Accept Terms and Conditions
            </label>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
        </form>
        <p>Already have an Account? Please <Link to='/login' className='text-blue-600 underline'>LogIn</Link></p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && <p className="text-green-600">User create Account </p>}
      </div>
    </div>
  );
};

export default Signup;
