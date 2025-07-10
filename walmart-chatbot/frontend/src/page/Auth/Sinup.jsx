import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Signup.css';
import { auth, db } from '../../utility/firebase'; // Make sure Firebase is correctly initialized
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const navStateData = useLocation(); // For navigation state (redirect purposes)

  const handleSignup = (e) => {
    e.preventDefault();

    // Create user with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log('Account created:', authUser);

        // Set user data in Firestore
        const userRef = doc(db, 'users', authUser.user.uid);
        setDoc(userRef, {
          email: authUser.user.email,
          createdAt: new Date(),
        });

        setError('');
        navigate(navStateData?.state?.redirect || '/'); // Redirect after signup
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="signup">
      <Link to="/">
        <img
          className="signup-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      <div className="signup-container">
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignup}>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-button">
            Create your Amazon Account
          </button>
        </form>

        <p>
          By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>

        <p>
          Already have an account? <Link to="/signin">Sign-In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
